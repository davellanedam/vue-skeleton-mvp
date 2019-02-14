export default [
  {
    path: '/login',
    name: 'login',
    component: () =>
      import(/* webpackChunkName: "login" */ '../components/Login.vue')
  },
  {
    path: '/register',
    name: 'register',
    component: () =>
      import(/* webpackChunkName: "register" */ '../components/Register.vue')
  }
]
