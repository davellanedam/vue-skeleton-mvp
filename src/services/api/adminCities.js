import axios from 'axios'

export default {
  getCities(params) {
    return axios.get('/cities', {
      params
    })
  },
  editCity(id, payload) {
    return axios.patch(`/cities/${id}`, payload)
  },
  saveCity(payload) {
    return axios.post('/cities/', payload)
  },
  deleteCity(id) {
    return axios.delete(`/cities/${id}`)
  }
}
