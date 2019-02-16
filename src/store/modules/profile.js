import router from '@/router'
import axios from 'axios'

const state = {}

const getters = {}

const actions = {
  getProfile({ commit }) {
    axios
      .get('/profile')
      .then(response => {
        console.log('SUCCESS! ->', response)
        if (response.status === 200) {
        } else {
        }
      })
      .catch(error => {})
  }
}

const mutations = {}

export default {
  state,
  getters,
  actions,
  mutations
}
