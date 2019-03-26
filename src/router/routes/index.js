const requireRoute = require.context('.', false, /\.js$/) // Get js files inside routes folder
let routes = []

requireRoute.keys().forEach(fileName => {
  // Avoid the index.js file
  if (fileName === './index.js') {
    return
  }
  let route = requireRoute(fileName).default
  routes.push(...route)
})

export default routes
