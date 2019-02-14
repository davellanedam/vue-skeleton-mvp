import router from '@/router'
import axios from 'axios'

const state = {
  user: null,
  token: null,
  id: JSON.parse(!!localStorage.getItem('user'))._id,
  emailVerified: false,
  error: null,
  loading: false,
  isLoggedIn: !!localStorage.getItem('token')
}

const getters = {
  user: state => state.user,
  token: state => state.token,
  id: state => state.id,
  error: state => state.error,
  loading: state => state.loading,
  isLoggedIn: state => state.isLoggedIn,
  isAuthenticated(state) {
    return state.user !== null && state.user !== undefined
  }
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
      .post(process.env.VUE_APP_API_URL + '/login', data)
      .then(response => {
        console.log('SUCCESS! ->', response)
        if (response.status === 200) {
          authUser.user = response.data.user
          authUser.token = response.data.token
          commit('setToken', authUser.token)
          commit('setUser', authUser.user.email)
          commit('setVerified', authUser.user.verified)
          window.localStorage.setItem('token', JSON.stringify(authUser.token))
          window.localStorage.setItem('user', JSON.stringify(authUser.user))
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
    commit('setUser', {
      email: JSON.parse(payload)
    })
    router.push('/home')
  },
  userLogout({ commit }) {
    commit('setUser', null)
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
  setLoggedIn(state) {
    state.isLoggedIn = !!localStorage.getItem('user')
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
