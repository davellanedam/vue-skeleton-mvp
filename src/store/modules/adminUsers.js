import * as types from '../mutation-types'
import axios from 'axios'

const state = {
  users: [],
  totalUsers: 0
}

const getters = {
  users: state => state.users,
  totalUsers: state => state.totalUsers
}

const actions = {
  getUsers({ commit }, payload) {
    return new Promise((resolve, reject) => {
      axios
        .get('/users', {
          params: payload
        })
        .then(response => {
          if (response.status === 200) {
            commit(types.USERS, response.data.docs)
            commit(types.TOTAL_USERS, response.data.totalDocs)
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
  editUser({ commit }, payload) {
    return new Promise((resolve, reject) => {
      const data = {
        name: payload.name,
        email: payload.email,
        role: payload.role,
        phone: payload.phone,
        city: payload.city,
        country: payload.country
      }
      axios
        .patch(`/users/${payload._id}`, data)
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
  saveUser({ commit }, payload) {
    return new Promise((resolve, reject) => {
      const data = {
        name: payload.name,
        email: payload.email,
        password: payload.password,
        role: payload.role,
        phone: payload.phone,
        city: payload.city,
        country: payload.country
      }
      axios
        .post('/users/', data)
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
  deleteUser({ commit }, payload) {
    return new Promise((resolve, reject) => {
      axios
        .delete(`/users/${payload}`)
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
  [types.USERS](state, users) {
    state.users = users
  },
  [types.TOTAL_USERS](state, value) {
    state.totalUsers = value
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
