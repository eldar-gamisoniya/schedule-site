import Vue from 'vue'
import Vuex from 'vuex'
import { API_URL } from '../constants'
Vue.use(Vuex)

const TOKEN_KEY = 'token'
const EMAIL_KEY = 'email'
const PINNED_SCHEDULE_ID_KEY = 'pinned_schedule_id'

export default new Vuex.Store({
  state: {
    sidebarToggled: false,
    count: 0,
    token: localStorage.getItem(TOKEN_KEY) || null,
    email: localStorage.getItem(EMAIL_KEY) || null,
    pinnedScheduleId: localStorage.getItem(PINNED_SCHEDULE_ID_KEY),
    searchString: '',
    editModeEnabled: false,
    editModeAllowed: false,
    isLoading: false
  },
  mutations: {
    toggleSidebar (state) {
      state.sidebarToggled = !state.sidebarToggled
    },
    increment (state) {
      state.count++
    },
    saveUserData (state, { token, email }) {
      localStorage.setItem(TOKEN_KEY, token)
      state.token = token
      localStorage.setItem(EMAIL_KEY, email)
      state.email = email
    },
    pinSchedule (state, scheduleId) {
      localStorage.setItem(PINNED_SCHEDULE_ID_KEY, scheduleId)
      state.pinnedScheduleId = scheduleId
    },
    clearToken (state) {
      state.token = null
      localStorage.removeItem(TOKEN_KEY)
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
  getters: {
    isAuthenticated (state) {
      return state.token !== null
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
      .then(res => {
        commit('setLoading', false)
        if (res.success) {
          commit('saveUserData', {
            token: res.token,
            email: data.email
          })
        } else {
          alert('Пароль набран неверно')
        }
      })
    }
  }
})
