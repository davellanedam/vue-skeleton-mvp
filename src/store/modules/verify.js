import * as types from '@/store/mutation-types'
import api from '@/services/api/verify'
import { buildSuccess, handleError } from '@/utils/utils.js'

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
      api
        .sendVerify(data)
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
            buildSuccess(
              {
                msg: 'verify.EMAIL_VERIFIED'
              },
              commit,
              resolve
            )
          }
        })
        .catch(error => {
          handleError(error, commit, reject)
        })
    })
  }
}

const mutations = {
  [types.EMAIL_VERIFIED](state, value) {
    state.emailVerified = value
  }
}

const state = {
  emailVerified: false
}

export default {
  state,
  getters,
  actions,
  mutations
}
