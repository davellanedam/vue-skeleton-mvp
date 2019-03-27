import * as types from '@/store/mutation-types'

const state = {
  errorMessage: null
}

const getters = {
  errorMessage: state => state.errorMessage
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
