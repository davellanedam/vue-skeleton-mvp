import axios from 'axios'

export default {
  checkIfUpdatedSiteVersion() {
    return axios.get(`${window.location.origin}/version.json`)
  }
}
