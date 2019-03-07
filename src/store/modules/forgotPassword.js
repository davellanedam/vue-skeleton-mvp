import * as types from '../mutation-types'
import axios from 'axios'

const state = {
  resetEmailSent: false
}

const getters = {
  resetEmailSent: state => state.resetEmailSent
}

const actions = {
  forgotPassword({ commit }, payload) {
    commit(types.SHOW_LOADING, true)
    axios
      .post('/forgot', payload)
      .then(response => {
        if (response.status === 200) {
          commit(types.RESET_EMAIL_SENT, true)
          commit(types.SUCCESS, {
            msg: 'forgotPassword.RESET_EMAIL_SENT',
            params: [payload.email]
          })
          commit(types.SHOW_LOADING, false)
        } else {
          commit(types.SHOW_LOADING, false)
        }
      })
      .catch(error => {
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
  [types.RESET_EMAIL_SENT](state, value) {
    state.resetEmailSent = value
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
