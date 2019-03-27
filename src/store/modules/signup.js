import * as types from '@/store/mutation-types'
import router from '@/router'
import api from '@/services/api/signup'
import { buildSuccess, handleError } from '@/utils/utils.js'

const actions = {
  userSignUp({ commit }, payload) {
    return new Promise((resolve, reject) => {
      commit(types.SHOW_LOADING, true)
      api
        .userSignUp(payload)
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
            buildSuccess(
              null,
              commit,
              resolve,
              router.push({
                name: 'home'
              })
            )
          }
        })
        .catch(error => {
          handleError(error, commit, reject)
        })
    })
  }
}

export default {
  actions
}
