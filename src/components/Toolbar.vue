<template>
  <md-whiteframe md-tag="md-toolbar" md-elevation="2">
      <div class="md-toolbar-container width-99">
          <md-layout md-gutter class="flex-centered">
            <md-button class="md-icon-button" @click="toggleSidebar()">
                <md-icon>menu</md-icon>
            </md-button>

            <md-layout md-flex-offset="40">
              <form v-on:submit.prevent="onSubmit" class="inline-flex flex-centered">
                <md-input-container md-inline>
                  <md-input v-model="message" placeholder="Искать расписание"></md-input>
                </md-input-container>
                <md-button type="submit" class="md-icon-button">
                    <md-icon>search</md-icon>
                </md-button>
                </form>
            </md-layout>
            <md-layout v-if="isAuthenticated && editModeAllowed" md-flex-offset="10">
              <md-button v-if="editModeEnabled" @click="saveEditedData">Сохранить изменения</md-button>
              <md-button v-else @click="enableEditMode">Включить редактирование</md-button>
            </md-layout>
          </md-layout>
      </div>
  </md-whiteframe>
</template>%

<script>
import { mapState, mapMutations, mapGetters } from 'vuex'

export default {
  name: 'toolbar',
  methods: {
    ...mapMutations(['toggleSidebar', 'setEditMode']),
    onSubmit: function () {
      if (this.message === '') {
        return
      }
      this.$router.push({ path: '/search', query: {searchQuery: this.message} })
    },
    saveEditedData: function () {
      this.setEditMode({editModeAllowed: this.editModeAllowed, editModeEnabled: false})
    },
    enableEditMode: function () {
      this.setEditMode({editModeAllowed: this.editModeAllowed, editModeEnabled: true})
    }
  },
  computed: {
    ...mapState({
      editModeEnabled: state => state.editModeEnabled,
      editModeAllowed: state => state.editModeAllowed
    }),
    ...mapGetters([
      'isAuthenticated'
    ]),
    message: {
      get () {
        return this.$store.state.searchString
      },
      set (value) {
        this.$store.commit('setSearchString', value)
      }
    }
  }
}
</script>

<style scoped>
  .width-99{
    width: 99%;
  }
  .inline-flex{
    display: inline-flex;
  }
  .flex-centered{
    align-items: center;
  }
</style>
