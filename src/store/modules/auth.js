import router from '@/router'

const state = {
  user: null,
  error: null,
  loading: false,
  isLoggedIn: !!localStorage.getItem('user')
}

const getters = {
  user: state => state.user,
  error: state => state.error,
  loading: state => state.loading,
  isLoggedIn: state => state.isLoggedIn,
  isAuthenticated(state) {
    return state.user !== null && state.user !== undefined
  }
}

const actions = {
  userRegister({ commit }, payload) {
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
    commit('setUser', {
      email: payload.email,
      password: payload.password
    })
    window.localStorage.setItem('user', JSON.stringify(payload.email))
    commit('setLoading', false)
    commit('setError', null)
    router.push('/home')
  },
  autoLogin({ commit }, payload) {
    commit('setUser', {
      email: JSON.parse(payload)
    })
    router.push('/home')
  },
  userLogout({ commit }) {
    commit('setUser', null)
    window.localStorage.removeItem('user')
    router.push('/login')
  }
}

const mutations = {
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
