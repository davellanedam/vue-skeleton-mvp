import * as types from '../mutation-types'

const state = {
  showLoading: false
}

const getters = {
  showLoading: state => state.showLoading
}

const mutations = {
  [types.SHOW_LOADING](state, value) {
    state.showLoading = value
  }
}

export default {
  state,
  getters,
  mutations
}
