import * as types from '@/store/mutation-types'

const getters = {
  showSuccessMessage: state => state.successMessage,
  successMessage: state => state.successMessage,
  successMessageParams: state => state.successMessageParams,
  successMessageTimeout: state => state.successMessageTimeout
}

const mutations = {
  [types.SUCCESS](state, payload) {
    if (payload === null) {
      state.showSuccessMessage = false
      state.successMessage = null
      state.successMessageParams = []
    } else {
      state.showSuccessMessage = true
      state.successMessageTimeout =
        payload.timeout === 0 ? 0 : payload.timeout || 6000
      state.successMessage = payload.msg
      if (payload.params) {
        state.successMessageParams = payload.params
      }
    }
  },
  [types.SHOW_SUCCESS](state, payload) {
    state.showSuccessMessage = !!payload
  }
}

const state = {
  showSuccessMessage: false,
  successMessage: null,
  successMessageParams: [],
  successMessageTimeout: 0
}

export default {
  state,
  getters,
  mutations
}
