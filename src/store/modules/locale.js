import * as types from '../mutation-types'
import i18n from '@/i18n'
import { Validator } from 'vee-validate'

const state = {
  locale: JSON.parse(localStorage.getItem('locale')) || 'en'
}

const getters = {
  locale: state => state.locale
}

const actions = {
  setLocale({ commit }, payload) {
    Validator.localize(payload)
    i18n.locale = payload
    window.localStorage.setItem('locale', JSON.stringify(payload))
    commit(types.SET_LOCALE, payload)
  }
}

const mutations = {
  [types.SET_LOCALE](state, value) {
    state.locale = value
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
