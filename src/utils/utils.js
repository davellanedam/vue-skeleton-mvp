import i18n from '@/plugins/i18n'
import * as types from '@/store/mutation-types'
import { isPast, format, parseISO } from 'date-fns'
import { store } from '@/store'
import { es, zhCN } from 'date-fns/locale'

const localesDateFns = {
  es,
  cn: zhCN
}

export const getFormat = (date, formatStr) => {
  return format(parseISO(date), formatStr, {
    locale: localesDateFns[window.__localeId__]
  })
}

export const formatErrorMessages = (translationParent, msg) => {
  const errorArray = []
  // Check for error msgs
  if (msg !== null) {
    const json = JSON.parse(JSON.stringify(msg))
    // If error message is an array, then we have mutiple errors
    if (Array.isArray(json)) {
      json.map((error) => {
        errorArray.push(i18n.t(`${translationParent}.${error.msg}`))
      })
    } else {
      // Single error
      errorArray.push(i18n.t(`${translationParent}.${msg}`))
    }
    return errorArray
  }
  // all good, return null
  return null
}

export const buildPayloadPagination = (pagination, search) => {
  const { page, itemsPerPage } = pagination
  let { sortDesc, sortBy } = pagination

  // When sorting you always get both values
  if (sortBy.length === 1 && sortDesc.length === 1) {
    // Gets order
    sortDesc = sortDesc[0] === true ? -1 : 1
    // Gets column to sort on
    sortBy = sortBy ? sortBy[0] : ''
  }

  let query = {}

  // If search and fields are defined
  if (search) {
    query = {
      sort: sortBy,
      order: sortDesc,
      page,
      limit: itemsPerPage,
      filter: search.query,
      fields: search.fields
    }
  } else {
    // Pagination with no filters
    query = {
      sort: sortBy,
      order: sortDesc,
      page,
      limit: itemsPerPage
    }
  }
  return query
}

// Catches error connection or any other error (checks if error.response exists)
export const handleError = (error, commit, reject) => {
  let errMsg = ''
  // Resets errors in store
  commit(types.SHOW_LOADING, false)
  commit(types.ERROR, null)

  // Checks if unauthorized
  if (error.response.status === 401) {
    store.dispatch('userLogout')
  } else {
    // Any other error
    errMsg = error.response
      ? error.response.data.errors.msg
      : 'SERVER_TIMEOUT_CONNECTION_ERROR'
    setTimeout(() => {
      return errMsg
        ? commit(types.ERROR, errMsg)
        : commit(types.SHOW_ERROR, false)
    }, 0)
  }
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
    return msg ? commit(types.SUCCESS, msg) : commit(types.SHOW_SUCCESS, false)
  }, 0)
  commit(types.ERROR, null)
  resolve(resolveParam)
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
          parseISO(JSON.parse(window.localStorage.getItem('tokenExpiration'))) *
            1000
        )
      )
    ) {
      store.dispatch('refreshToken')
    }
  }
}
