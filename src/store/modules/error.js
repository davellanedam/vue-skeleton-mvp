import * as types from '@/store/mutation-types'

const getters = {
  showErrorMessage: state => state.showErrorMessage,
  errorMessage: state => state.errorMessage
}

const mutations = {
  [types.ERROR](state, payload) {
    if (payload === null) {
      state.showErrorMessage = false
      state.errorMessage = null
    } else {
      state.showErrorMessage = true
      state.errorMessage = payload
    }
  },
  [types.SHOW_ERROR](state, payload) {
    state.showErrorMessage = !!payload
  }
}

const state = {
  showErrorMessage: false,
  errorMessage: null
}

export default {
  state,
  getters,
  mutations
}
