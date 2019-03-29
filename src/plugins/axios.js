'use strict'

import Vue from 'vue'
import axios from 'axios'
import { isMobile } from 'mobile-device-detect'
import { checkForUpdates, checkIfTokenNeedsRefresh } from '@/utils/utils.js'

axios.defaults.baseURL = process.env.VUE_APP_API_URL || ''
axios.defaults.headers.common['Accept-Language'] =
  JSON.parse(localStorage.getItem('locale')) || 'en'

axios.interceptors.request.use(
  config => {
    // Do something before request is sent
    // If request is different than any of the URLS in urlsExcludedForBearerHeader
    // then send Authorization header with token from localstorage
    const urlsExcludedForBearerHeader = [
      '/login',
      '/forgot',
      '/register',
      '/reset',
      `${window.location.origin}/version.manifest`
    ]
    if (urlsExcludedForBearerHeader.indexOf(config.url) === -1) {
      config.headers.Authorization =
        'Bearer ' + JSON.parse(localStorage.getItem('token'))
    }
    return config
  },
  error => {
    // Do something with request error
    return Promise.reject(error)
  }
)

// Add a response interceptor
axios.interceptors.response.use(
  response => {
    // Do something with response data
    // Checks if app is being used in mobile
    if (response.config.url !== process.env.VUE_APP_API_URL + '/token') {
      if (isMobile) {
        checkForUpdates()
      }
      checkIfTokenNeedsRefresh()
    }
    return response
  },
  error => {
    // Do something with response error
    return Promise.reject(error)
  }
)

Plugin.install = Vue => {
  Vue.axios = axios
  window.axios = axios
  Object.defineProperties(Vue.prototype, {
    axios: {
      get() {
        return axios
      }
    },
    $axios: {
      get() {
        return axios
      }
    }
  })
}

Vue.use(Plugin)

export default Plugin
