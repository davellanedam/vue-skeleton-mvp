import i18n from '@/i18n.js'
import * as types from '@/store/mutation-types'

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
  commit(types.ERROR, errMsg)
  reject(error)
}
