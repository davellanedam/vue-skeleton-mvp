import * as types from '../mutation-types'
import api from '@/services/api/adminCities'

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
    return new Promise((resolve, reject) => {
      api
        .getCities(payload)
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
          reject(error)
        })
    })
  },
  editCity({ commit }, payload) {
    return new Promise((resolve, reject) => {
      const data = {
        name: payload.name
      }
      api
        .editCity(payload._id, data)
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
          reject(error)
        })
    })
  },
  saveCity({ commit }, payload) {
    return new Promise((resolve, reject) => {
      api
        .saveCity(payload)
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
          reject(error)
        })
    })
  },
  deleteCity({ commit }, payload) {
    return new Promise((resolve, reject) => {
      api
        .deleteCity(payload)
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
          reject(error)
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
