<template>
  <div class="world">
    {{ msg }}
    {{ count }}
    <button v-on:click="increment">Add 1</button>
    
    <router-link to="/hello">Go to hello</router-link>    
  </div>   
</template>

<script>
import { mapState, mapMutations } from 'vuex'

export default {
  name: 'world',
  data () {
    return {
      msg: 'World'
    }
  },
  computed: mapState({
    count: state => state.count
  }),
  methods: {
    ...mapMutations(['increment'])
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  div {
    background-color: #aaa;
  }
</style>
