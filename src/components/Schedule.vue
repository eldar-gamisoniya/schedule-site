<template>
  <div>
    <div class="centered" v-if="isLoading">
      <md-spinner x :md-size="150" md-indeterminate></md-spinner>
    </div>
    <div v-else>Расписание {{scheduleId}}</div>
    <subject-card name="123" :time="new Date()" :dayOfWeek="1"></subject-card>
  </div>   
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import SubjectCard from './SubjectCard'
// name time dayOfWeek
export default {
  components: {
    SubjectCard
  },
  created () {
    this.setEditMode({editModeEnabled: false, editModeAllowed: true})
  },
  beforeDestroy () {
    this.setEditMode({editModeEnabled: false, editModeAllowed: false})
  },
  data () {
    return {
      schedule: null
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
      pinnedScheduleId: state => state.pinnedScheduleId
    }),
    showPinButton () {
      return this.pinnedScheduleId !== this.scheduleId
    },
    isLoading () {
      return this.schedule == null
    }
  },
  methods: {
    ...mapMutations(['setEditMode'])
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
</style>
