import * as types from '@/store/mutation-types'
import i18n from '@/plugins/i18n'
import { Validator } from 'vee-validate'

const getters = {
  locale: state => state.locale
}

const actions = {
  setLocale({ commit }, payload) {
    commit(types.SUCCESS, null)
    commit(types.ERROR, null)
    i18n.locale = payload
    Validator.localize(payload)
    window.localStorage.setItem('locale', JSON.stringify(payload))
    commit(types.SET_LOCALE, payload)
  }
}

const mutations = {
  [types.SET_LOCALE](state, value) {
    state.locale = value
  }
}

const state = {
  locale:
    JSON.parse(localStorage.getItem('locale')) ||
    navigator.language.slice(0, 2) ||
    'en'
}

export default {
  state,
  getters,
  actions,
  mutations
}
