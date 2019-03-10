export default [
  {
    path: '/admin/cities',
    name: 'admin-cities',
    component: () =>
      import(/* webpackChunkName: "admin-cities" */ '@/components/AdminCities.vue')
  },
  {
    path: '/admin/users',
    name: 'admin-users',
    component: () =>
      import(/* webpackChunkName: "admin-users" */ '@/components/AdminUsers.vue')
  }
]
