import axios from 'axios'

export default {
  getAllCities() {
    return axios.get('/cities/all')
  }
}
