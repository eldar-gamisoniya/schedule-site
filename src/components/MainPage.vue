<template>
  <div>
    <schedule v-if="pinnedScheduleId !== null" schedule-id="pinnedScheduleId"></schedule>
    <no-schedule v-else></no-schedule>
  </div>   
</template>

<script>
import { mapState } from 'vuex'
import NoSchedule from 'components/NoSchedule'
import Schedule from 'components/Schedule'
export default {
  components: {
    NoSchedule,
    Schedule
  },
  computed: mapState({
    pinnedScheduleId: state => state.pinnedScheduleId
  })
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
