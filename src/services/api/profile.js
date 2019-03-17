import axios from 'axios'

export default {
  changeMyPassword(payload) {
    return axios.post('/profile/changePassword', payload)
  },
  getProfile() {
    return axios.get('/profile')
  },
  saveProfile(payload) {
    return axios.patch('/profile', payload)
  }
}
