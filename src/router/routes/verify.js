export default [
  {
    path: '/verify/:id',
    name: 'verify',
    component: () =>
      import(/* webpackChunkName: "verify" */ '@/components/Verify.vue')
  }
]
