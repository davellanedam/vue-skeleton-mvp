import * as types from '../mutation-types'
import router from '@/router'
import axios from 'axios'

const actions = {
  userSignUp({ commit }, payload) {
    commit(types.SHOW_LOADING, true)
    const data = {
      name: payload.name,
      email: payload.email,
      password: payload.password
    }
    axios
      .post('/register', data)
      .then(response => {
        if (response.status === 201) {
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
          router.push({
            path: 'home'
          })
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
  }
}

export default {
  actions
}
