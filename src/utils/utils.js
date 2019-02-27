import i18n from '@/i18n.js'

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
