<template>
  <schedule :schedule-id="routeId"></schedule>
</template>

<script>
import Schedule from './Schedule'

export default {
  components: {
    Schedule
  },
  computed: {
    routeId () {
      return this.$route.params.id
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
  .centered h1 {
    color: #777;
  }
</style>
