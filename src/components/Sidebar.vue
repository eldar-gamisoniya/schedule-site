<template>
    <md-sidenav class="md-left" ref="sidenav">
        <md-toolbar class="md-account-header">
        <md-list v-if="isAuthenticated" class="md-transparent">
            <md-list-item class="md-avatar-list">
            <md-avatar class="md-large">
                <img src="https://placeimg.com/64/64/people/8" alt="People">
            </md-avatar>

            <span style="flex: 1"></span>

            <md-avatar>
                <img src="https://placeimg.com/40/40/people/3" alt="People">
            </md-avatar>

            <md-avatar>
                <img src="https://placeimg.com/40/40/people/4" alt="People">
            </md-avatar>
            </md-list-item>

            <md-list-item>
            <div class="md-list-text-container">
                <span>johndoe@email.com</span>
            </div>
            </md-list-item>
        </md-list>
        </md-toolbar>

        <md-list>
        <md-list-item @click="goToTheMainPage()" class="md-primary">
            <md-icon>home</md-icon> <span>Главный экран</span>
        </md-list-item>

        <md-list-item id="register-item" v-if="!isAuthenticated" @click="openRegisterDialog()">
            <md-icon>person_add</md-icon> <span>Регистрация</span>
        </md-list-item>

        <md-list-item id="authenticate-item" v-if="!isAuthenticated" @click="openLoginDialog()">
            <md-icon>vertical_align_top</md-icon> <span>Войти</span>
        </md-list-item>

        <md-list-item v-if="isAuthenticated" @click="onLogoutClicked()">
            <md-icon>vertical_align_bottom</md-icon> <span>Выйти</span>
        </md-list-item>
        </md-list>

      <md-dialog md-open-from="#register-item" md-close-to="#register-item" ref="registerDialog">
        <md-dialog-title>Регистрация</md-dialog-title>
        <md-dialog-content>
          <md-input-container>
            <label>Электронная Почта:</label>
            <md-input v-model="email" required class="text-black"></md-input>
          </md-input-container>
          <md-input-container md-has-password>
            <label>Пароль:</label>
            <md-input type="password" v-model="password" required class="text-black"></md-input>
          </md-input-container>
        </md-dialog-content>

        <md-dialog-actions>
          <md-button class="md-primary" @click="onRegisterClicked()">Зарегистрироваться</md-button>
        </md-dialog-actions>
      </md-dialog>

      <md-dialog md-open-from="#authenticate-item" md-close-to="#authenticate-item" ref="authenticateDialog">
        <md-dialog-title>Логин</md-dialog-title>
        <md-dialog-content>
          <md-input-container>
            <label>Электронная Почта:</label>
            <md-input v-model="email" required class="text-black"></md-input>
          </md-input-container>
          <md-input-container md-has-password>
            <label>Пароль:</label>
            <md-input type="password" v-model="password" required class="text-black"></md-input>
          </md-input-container>
        </md-dialog-content>

        <md-dialog-actions>
          <md-button class="md-primary" @click="onLoginClicked()">Войти</md-button>
        </md-dialog-actions>
      </md-dialog>

    </md-sidenav>
</template>

<script>
import { mapState, mapMutations, mapGetters, mapActions } from 'vuex'
export default {
  watch: {
    sidebarToggled: function (toggled) {
      this.$refs.sidenav.toggle()
    }
  },
  data () {
    return {
      email: '',
      password: ''
    }
  },
  computed: {
    ...mapState({
      sidebarToggled: state => state.sidebarToggled
    }),
    ...mapGetters([
      'isAuthenticated'
    ])
  },
  methods: {
    ...mapMutations(['toggleSidebar', 'clearToken']),
    ...mapActions(['register', 'authenticate']),
    goToTheMainPage () {
      this.toggleSidebar()
      this.$router.push('/')
    },
    onRegisterClicked () {
      this.toggleSidebar()
      this.register({ email: this.email, password: this.password })
    },
    openRegisterDialog () {
      this.clearData()
      this.toggleSidebar()
      this.$refs.registerDialog.open()
    },
    onLoginClicked () {
      this.toggleSidebar()
      this.authenticate({ email: this.email, password: this.password })
    },
    openLoginDialog () {
      this.clearData()
      this.toggleSidebar()
      this.$refs.authenticateDialog.open()
    },
    onLogoutClicked () {
      this.clearToken()
    },
    clearData () {
      this.email = ''
      this.password = ''
    }

  }
}
</script>

<style>
</style>
