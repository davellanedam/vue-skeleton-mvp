import * as types from '../mutation-types'

const state = {
  error: null
}

const getters = {
  error: state => state.error
}

const mutations = {
  [types.ERROR](state, value) {
    state.error = value
  }
}

export default {
  state,
  getters,
  mutations
}
