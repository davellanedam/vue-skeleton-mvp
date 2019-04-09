import Vue from 'vue'
import router from '@/router'
import VueAnalytics from 'vue-analytics'

// Use Google Analytics only in production mode
if (process.env.NODE_ENV === 'production') {
  Vue.use(VueAnalytics, {
    id: 'UA-137710319-1',
    router
  })
}
