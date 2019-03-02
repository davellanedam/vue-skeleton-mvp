import * as types from '../mutation-types'

const state = {
  successMessage: null
}

const getters = {
  successMessage: state => state.successMessage
}

const mutations = {
  [types.SUCCESS](state, value) {
    state.successMessage = value
  }
}

export default {
  state,
  getters,
  mutations
}
