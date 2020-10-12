<template>
  <v-menu v-model="showMenu" offset-y>
    <template v-slot:activator="{ on }">
      <v-btn class="btnLocaleActivation" v-on="on" text>
        <v-icon>mdi-earth</v-icon>
        &nbsp;{{ displayLocale }}
      </v-btn>
    </template>
    <v-list>
      <v-list-item
        active-class="white--text"
        v-for="(item, i) in langs"
        :key="`Lang${i}`"
        :value="item.lang"
        @click="switchLocale(item.lang)"
        :class="[item.class]"
      >
        <country-flag :country="item.flag" size="small" />
        <v-list-item-title class="ml-3">{{
          item.lang.toUpperCase()
        }}</v-list-item-title>
      </v-list-item>
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
        },
        {
          lang: 'fr',
          flag: 'fr',
          class: 'btnFR'
        },
        {
          lang: 'cn',
          flag: 'cn',
          class: 'btnCN'
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

<style>
.flag {
  width: 118px !important;
}

.v-list-item {
  min-width: 185px !important;
}
</style>
