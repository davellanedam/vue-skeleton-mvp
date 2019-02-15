export default [
  {
    path: '/home',
    name: 'home',
    meta: {
      requiresAuth: true
    },
    component: () =>
      import(/* webpackChunkName: "home" */ '@/components/Home.vue')
  }
]
