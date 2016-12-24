import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const TOKEN_KEY = 'token'
const PINNED_SCHEDULE_ID_KEY = 'pinned_schedule_id'

export default new Vuex.Store({
  state: {
    sidebarToggled: false,
    count: 0,
    token: localStorage.getItem(TOKEN_KEY) || null,
    pinnedScheduleId: localStorage.getItem(PINNED_SCHEDULE_ID_KEY),
    searchString: '',
    editModeEnabled: false,
    editModeAllowed: false
  },
  getters: {
    isAuthenticated: state => {
      return state.token != null
    }
  },
  mutations: {
    toggleSidebar (state) {
      state.sidebarToggled = !state.sidebarToggled
    },
    increment (state) {
      state.count++
    },
    saveToken (state, token) {
      localStorage.setItem(TOKEN_KEY, token)
      state.token = token
    },
    pinSchedule (state, scheduleId) {
      localStorage.setItem(PINNED_SCHEDULE_ID_KEY, scheduleId)
      state.pinnedScheduleId = scheduleId
    },
    clearToken (state) {
      state.token = null
    },
    setSearchString (state, searchString) {
      state.searchString = searchString
    },
    setEditMode (state, { editModeEnabled, editModeAllowed }) {
      state.editModeEnabled = editModeEnabled
      state.editModeAllowed = editModeAllowed
    }
  }
})
