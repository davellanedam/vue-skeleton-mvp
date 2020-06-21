import { addMinutes, isPast, format, fromUnixTime } from 'date-fns'
import update from '@/services/api/updateSite'
import { store } from '@/store'

const MINUTES_TO_CHECK_FOR_UPDATES = 120

// version from `version.json` - first param
// version in bundle file - second param
export const compareVersion = (latestVersion, localVersion) => {
  const versionsA = latestVersion.split(/\./g)
  const versionsB = localVersion.split(/\./g)
  while (versionsA.length || versionsB.length) {
    const a = Number(versionsA.shift())
    const b = Number(versionsB.shift())
    if (a === b) {
      continue
    }
    return a > b || isNaN(b)
  }
  return false
}

// If no localstorage appVersion or checkForAppUpdatesAt have been set, then set them
export const setLocalStorageDateForUpdates = () => {
  if (window.localStorage.getItem('checkForAppUpdatesAt') === null) {
    window.localStorage.setItem(
      'checkForAppUpdatesAt',
      JSON.stringify(format(new Date(), 't'))
    )
  }
}

// This is useful for iOS due the cache when app is added to home screen.
export const checkIfUpdateIsNeeded = (latestVersion, localVersion) => {
  // Set new date/time for next update check
  window.localStorage.setItem(
    'checkForAppUpdatesAt',
    JSON.stringify(
      format(addMinutes(new Date(), MINUTES_TO_CHECK_FOR_UPDATES), 't')
    )
  )
  // If there is a new version available, so refresh page
  const shouldForceRefresh = compareVersion(latestVersion, localVersion)
  if (shouldForceRefresh) {
    // Reload page
    window.location.reload(true)
  }
}

// Gets file from axios at url SERVER/version.json
export const checkForUpdates = () => {
  setLocalStorageDateForUpdates()
  // Checks if checkForAppUpdatesAt set in localstorage is past to check for updates
  if (
    isPast(
      new Date(
        fromUnixTime(
          JSON.parse(window.localStorage.getItem('checkForAppUpdatesAt'))
        )
      )
    )
  ) {
    update
      .checkIfUpdatedSiteVersion()
      .then((response) => {
        if (response.status === 200) {
          // Get latestVersion from response
          const latestVersion = response.data.version.trim()
          // Get localVersion from localstorage
          const localVersion = store.getters.appVersion
          // Checks if an update is needed
          checkIfUpdateIsNeeded(latestVersion, localVersion)
        }
      })
      // eslint-disable-next-line no-unused-vars
      .catch((error) => {})
  }
}
