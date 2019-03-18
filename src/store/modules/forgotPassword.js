import * as types from '../mutation-types'
import api from '@/services/api/forgotPassword'
import { handleError } from '@/utils/utils.js'

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
          handleError(error, commit, reject)
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
