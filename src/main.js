import Vue from 'vue'
import '@/plugins/axios'
import '@/plugins/vuetify'
import '@/plugins/common'
import App from '@/App.vue'
import router from '@/router'
import { store } from '@/store'
import i18n from '@/i18n'
import VueAnalytics from 'vue-analytics'

Vue.config.productionTip = false

if (process.env.NODE_ENV === 'production') {
  Vue.use(VueAnalytics, {
    id: 'UA-138050457-1',
    router
  })
}

const app = new Vue({
  router,
  store,
  i18n,
  render: h => h(App),
  created() {
    store.dispatch('setLocale', store.getters.locale)
    if (store.getters.isTokenSet) {
      store.dispatch('autoLogin')
    }
  }
}).$mount('#app')

if (window.Cypress) {
  // Only available during E2E tests
  window.app = app
}
