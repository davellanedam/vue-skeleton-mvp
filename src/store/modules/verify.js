import * as types from '../mutation-types'
import axios from 'axios'

const state = {
  emailVerified: false
}

const getters = {
  emailVerified: state => state.emailVerified
}

const actions = {
  sendVerify({ commit }, id) {
    return new Promise((resolve, reject) => {
      commit(types.SHOW_LOADING, true)
      const data = {
        id
      }
      axios
        .post('/verify', data)
        .then(response => {
          if (response.status === 200) {
            const verified = response.data.verified
            commit(types.EMAIL_VERIFIED, verified)

            // If user is logged in then update localstorage
            if (localStorage.getItem('user')) {
              const _user = JSON.parse(localStorage.getItem('user'))
              _user.verified = verified
              localStorage.setItem('user', JSON.stringify(_user))
              commit(types.SAVE_USER, _user)
            }
            commit(types.SUCCESS, {
              msg: 'verify.EMAIL_VERIFIED'
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
  [types.EMAIL_VERIFIED](state, value) {
    state.emailVerified = value
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
