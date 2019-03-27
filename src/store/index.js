import Vue from 'vue'
import Vuex from 'vuex'
import modules from '@/store/modules'

Vue.use(Vuex)

export const store = new Vuex.Store({
  modules: {
    ...modules
  }
})

if (window.Cypress) {
  // Only available during E2E tests
  window.__store__ = store
}
