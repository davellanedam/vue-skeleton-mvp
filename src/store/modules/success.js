import * as types from '../mutation-types'

const state = {
  successMessage: null,
  successMessageParams: [],
  successMessageTimeout: 0
}

const getters = {
  successMessage: state => state.successMessage,
  successMessageParams: state => state.successMessageParams,
  successMessageTimeout: state => state.successMessageTimeout
}

const mutations = {
  [types.SUCCESS](state, payload) {
    if (payload === null) {
      state.successMessage = null
      state.successMessageParams = []
    } else {
      state.successMessageTimeout =
        payload.timeout === 0 ? 0 : payload.timeout || 6000
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
