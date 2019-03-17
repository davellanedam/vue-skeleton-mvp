import * as types from '../mutation-types'
import router from '@/router'
import api from '../../services/api'

const state = {
  user: null,
  token: JSON.parse(!!localStorage.getItem('token')) || null,
  isTokenSet: !!localStorage.getItem('token')
}

const getters = {
  user: state => state.user,
  token: state => state.token,
  isTokenSet: state => state.isTokenSet
}

const actions = {
  userLogin({ commit }, payload) {
    return new Promise((resolve, reject) => {
      commit(types.SHOW_LOADING, true)
      api
        .userLogin(payload)
        .then(response => {
          if (response.status === 200) {
            window.localStorage.setItem(
              'user',
              JSON.stringify(response.data.user)
            )
            window.localStorage.setItem(
              'token',
              JSON.stringify(response.data.token)
            )
            commit(types.SAVE_USER, response.data.user)
            commit(types.SAVE_TOKEN, response.data.token)
            commit(types.EMAIL_VERIFIED, response.data.user.verified)
            commit(types.SHOW_LOADING, false)
            commit(types.ERROR, null)
            resolve(
              router.push({
                name: 'home'
              })
            )
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
  },
  autoLogin({ commit }) {
    const user = JSON.parse(localStorage.getItem('user'))
    commit(types.SAVE_USER, user)
    commit(types.SAVE_TOKEN, JSON.parse(localStorage.getItem('token')))
    commit(types.SET_LOCALE, JSON.parse(localStorage.getItem('locale')))
    commit(types.EMAIL_VERIFIED, user.verified)
  },
  userLogout({ commit }) {
    window.localStorage.removeItem('token')
    window.localStorage.removeItem('user')
    commit(types.LOGOUT)
    router.push({
      name: 'login'
    })
  }
}

const mutations = {
  [types.SAVE_TOKEN](state, token) {
    state.token = token
    state.isTokenSet = true
  },
  [types.LOGOUT](state) {
    state.user = null
    state.token = null
    state.isTokenSet = false
  },
  [types.SAVE_USER](state, user) {
    state.user = user
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
