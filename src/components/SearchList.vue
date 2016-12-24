<template>
  <div class="centered">
    <div class="card-wrapper">
      <schedule-card title="hello, world!" text="sdadasdadasdasdssad" id="1"></schedule-card>
    </div>
    <div class="card-wrapper">
      <schedule-card title="hello, world!" text="sdadasdadasdasdssad" id="2"></schedule-card>
    </div>
  </div>
</template>

<script>
import ScheduleCard from './ScheduleCard'
export default {
  components: {
    ScheduleCard
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .centered {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    margin-top: 30px;
  }
  .centered h1 {
    color: #777;
  }
  .card-wrapper {
    margin-top: 10px;
  }
</style>
