<template>
  <div @click="openDialog()" :id="subject.randomId">
    <md-card class="card card-ripple" >
        <md-ink-ripple></md-ink-ripple>
        <div class="flexbox">
          <div class="name">{{subject.name}}</div>
          <md-button v-if="editModeEnabled" @click="onDeleteSubject" class="small-button"><md-icon>close</md-icon></md-button>
        </div>
        <div class="text">
          <div>{{subject.professor}}</div>
          <div class="flexbox">
            <div>{{subject.time}}</div>
            <div class="padding3">{{subject.place}}</div>
          </div>
        </div>
    </md-card>

    <md-dialog :md-open-from="'#' + subject.randomId" :md-close-to="'#' + subject.randomId" ref="dialog">
      <md-dialog-content>
        <md-input-container>
          <label>Предмет:</label>
          <md-input v-model="editingSubject.name" required :disabled="!editModeEnabled" class="text-black"></md-input>
        </md-input-container>
        <md-input-container>
          <label>Время:</label>
          <md-input v-model="editingSubject.time" required :disabled="!editModeEnabled" class="text-black"></md-input>
        </md-input-container>
        <md-input-container>
          <label>Преподаватель:</label>
          <md-input v-model="editingSubject.professor" :disabled="!editModeEnabled" class="text-black"></md-input>
        </md-input-container>
        <md-input-container>
          <label>Кабинет:</label>
          <md-input v-model="editingSubject.place" :disabled="!editModeEnabled" class="text-black"></md-input>
        </md-input-container>
        <md-input-container>
          <label>Описание:</label>
          <md-input v-model="editingSubject.description" :disabled="!editModeEnabled" class="text-black"></md-input>
        </md-input-container>
      </md-dialog-content>

      <md-dialog-actions>
        <md-button class="md-primary" @click="closeDialogAndSave()">Сохранить</md-button>
        <md-button class="md-primary" @click="closeDialog()">Отменить</md-button>
      </md-dialog-actions>
    </md-dialog>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  props: {
    subject: { type: Object, required: true },
    onSave: { type: Function, required: true },
    onDelete: { type: Function, required: true }
  },
  data () {
    const editingSubject = Object.assign({}, this.subject)
    return {
      editingSubject: editingSubject
    }
  },
  computed: {
    ...mapState({
      editModeEnabled: state => state.editModeEnabled
    })
  },
  methods: {
    restoreEditedField () {
      this.editingSubject = Object.assign({}, this.subject)
    },
    openDialog () {
      this.$refs.dialog.open()
    },
    closeDialog () {
      this.$refs.dialog.close()
    },
    closeDialogAndSave () {
      this.$refs.dialog.close()
      this.onSave(this.editingSubject)
    },
    onDeleteSubject (event) {
      event.stopPropagation()
      this.onDelete(this.subject.randomId)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .card{
    cursor: pointer;
    padding: 10px;
  }
  .card .name{
    font-size: 16px;
    font-weight: 600;
  }
  .card .text{
    margin-top: 5px;
    color: #666;
  }
  .flexbox{
    display: flex;
    justify-content: space-between;
  }
  .padding3{
    padding-left: 3px;
  }
  .text-black{
    color: black !important;
  }
  .small-button{
    min-width: 10px;
    min-height: 10px;
    margin: 0;
    padding: 0;
    line-height: 0;
  }
</style>
