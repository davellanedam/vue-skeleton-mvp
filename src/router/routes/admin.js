export default [
  {
    path: '/admin/cities',
    name: 'admin-cities',
    component: () =>
      import(/* webpackChunkName: "admin-cities" */ '@/components/AdminCities.vue')
  }
]
