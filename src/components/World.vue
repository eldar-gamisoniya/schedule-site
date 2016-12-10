<template>
  <div class="world">
    {{ msg }}
  </div>   
</template>

<script>
export default {
  name: 'world',
  data () {
    return {
      msg: 'World'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
