export default [
  {
    path: '/',
    name: 'landing',
    component: () =>
      import(/* webpackChunkName: "landing" */ '@/components/Landing.vue')
  }
]
