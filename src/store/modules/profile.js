import * as types from '../mutation-types'
import axios from 'axios'

const state = {
  profile: {
    verified: false,
    name: '',
    email: '',
    phone: '',
    city: '',
    country: '',
    urlTwitter: '',
    urlGitHub: ''
  },
  allCities: []
}

const getters = {
  profile: state => state.profile,
  allCities: state => state.allCities
}

const actions = {
  getAllCities({ commit }) {
    axios
      .get('/cities/all')
      .then(response => {
        if (response.status === 200) {
          const cities = []
          const array = response.data
          array.forEach(element => {
            cities.push(element.name)
          })
          commit(types.FILL_ALL_CITIES, cities)
        }
      })
      .catch(error => {
        // Catches error connection or any other error (checks if error.response exists)
        let errMsg = error.response
          ? error.response.data.errors.msg
          : 'SERVER_TIMEOUT_CONNECTION_ERROR'
        commit(types.SHOW_LOADING, false)
        commit(types.ERROR, errMsg)
      })
  },
  getProfile({ commit }) {
    commit(types.SHOW_LOADING, true)
    axios
      .get('/profile')
      .then(response => {
        if (response.status === 200) {
          commit(types.FILL_PROFILE, response.data)
          commit(types.SHOW_LOADING, false)
          commit(types.ERROR, null)
        } else {
          commit(types.SHOW_LOADING, false)
        }
      })
      .catch(error => {
        // Catches error connection or any other error (checks if error.response exists)
        let errMsg = error.response
          ? error.response.data.errors.msg
          : 'SERVER_TIMEOUT_CONNECTION_ERROR'
        commit(types.SHOW_LOADING, false)
        commit(types.ERROR, errMsg)
      })
  },
  saveProfile({ commit }, payload) {
    commit(types.SHOW_LOADING, true)
    const data = {
      name: payload.name,
      phone: payload.phone,
      city: payload.city,
      country: payload.country,
      urlTwitter: payload.urlTwitter,
      urlGitHub: payload.urlGitHub
    }
    axios
      .patch('/profile', data)
      .then(response => {
        if (response.status === 200) {
          commit(types.FILL_PROFILE, response.data)
          commit(types.SUCCESS, {
            msg: 'myProfile.PROFILE_SAVED_SUCCESSFULLY'
          })
          commit(types.SHOW_LOADING, false)
          commit(types.ERROR, null)
        } else {
          commit(types.SHOW_LOADING, false)
        }
      })
      .catch(error => {
        // Catches error connection or any other error (checks if error.response exists)
        let errMsg = error.response
          ? error.response.data.errors.msg
          : 'SERVER_TIMEOUT_CONNECTION_ERROR'
        commit(types.SHOW_LOADING, false)
        commit(types.ERROR, errMsg)
      })
  },
  addProfileData({ commit }, data) {
    commit(types.ADD_PROFILE_DATA, data)
  }
}

const mutations = {
  [types.FILL_ALL_CITIES](state, cities) {
    state.allCities = cities
  },
  [types.FILL_PROFILE](state, data) {
    state.profile.verified = data.verified
    state.profile.name = data.name
    state.profile.email = data.email
    state.profile.phone = data.phone
    state.profile.city = data.city
    state.profile.country = data.country
    state.profile.urlTwitter = data.urlTwitter
    state.profile.urlGitHub = data.urlGitHub
  },
  [types.ADD_PROFILE_DATA](state, data) {
    switch (data.key) {
      case 'name':
        state.profile.name = data.value
        break
      case 'phone':
        state.profile.phone = data.value
        break
      case 'city':
        state.profile.city = data.value
        break
      case 'country':
        state.profile.country = data.value
        break
      case 'urlTwitter':
        state.profile.urlTwitter = data.value
        break
      case 'urlGitHub':
        state.profile.urlGitHub = data.value
        break
      default:
        break
    }
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
