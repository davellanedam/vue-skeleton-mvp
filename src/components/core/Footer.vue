<template>
  <v-footer height="60" class="d-block text-center">
    <div>
      v{{ appVersion }} - {{ $t('footer.MADE_WITH') }}
      <v-icon small class="red--text mx-0 px-0">mdi-cards-heart</v-icon>
      &nbsp;{{ $t('footer.BY') }}:
    </div>
    <a href="https://daniel-avellaneda.com">https://daniel-avellaneda.com</a>
  </v-footer>
</template>

<script>
export default {
  name: 'Footer',
  computed: {
    appVersion() {
      return this.$store.getters.appVersion
    }
  }
}
</script>
