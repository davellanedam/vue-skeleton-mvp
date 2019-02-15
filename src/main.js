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
    const isTokenSet = this.$store.getters.isTokenSet
    console.log('IS LOGGED IN ?:', isTokenSet)
    if (isTokenSet) {
      store.dispatch('autoLogin', localStorage.getItem('user'))
    }
  }
}).$mount('#app')
