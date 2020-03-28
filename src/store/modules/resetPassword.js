import * as types from '@/store/mutation-types'
import api from '@/services/api/resetPassword'
import { buildSuccess, handleError } from '@/utils/utils.js'

const getters = {
  showChangePasswordInputs: (state) => state.showChangePasswordInputs
}

const actions = {
  resetPassword({ commit }, payload) {
    return new Promise((resolve, reject) => {
      commit(types.SHOW_LOADING, true)
      api
        .resetPassword(payload)
        .then((response) => {
          if (response.status === 200) {
            commit(types.SHOW_CHANGE_PASSWORD_INPUTS, false)
            buildSuccess(
              {
                msg: 'resetPassword.PASSWORD_CHANGED'
              },
              commit,
              resolve
            )
          }
        })
        .catch((error) => {
          if (error.response.status === 404) {
            commit(types.SHOW_CHANGE_PASSWORD_INPUTS, false)
          }
          handleError(error, commit, reject)
        })
    })
  }
}

const mutations = {
  [types.SHOW_CHANGE_PASSWORD_INPUTS](state, value) {
    state.showChangePasswordInputs = value
  }
}

const state = {
  showChangePasswordInputs: true
}

export default {
  state,
  getters,
  actions,
  mutations
}
