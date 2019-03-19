import Vue from 'vue'
import Router from 'vue-router'
import Meta from 'vue-meta'
import routes from './routes'
import { store } from '@/store'

Vue.use(Router)
Vue.use(Meta)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [...routes]
})

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  const isTokenSet = store.getters.isTokenSet
  if (requiresAuth && !isTokenSet) {
    next('/login')
  } else {
    next()
  }
})

export default router
