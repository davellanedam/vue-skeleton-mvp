import * as types from '../mutation-types'

const state = {
  successMessage: null,
  successMessageParams: []
}

const getters = {
  successMessage: state => state.successMessage,
  successMessageParams: state => state.successMessageParams
}

const mutations = {
  [types.SUCCESS](state, payload) {
    if (payload === null) {
      state.successMessage = null
      state.successMessageParams = []
    } else {
      state.successMessage = payload.msg
      if (payload.params) {
        state.successMessageParams = payload.params
      }
    }
  }
}

export default {
  state,
  getters,
  mutations
}
