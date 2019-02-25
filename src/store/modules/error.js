import * as types from '../mutation-types'

const state = {
  errorMessage: null
}

const getters = {
  errorMessage: state => state.error
}

const mutations = {
  [types.ERROR](state, value) {
    state.errorMessage = value
  }
}

export default {
  state,
  getters,
  mutations
}
