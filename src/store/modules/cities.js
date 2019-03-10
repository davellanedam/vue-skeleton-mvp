import * as types from '../mutation-types'
import axios from 'axios'

const state = {
  allCities: []
}

const getters = {
  allCities: state => state.allCities
}

const actions = {
  getAllCities({ commit }) {
    return new Promise((resolve, reject) => {
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
  [types.FILL_ALL_CITIES](state, cities) {
    state.allCities = cities
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
