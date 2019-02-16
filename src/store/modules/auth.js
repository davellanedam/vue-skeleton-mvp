import * as types from '../mutation-types'
import router from '@/router'
import axios from 'axios'

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
  userSignUp({ commit }, payload) {
    commit(types.SHOW_LOADING, true)
    commit(types.SAVE_USER, payload)
    commit(types.SHOW_LOADING, false)
    commit(types.ERROR, null)
    router.push('/')
  },
  userLogin({ commit }, payload) {
    commit(types.SHOW_LOADING, true)
    const data = {
      email: payload.email,
      password: payload.password
    }
    axios
      .post('/login', data)
      .then(response => {
        console.log('SUCCESS! ->', response)
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
          commit(types.SHOW_LOADING, false)
          commit(types.ERROR, null)
          router.push('/home')
        } else {
          commit(types.SHOW_LOADING, false)
        }
      })
      .catch(error => {
        console.log('ERROR! ->', error.response.status)
        console.log('ERROR! ->', error.response.data.errors.msg)
        commit(types.SHOW_LOADING, false)
        commit(types.ERROR, error.response.data.errors.msg)
      })
  },
  autoLogin({ commit }) {
    commit(types.SAVE_USER, JSON.parse(localStorage.getItem('user')))
    commit(types.SAVE_TOKEN, JSON.parse(localStorage.getItem('token')))
    commit(types.SET_LOCALE, JSON.parse(localStorage.getItem('locale')))
  },
  userLogout({ commit }) {
    window.localStorage.removeItem('token')
    window.localStorage.removeItem('user')
    commit(types.LOGOUT)
    router.push('/login')
  }
}

const mutations = {
  [types.SAVE_TOKEN](state, token) {
    console.log('MUTATION TOKEN', token)
    state.token = token
    state.isTokenSet = true
  },
  [types.LOGOUT](state, token) {
    console.log('MUTATION TOKEN', token)
    state.user = null
    state.token = null
    state.isTokenSet = false
  },
  [types.SAVE_USER](state, user) {
    console.log('MUTATION USER', user)
    state.user = user
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
