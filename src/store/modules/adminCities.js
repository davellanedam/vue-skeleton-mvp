import * as types from '@/store/mutation-types'
import api from '@/services/api/adminCities'
import { buildSuccess, handleError } from '@/utils/utils.js'

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
          handleError(error, commit, reject)
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
            buildSuccess(
              {
                msg: 'common.SAVED_SUCCESSFULLY'
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
  },
  saveCity({ commit }, payload) {
    return new Promise((resolve, reject) => {
      api
        .saveCity(payload)
        .then(response => {
          if (response.status === 201) {
            buildSuccess(
              {
                msg: 'common.SAVED_SUCCESSFULLY'
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
  },
  deleteCity({ commit }, payload) {
    return new Promise((resolve, reject) => {
      api
        .deleteCity(payload)
        .then(response => {
          if (response.status === 200) {
            buildSuccess(
              {
                msg: 'common.DELETED_SUCCESSFULLY'
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
  [types.CITIES](state, cities) {
    state.cities = cities
  },
  [types.TOTAL_CITIES](state, value) {
    state.totalCities = value
  }
}

const state = {
  cities: [],
  totalCities: 0
}

export default {
  state,
  getters,
  actions,
  mutations
}
