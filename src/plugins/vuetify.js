import Vue from 'vue'
import Vuetify from 'vuetify'
// import 'vuetify/src/stylus/app.styl'
// import colors from 'vuetify/es5/util/colors'
import VuetifyConfirm from 'vuetify-confirm'
import '@mdi/font/css/materialdesignicons.css'

Vue.use(Vuetify)
export default new Vuetify({
  theme: { dark: true }
})
Vue.use(VuetifyConfirm)
