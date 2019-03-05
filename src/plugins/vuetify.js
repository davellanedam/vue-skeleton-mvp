import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import 'vuetify/src/stylus/app.styl'
import colors from 'vuetify/es5/util/colors'

Vue.use(Vuetify, {
  theme: {
    primary: colors.yellow.lighten3,
    secondary: colors.shades.black,
    error: colors.orange.darken3
  },
  iconfont: 'md'
})
