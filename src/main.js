import Vue from 'vue'
import './plugins/axios'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
  created() {
    const isLoggedIn = this.$store.getters.isLoggedIn
    console.log('IS LOGGED IN ?:', isLoggedIn)
    if (isLoggedIn) {
      store.dispatch('autoLogin', localStorage.getItem('user'))
    }
  }
}).$mount('#app')
