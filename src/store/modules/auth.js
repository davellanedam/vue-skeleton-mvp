import router from '@/router'
import axios from 'axios'

const state = {
  user: null,
  token: JSON.parse(!!localStorage.getItem('token')) || null,
  error: null,
  loading: false,
  isTokenSet: !!localStorage.getItem('token')
}

const getters = {
  user: state => state.user,
  token: state => state.token,
  error: state => state.error,
  loading: state => state.loading,
  isTokenSet: state => state.isTokenSet,
  isAuthenticated: state => state.user !== null && state.user !== undefined
}

const actions = {
  userSignUp({ commit }, payload) {
    commit('setLoading', true)
    commit('setUser', {
      email: payload.email,
      password: payload.password
    })
    commit('setLoading', false)
    commit('setError', null)
    router.push('/')
  },
  userLogin({ commit }, payload) {
    commit('setLoading', true)
    console.log('SIGNIN ->')
    const data = {
      email: payload.email,
      password: payload.password
    }
    const authUser = {}
    axios
      .post('/login', data)
      .then(response => {
        console.log('SUCCESS! ->', response)
        if (response.status === 200) {
          authUser.user = response.data.user
          authUser.token = response.data.token
          commit('setToken', authUser.token)
          commit('setUser', authUser.user.email)
          window.localStorage.setItem('token', JSON.stringify(authUser.token))
          window.localStorage.setItem('user', JSON.stringify(authUser.user))
          commit('setIsTokenSet', true)
          commit('setLoading', false)
          commit('setError', null)
          router.push('/home')
        } else {
          commit('setLoading', false)
        }
      })
      .catch(error => {
        console.log('ERROR! ->', error.response.status)
        console.log('ERROR! ->', error.response.data.errors.msg)
        commit('setError', error.response.data.errors.msg)
        commit('setLoading', false)
      })
  },
  autoLogin({ commit }, payload) {
    commit('setUser', JSON.parse(payload))
    commit('setToken', localStorage.getItem('token'))
    router.push('/home')
  },
  userLogout({ commit }) {
    commit('setUser', null)
    commit('setToken', null)
    commit('setIsTokenSet', false)
    window.localStorage.removeItem('token')
    window.localStorage.removeItem('user')
    router.push('/login')
  }
}

const mutations = {
  setToken(state, payload) {
    state.token = payload
  },
  setUser(state, payload) {
    state.user = payload
  },
  setError(state, payload) {
    state.error = payload
  },
  setLoading(state, payload) {
    state.loading = payload
  },
  setIsTokenSet(state, payload) {
    state.isTokenSet = payload
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
