import * as types from '../mutation-types'
import axios from 'axios'
import i18n from '@/i18n.js'

const state = {}

const getters = {}

const actions = {
  getProfile({ commit }) {
    axios
      .get('/profile')
      .then(response => {
        console.log('SUCCESS! ->', response)
        if (response.status === 200) {
          commit(types.SHOW_LOADING, false)
          commit(types.ERROR, null)
        } else {
          commit(types.SHOW_LOADING, false)
        }
      })
      .catch(error => {
        // Catches error connection or any other error (checks if error.response exists)
        let errMsg = error.response
          ? i18n.t(`myProfile.${error.response.data.errors.message}`)
          : i18n.t('common.SERVER_TIMEOUT_CONNECTION_ERROR')
        commit(types.SHOW_LOADING, false)
        commit(types.ERROR, errMsg)
      })
  }
}

const mutations = {}

export default {
  state,
  getters,
  actions,
  mutations
}
