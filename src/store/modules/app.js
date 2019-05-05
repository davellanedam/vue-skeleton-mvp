import * as types from '@/store/mutation-types'
import packageJson from '../../../package.json'

const state = {
  appTitle: 'My Awesome App',
  appVersion: packageJson.version
}

const getters = {
  appTitle: state => state.appTitle,
  appVersion: state => state.appVersion
}

const actions = {
  setAppVersion({ commit }, payload) {
    commit(types.SET_APP_VERSION, payload)
  }
}

const mutations = {
  [types.SET_APP_VERSION](state, version) {
    state.appVersion = version
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
