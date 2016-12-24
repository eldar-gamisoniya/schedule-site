<template>
  <div v-on:click="onClick">
    <md-card class="card card-ripple" >
        <md-ink-ripple></md-ink-ripple>
        <div class="name">{{name}}</div>
        <div class="text">
          <div>{{professor}}</div>
          <div class="flexbox">
            <div>{{time.getHours()}}:{{time.getMinutes()}}</div>
            <div class="padding3">к.518</div>
          </div>
        </div>
    </md-card>
  </div>
</template>

<script>
export default {
  props: {
    name: { type: String, required: true },
    professor: { type: String, required: false },
    duration: { type: Number, required: false },
    time: { type: Date, required: true },
    dayOfWeek: { type: Number, required: true },
    place: { type: String, required: false },
    description: { type: String, required: false }
  },
  data () {
    return {
      editedName: this.name,
      editedProfessor: this.professor,
      editedDuration: this.duration,
      editedTime: this.time,
      editedDayOfWeek: this.dayOfWeek,
      editedPlace: this.place,
      editedDescription: this.description
    }
  },
  methods: {
    onClick () {
      console.log('hi')
    },
    restoreEditedField () {
      this.editedName = this.name
      this.editedProfessor = this.professor
      this.editedDuration = this.duration
      this.editedTime = this.time
      this.editedDayOfWeek = this.dayOfWeek
      this.editedPlace = this.place
      this.editedDescription = this.description
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .card{
    cursor: pointer;
    padding: 10px;
    width: 13%;
    min-width: 100px;
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
</style>
