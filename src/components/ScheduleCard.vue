<template>
  <div v-on:click="onClick">
    <md-card class="card card-ripple" >
        <md-ink-ripple></md-ink-ripple>
        <div class="title">{{title}}</div>
        <div class="text">{{text}}</div>
    </md-card>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true
    },
    text: {
      type: String,
      required: true
    },
    id: {
      type: String,
      required: true
    }
  },
  methods: {
    onClick () {
      this.$router.push({name: 'schedule', params: { id: this.id }})
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .card{
    cursor: pointer;
    padding: 10px;
    width: 50%;
    min-width: 400px;
  }
  .card .title{
    font-size: 25px;
    font-weight: 600;
  }
  .card .text{
    margin-top: 5px;
    color: #666;
  }
</style>
