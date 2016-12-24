<template>
  <div id="app">
    <toolbar></toolbar>
    <sidebar></sidebar>
    <transition v-if="!isLoading">
      <router-view></router-view>
    </transition>
    <div class="centered-spinner" v-else>
      <md-spinner x :md-size="150" md-indeterminate></md-spinner>
    </div>
  </div>
</template>

<script>
import Toolbar from 'components/Toolbar'
import Sidebar from 'components/Sidebar'
import { mapState } from 'vuex'
export default {
  name: 'app',
  components: {
    Toolbar,
    Sidebar
  },
  computed: mapState({
    isLoading: state => state.isLoading
  })
}
</script>

<style>
  body{
    min-height: 100%;  
  }
  #app{
    height: 100%;
  }
  .md-tab-header{
    width:14%;
    min-width:150px
  }

  .centered-spinner {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 15%;
  }
</style>
