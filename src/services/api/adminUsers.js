import axios from 'axios'

export default {
  getUsers(params) {
    return axios.get('/users', {
      params
    })
  },
  editUser(id, payload) {
    return axios.patch(`/users/${id}`, payload)
  },
  saveUser(payload) {
    return axios.post('/users/', payload)
  },
  deleteUser(id) {
    return axios.delete(`/users/${id}`)
  }
}
