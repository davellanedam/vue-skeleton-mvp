export default [
  {
    path: '*',
    component: () =>
      import(/* webpackChunkName: "notfound" */ '@/components/NotFound.vue')
  }
]
