<template>
  <div class="centered">
    <div class="card-wrapper" v-for="schedule in schedules">
      <schedule-card :title="`${schedule.course} курс ${schedule.group} группа` " :text="schedule.university" :id="schedule._id"></schedule-card>
    </div>
  </div>
</template>

<script>
import ScheduleCard from './ScheduleCard'
import { API_URL } from '../constants'
export default {
  components: {
    ScheduleCard
  },
  data () {
    return {
      schedules: []
    }
  },
  watch: {
    $route () {
      this.updateSchedules()
    }
  },
  methods: {
    updateSchedules () {
      fetch(`${API_URL}/schedule/find`, {
        method: 'POST',
        body: JSON.stringify({
          'name': {
            '$options': '-i',
            '$regex': this.$route.query.searchQuery.replace(/ /g, '.*')
          },
          'active': true
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(res => res.json())
      .then(data => {
        this.schedules = data
      })
    }
  },
  created () {
    this.updateSchedules()
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
