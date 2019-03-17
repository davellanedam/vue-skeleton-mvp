import * as types from '../mutation-types'
import api from '@/services/api/forgotPassword'

const state = {
  resetEmailSent: false
}

const getters = {
  resetEmailSent: state => state.resetEmailSent
}

const actions = {
  forgotPassword({ commit }, payload) {
    return new Promise((resolve, reject) => {
      commit(types.SHOW_LOADING, true)
      api
        .forgotPassword(payload)
        .then(response => {
          if (response.status === 200) {
            commit(types.RESET_EMAIL_SENT, true)
            commit(types.SUCCESS, {
              msg: 'forgotPassword.RESET_EMAIL_SENT',
              params: [payload.email],
              timeout: 0
            })
            commit(types.SHOW_LOADING, false)
            resolve()
          }
        })
        .catch(error => {
          // Catches error connection or any other error (checks if error.response exists)
          let errMsg = error.response
            ? error.response.data.errors.msg
            : 'SERVER_TIMEOUT_CONNECTION_ERROR'
          commit(types.SHOW_LOADING, false)
          commit(types.ERROR, errMsg)
          reject(error)
        })
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
