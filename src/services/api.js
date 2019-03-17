import axios from 'axios'

export default {
  getCities: function(params) {
    return axios.get('/cities', {
      params: params
    })
  },
  editCity: function(id, data) {
    return axios.patch(`/cities/${id}`, data)
  },
  saveCity: function(payload) {
    return axios.post('/cities/', payload)
  },
  deleteCity: function(payload) {
    return axios.delete(`/cities/${payload}`)
  },
  getUsers: function(params) {
    return axios.get('/users', {
      params: params
    })
  },
  editUser: function(id, data) {
    return axios.patch(`/users/${id}`, data)
  },
  saveUser: function(payload) {
    return axios.post('/users/', payload)
  },
  deleteUser: function(payload) {
    return axios.delete(`/users/${payload}`)
  },
  userLogin: function(payload) {
    return axios.post('/login', payload)
  },
  getAllCities: function() {
    return axios.get('/cities/all')
  },
  forgotPassword: function(payload) {
    return axios.post('/forgot', payload)
  },
  changeMyPassword: function(payload) {
    return axios.post('/profile/changePassword', payload)
  },
  getProfile: function() {
    return axios.get('/profile')
  },
  saveProfile: function(payload) {
    return axios.patch('/profile', payload)
  },
  resetPassword: function(payload) {
    return axios.post('/reset', payload)
  },
  userSignUp: function(payload) {
    return axios.post('/register', payload)
  },
  sendVerify: function(data) {
    return axios.post('/verify', data)
  }
}
