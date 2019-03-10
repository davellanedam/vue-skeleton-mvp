import * as types from '../mutation-types'
import axios from 'axios'

const state = {
  cities: [],
  totalCities: 0
}

const getters = {
  cities: state => state.cities,
  totalCities: state => state.totalCities
}

const actions = {
  getCities({ commit }, payload) {
    return new Promise(resolve => {
      axios
        .get('/cities', {
          params: payload
        })
        .then(response => {
          if (response.status === 200) {
            commit(types.CITIES, response.data.docs)
            commit(types.TOTAL_CITIES, response.data.totalDocs)
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
        })
    })
  },
  editCity({ commit }, payload) {
    return new Promise(resolve => {
      const data = {
        name: payload.name
      }
      axios
        .patch(`/cities/${payload._id}`, data)
        .then(response => {
          if (response.status === 200) {
            commit(types.SUCCESS, {
              msg: 'common.SAVED_SUCCESSFULLY'
            })
            commit(types.ERROR, null)
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
        })
    })
  },
  saveCity({ commit }, payload) {
    return new Promise(resolve => {
      const data = {
        name: payload.name
      }
      axios
        .post('/cities/', data)
        .then(response => {
          if (response.status === 201) {
            commit(types.SUCCESS, {
              msg: 'common.SAVED_SUCCESSFULLY'
            })
            commit(types.ERROR, null)
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
        })
    })
  },
  deleteCity({ commit }, payload) {
    return new Promise(resolve => {
      axios
        .delete(`/cities/${payload}`)
        .then(response => {
          if (response.status === 200) {
            commit(types.SUCCESS, {
              msg: 'common.DELETED_SUCCESSFULLY'
            })
            commit(types.ERROR, null)
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
        })
    })
  }
}

const mutations = {
  [types.CITIES](state, cities) {
    state.cities = cities
  },
  [types.TOTAL_CITIES](state, value) {
    state.totalCities = value
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
