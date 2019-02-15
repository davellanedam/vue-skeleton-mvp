const requireRoute = require.context('.', false, /\.js$/) // Get js files inside routes folder
let routes = []

requireRoute.keys().forEach(fileName => {
  if (fileName === './index.js') return // Avoid the index.js file
  let route = requireRoute(fileName).default
  routes.push(...route)
})

export default routes
