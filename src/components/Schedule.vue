<template>
  <div>
    <div>
      
    </div>
    <div class="centered" v-if="isLoading">
      <md-spinner x :md-size="150" md-indeterminate></md-spinner>
    </div>
    <div v-else>
      <md-tabs>
        <md-tab md-label="Понедельник"></md-tab>
        <md-tab md-label="Вторник"></md-tab>
        <md-tab md-label="Среда"></md-tab>
        <md-tab md-label="Четверг"></md-tab>
        <md-tab md-label="Пятница"></md-tab>
        <md-tab md-label="Суббота"></md-tab>
        <md-tab md-label="Воскресенье"></md-tab>
      </md-tabs>
      <div class="column inline" v-for="day in days">
        <div class="margin" v-for="subject in getArrayByDay(day)"><subject-card :onSave="onSaveSubject" :onDelete="onDeleteSubject" :subject="subject"></subject-card></div>
      </div>
    </div>
    
    <md-button v-if="editModeEnabled" @click="openDialog" id="add-subject-button" class="md-fab md-fab-bottom-right">
      <md-icon>add</md-icon>
    </md-button>
    <md-button v-if="!editModeEnabled && showPinButton" @click="onPinScheduleClicked" class="md-fab md-fab-bottom-right">
      <md-icon>home</md-icon>
    </md-button>

    <md-dialog md-open-from="#add-subject-button" md-close-to="#add-subject-button" ref="dialog">
      <md-dialog-content>
        <md-input-container>
          <label>Предмет:</label>
          <md-input v-model="creatingSubject.name" required :disabled="!editModeEnabled" class="text-black"></md-input>
        </md-input-container>
        <md-input-container>
          <label for="dayOfWeekSelect">День:</label>
          <md-select name="dayOfWeekSelect" required id="dayOfWeekSelect" v-model="creatingSubject.dayOfWeek">
            <md-option :value="1">Понедельник</md-option>
            <md-option :value="2">Вторник</md-option>
            <md-option :value="3">Среда</md-option>
            <md-option :value="4">Четверг</md-option>
            <md-option :value="5">Пятница</md-option>
            <md-option :value="6">Суббота</md-option>
            <md-option :value="7">Воскресенье</md-option>
          </md-select>
        </md-input-container>
        <md-input-container>
          <label>Время:</label>
          <md-input v-model="creatingSubject.time" required :disabled="!editModeEnabled" class="text-black"></md-input>
        </md-input-container>
        <md-input-container>
          <label>Преподаватель:</label>
          <md-input v-model="creatingSubject.professor" :disabled="!editModeEnabled" class="text-black"></md-input>
        </md-input-container>
        <md-input-container>
          <label>Кабинет:</label>
          <md-input v-model="creatingSubject.place" :disabled="!editModeEnabled" class="text-black"></md-input>
        </md-input-container>
        <md-input-container>
          <label>Описание:</label>
          <md-input v-model="creatingSubject.description" :disabled="!editModeEnabled" class="text-black"></md-input>
        </md-input-container>
      </md-dialog-content>

      <md-dialog-actions>
        <md-button class="md-primary" v-if="editModeEnabled" @click="closeDialogAndSave()">Сохранить</md-button>
        <md-button class="md-primary" @click="closeDialog()">Отменить</md-button>
      </md-dialog-actions>
    </md-dialog>
  </div>   
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import { API_URL } from '../constants'
import SubjectCard from './SubjectCard'
// name time dayOfWeek
export default {
  components: {
    SubjectCard
  },
  created () {
    this.updateSchedule()
  },
  beforeDestroy () {
    this.setEditMode({editModeEnabled: false, editModeAllowed: false})
  },
  data () {
    return {
      schedule: null,
      days: [1, 2, 3, 4, 5, 6, 7],
      creatingSubject: this.createNewSubject()
    }
  },
  watch: {
    $route () {
      this.updateSchedule()
    },
    editModeEnabled () {
      if (this.editModeEnabled === false) {
        this.saveSchedule()
      }
    }
  },
  props: {
    scheduleId: {
      type: String,
      required: true
    }
  },
  computed: {
    ...mapState({
      pinnedScheduleId: state => state.pinnedScheduleId,
      editModeEnabled: state => state.editModeEnabled,
      token: state => state.token
    }),
    showPinButton () {
      return this.pinnedScheduleId !== this.scheduleId
    },
    isLoading () {
      return this.schedule == null
    }
  },
  methods: {
    ...mapMutations(['setEditMode', 'pinSchedule']),
    getArrayByDay (day) {
      return this.schedule.subjects.filter(subject => subject.dayOfWeek === day)
    },
    updateSchedule () {
      fetch(`${API_URL}/schedule/find`, {
        method: 'POST',
        body: JSON.stringify({
          '_id': this.scheduleId
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(res => res.json())
      .then(data => {
        this.setEditMode({editModeEnabled: false, editModeAllowed: true})
        this.addRandomIdAndTime(data[0])
        this.schedule = data[0]
      })
    },
    saveSchedule () {
      this.translateStringsToDate()
      const body = JSON.stringify(this.schedule)
      this.addRandomIdAndTime()
      fetch(`${API_URL}/schedule/${this.scheduleId}`, {
        method: 'PUT',
        body: body,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': this.token
        }
      })
    },
    addRandomIdAndTime (data) {
      (data || this.schedule).subjects.forEach(subject => {
        const date = new Date(subject.time)
        subject.time = `${date.getHours()}:${date.getMinutes()}`
        subject.randomId = `id${subject._id}`
      })
    },
    translateStringsToDate () {
      this.schedule.subjects.forEach(subject => {
        const splitted = subject.time.split(':')
        subject.time = new Date(1, 1, 1, splitted[0], splitted[1]).toISOString()
      })
    },
    onSaveSubject (subject) {
      const found = this.schedule.subjects.find(tempSubject => tempSubject.randomId === subject.randomId)
      if (!found) {
        return
      }
      Object.assign(found, subject)
    },
    onDeleteSubject (subjectId) {
      this.schedule.subjects = this.schedule.subjects.filter(subject => subject.randomId !== subjectId)
    },
    closeDialog () {
      this.$refs.dialog.close()
    },
    createNewSubject () {
      return {
        duration: 0,
        dayOfWeek: 1,
        time: '00:00',
        professor: null,
        place: null,
        name: '',
        description: '',
        randomId: `id${Math.random().toString(36).substring(10)}`
      }
    },
    closeDialogAndSave () {
      this.$refs.dialog.close()
      this.schedule.subjects.push(this.creatingSubject)
      this.creatingSubject = this.createNewSubject()
    },
    openDialog () {
      this.$refs.dialog.open()
    },
    onPinScheduleClicked () {
      this.pinSchedule(this.schedule._id)
      this.$router.push({ path: '/' })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.centered {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 15%;  
  }
.column {
  width: 14%;
  min-width: 150px;
}
.margin {
  margin-top: 5px;
  margin-left: 5px;
}
.inline {
  display: inline-block;
  min-height: 1px;
  float: left;
}
</style>
