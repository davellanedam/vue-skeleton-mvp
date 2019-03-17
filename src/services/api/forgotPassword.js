import axios from 'axios'

export default {
  forgotPassword(payload) {
    return axios.post('/forgot', payload)
  }
}
