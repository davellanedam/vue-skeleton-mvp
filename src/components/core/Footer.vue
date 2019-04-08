<template>
  <v-footer height="60" class="justify-center text-xs-center d-block">
    <div class="mt-2">
      {{ $t('footer.MADE_WITH') }}
      <v-icon small class="red--text mx-0 px-0">mdi-cards-heart</v-icon>
      &nbsp;{{ $t('footer.BY') }}:
    </div>
    <div>
      Daniel Avellaneda -
      <a href="https://www.daniel-avellaneda.com"
        >https://www.daniel-avellaneda.com</a
      >
    </div>
  </v-footer>
</template>

<script>
export default {
  name: 'Footer'
}
</script>
