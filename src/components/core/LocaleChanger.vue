<template>
  <v-menu v-model="showMenu" offset-y>
    <v-btn class="btnLocaleActivation" slot="activator" flat>
      <v-icon>mdi-earth</v-icon>
      &nbsp;{{ displayLocale }}
    </v-btn>
    <v-list>
      <v-list-tile
        active-class="white--text"
        v-for="(item, i) in langs"
        :key="`Lang${i}`"
        :value="item.lang"
        @click="switchLocale(item.lang)"
        :class="[item.class]"
      >
        <country-flag :country="item.flag" size="small" class="pl-5" />
        <v-list-tile-title class="ml-3">{{
          item.lang.toUpperCase()
        }}</v-list-tile-title>
      </v-list-tile>
    </v-list>
  </v-menu>
</template>

<script>
import CountryFlag from 'vue-country-flag'

export default {
  data() {
    return {
      showMenu: false,
      langs: [
        {
          lang: 'en',
          flag: 'gb',
          class: 'btnEN'
        },
        {
          lang: 'es',
          flag: 'es',
          class: 'btnES'
        }
      ]
    }
  },
  components: {
    CountryFlag
  },
  methods: {
    switchLocale(lang) {
      this.$store.dispatch('setLocale', lang)
    }
  },
  computed: {
    displayLocale() {
      return this.$i18n.locale
    }
  }
}
</script>
