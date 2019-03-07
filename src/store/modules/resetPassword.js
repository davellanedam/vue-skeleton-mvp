import * as types from '../mutation-types'
import axios from 'axios'

const state = {
  showChangePasswordInputs: true
}

const getters = {
  showChangePasswordInputs: state => state.showChangePasswordInputs
}

const actions = {
  resetPassword({ commit }, payload) {
    commit(types.SHOW_LOADING, true)
    axios
      .post('/reset', payload)
      .then(response => {
        if (response.status === 200) {
          commit(types.SHOW_CHANGE_PASSWORD_INPUTS, false)
          commit(types.SUCCESS, {
            msg: 'resetPassword.PASSWORD_CHANGED'
          })
          commit(types.SHOW_LOADING, false)
        } else {
          commit(types.SHOW_LOADING, false)
        }
      })
      .catch(error => {
        if (error.response.status === 404) {
          commit(types.SHOW_CHANGE_PASSWORD_INPUTS, false)
        }
        // Catches error connection or any other error (checks if error.response exists)
        let errMsg = error.response
          ? error.response.data.errors.msg
          : 'SERVER_TIMEOUT_CONNECTION_ERROR'
        commit(types.SHOW_LOADING, false)
        commit(types.ERROR, errMsg)
      })
  }
}

const mutations = {
  [types.SHOW_CHANGE_PASSWORD_INPUTS](state, value) {
    state.showChangePasswordInputs = value
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
