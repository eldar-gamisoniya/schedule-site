import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const TOKEN_KEY = 'token'
const PINNED_SCHEDULE_ID_KEY = 'pinned_schedule_id'
const API_URL = 'http://localhost:8080'

export default new Vuex.Store({
  state: {
    sidebarToggled: false,
    count: 0,
    token: localStorage.getItem(TOKEN_KEY) || null,
    pinnedScheduleId: localStorage.getItem(PINNED_SCHEDULE_ID_KEY),
    searchString: '',
    editModeEnabled: false,
    editModeAllowed: false,
    isLoading: false
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
    },
    setLoading (state, isLoading) {
      state.isLoading = isLoading
    }
  },
  actions: {
    register ({commit, dispatch}, data) {
      commit('setLoading', true)
      fetch(`${API_URL}/account/signup`, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(res => res.json())
      .then(data => {
        commit('setLoading', false)
        if (data.success) {
          dispatch('authenticate', data)
        } else {
          alert('Такой пользователь уже существует')
        }
      })
    },
    authenticate ({commit}, data) {
      commit('setLoading', true)
      fetch(`${API_URL}/account/authenticate`, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json'
        }
      })
    .then(res => res.json())
      .then(data => {
        commit('setLoading', false)
        if (data.success) {
          commit('saveToken', data.token)
        } else {
          alert('Пароль набран неверно')
        }
      })
    }
  }
})
