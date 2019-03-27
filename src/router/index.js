import Vue from 'vue'
import Router from 'vue-router'
import Meta from 'vue-meta'
import routes from '@/router/routes'
import { store } from '@/store'
import update from '@/services/api/updateSite'
import { compareVersion } from '@/utils/utils.js'
import { addMinutes, isPast } from 'date-fns'
const MINUTES_TO_CHECK_FOR_UPDATES = 120

Vue.use(Router)
Vue.use(Meta)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [...routes]
})

// If no localstorage appVersion or checkForAppUpdatesAt have been set, then set them
const setLocalStorageVersionAndDate = () => {
  if (
    window.localStorage.getItem('appVersion') === null ||
    window.localStorage.getItem('checkForAppUpdatesAt') === null
  ) {
    window.localStorage.setItem('appVersion', '"1.0.0"')
    window.localStorage.setItem('checkForAppUpdatesAt', new Date())
  }
}

// This is useful for iOS due the cache when app is added to home screen.
const checkIfUpdateIsNeeded = (localVersion, appVersion) => {
  // Set new date/time for next update check
  window.localStorage.setItem(
    'checkForAppUpdatesAt',
    addMinutes(new Date(), MINUTES_TO_CHECK_FOR_UPDATES)
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
const checkForUpdates = () => {
  // Checks if time set in localstorage is past to check for updates
  if (isPast(window.localStorage.getItem('checkForAppUpdatesAt'))) {
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

router.beforeEach((to, from, next) => {
  const isInWebAppiOS = window.navigator.standalone === true
  const isInWebAppChrome = window.matchMedia('(display-mode: standalone)')
    .matches
  // Checks if app is being used as stand alone
  if (isInWebAppiOS || isInWebAppChrome) {
    setLocalStorageVersionAndDate()
    checkForUpdates()
  }
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  const isTokenSet = store.getters.isTokenSet
  if (requiresAuth && !isTokenSet) {
    return next('/login')
  } else {
    return next()
  }
})

export default router
