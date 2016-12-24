<template>
  <div id="app">
    <toolbar></toolbar>
    <sidebar></sidebar>
    <transition>
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import Toolbar from 'components/Toolbar'
import Sidebar from 'components/Sidebar'
export default {
  name: 'app',
  components: {
    Toolbar,
    Sidebar
  }
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
</style>
