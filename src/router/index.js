import Vue from 'vue'
import Router from 'vue-router'
import Meta from 'vue-meta'
import routes from '@/router/routes'
import { store } from '@/store'
import { isMobile } from 'mobile-device-detect'
import { checkForUpdates, checkIfTokenNeedsRefresh } from '@/utils/utils.js'

Vue.use(Router)
Vue.use(Meta)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [...routes]
})

router.beforeEach((to, from, next) => {
  // Checks if app is being used in mobile
  if (isMobile) {
    checkForUpdates()
  }
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  const isTokenSet = store.getters.isTokenSet
  if (requiresAuth && !isTokenSet) {
    return next('/login')
  } else {
    checkIfTokenNeedsRefresh()
    return next()
  }
})

export default router
