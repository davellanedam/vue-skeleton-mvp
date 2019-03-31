import i18n from '@/i18n.js'
import * as types from '@/store/mutation-types'
import { addMinutes, isPast, format } from 'date-fns'
import update from '@/services/api/updateSite'
import { store } from '@/store'

const localesDateFns = {
  en: require('date-fns/locale/en'),
  es: require('date-fns/locale/es')
}
const MINUTES_TO_CHECK_FOR_UPDATES = 120

export const getFormat = (date, formatStr) => {
  return format(date, formatStr, {
    locale: localesDateFns[window.__localeId__]
  })
}

export const formatErrorMessages = (translationParent, msg) => {
  let errorArray = []
  // Check for error msgs
  if (msg !== null) {
    let json = JSON.parse(JSON.stringify(msg))
    // If error message is an array, then we have mutiple errors
    if (Array.isArray(json)) {
      json.map(error => {
        errorArray.push(i18n.t(`${translationParent}.${error.msg}`))
      })
    } else {
      // Single error
      errorArray.push(i18n.t(`${translationParent}.${msg}`))
    }
    return errorArray
  } else {
    // all good, return null
    return null
  }
}

export const buildPayloadPagination = (pagination, search) => {
  let { sortBy, descending, page, rowsPerPage } = pagination
  // Gets order
  descending = descending ? -1 : 1

  let query = {}

  // If search and fields are defined
  if (search) {
    query = {
      sort: sortBy,
      order: descending,
      page,
      limit: rowsPerPage,
      filter: search.query,
      fields: search.fields
    }
  } else {
    // Pagination with no filters
    query = {
      sort: sortBy,
      order: descending,
      page,
      limit: rowsPerPage
    }
  }
  return query
}

export const handleError = (error, commit, reject) => {
  // Catches error connection or any other error (checks if error.response exists)
  let errMsg = error.response
    ? error.response.data.errors.msg
    : 'SERVER_TIMEOUT_CONNECTION_ERROR'
  commit(types.SHOW_LOADING, false)
  commit(types.ERROR, null)
  setTimeout(() => {
    errMsg ? commit(types.ERROR, errMsg) : commit(types.SHOW_ERROR, false)
  }, 0)
  reject(error)
}

export const buildSuccess = (
  msg,
  commit,
  resolve,
  resolveParam = undefined
) => {
  commit(types.SHOW_LOADING, false)
  commit(types.SUCCESS, null)
  setTimeout(() => {
    msg ? commit(types.SUCCESS, msg) : commit(types.SHOW_SUCCESS, false)
  }, 0)
  commit(types.ERROR, null)
  resolve(resolveParam)
}

export const compareVersion = (v1, v2) => {
  if (typeof v1 !== 'string') {
    return false
  }
  if (typeof v2 !== 'string') {
    return false
  }
  v1 = v1.split('.')
  v2 = v2.split('.')
  const k = Math.min(v1.length, v2.length)
  for (let i = 0; i < k; ++i) {
    v1[i] = parseInt(v1[i], 10)
    v2[i] = parseInt(v2[i], 10)
    if (v1[i] > v2[i]) {
      return 1
    }
    if (v1[i] < v2[i]) {
      return -1
    }
  }
  return v1.length === v2.length ? 0 : v1.length < v2.length ? -1 : 1
}

// If no localstorage appVersion or checkForAppUpdatesAt have been set, then set them
export const setLocalStorageVersionAndDateForUpdates = () => {
  if (
    window.localStorage.getItem('appVersion') === null ||
    window.localStorage.getItem('checkForAppUpdatesAt') === null
  ) {
    window.localStorage.setItem('appVersion', '"1.0.0"')
    window.localStorage.setItem(
      'checkForAppUpdatesAt',
      JSON.stringify(format(new Date(), 'X'))
    )
  }
}

// This is useful for iOS due the cache when app is added to home screen.
export const checkIfUpdateIsNeeded = (localVersion, appVersion) => {
  // Set new date/time for next update check
  window.localStorage.setItem(
    'checkForAppUpdatesAt',
    JSON.stringify(
      format(addMinutes(new Date(), MINUTES_TO_CHECK_FOR_UPDATES), 'X')
    )
  )
  // Compare versions, if result is -1 (localVersion is lower than appVersion)
  // there is a new version available, so refresh page
  if (compareVersion(localVersion, appVersion) === -1) {
    window.localStorage.setItem('appVersion', JSON.stringify(appVersion))
    // Reload page
    window.location.reload(true)
  }
}

// Gets file from axios at url SERVER/version.manifest
export const checkForUpdates = () => {
  setLocalStorageVersionAndDateForUpdates()
  // Checks if checkForAppUpdatesAt set in localstorage is past to check for updates
  if (
    isPast(
      new Date(
        JSON.parse(window.localStorage.getItem('checkForAppUpdatesAt')) * 1000
      )
    )
  ) {
    update.checkIfUpdatedSiteVersion().then(response => {
      if (response.status === 200) {
        // Get localVersion from localstorage
        const localVersion = JSON.parse(
          window.localStorage.getItem('appVersion')
        )
        // Get appVersion from response
        const appVersion = response.data.trim()
        // Checks if an update is needed
        checkIfUpdateIsNeeded(localVersion, appVersion)
      }
    })
  }
}

// Checks if tokenExpiration in localstorage date is past, if so then trigger an update
export const checkIfTokenNeedsRefresh = () => {
  // Checks if time set in localstorage is past to check for refresh token
  if (
    window.localStorage.getItem('token') !== null &&
    window.localStorage.getItem('tokenExpiration') !== null
  ) {
    if (
      isPast(
        new Date(
          JSON.parse(window.localStorage.getItem('tokenExpiration')) * 1000
        )
      )
    ) {
      store.dispatch('refreshToken')
    }
  }
}
