<template>
  <div>
    <v-flex xs12 text-xs-center mt-5 mb-5>
      {{ $t('landing.BUY_ME_A_COFFEE') }}
      <br />
      <br />
      <a href="https://www.buymeacoffee.com/muGHf41NT" target="_blank">
        <img
          src="https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png"
          alt="Buy Me A Coffee"
          style="height: auto !important;width: auto !important;"
        />
      </a>
    </v-flex>

    <v-flex xs12 text-xs-center mb-5>
      {{ $t('landing.DESCRIPTION_VUE') }}
      <br />
      <br />
      {{ $t('landing.FRONTEND_DOCUMENTATION') }}:
      <a href="https://github.com/davellanedam/vue-skeleton-mvp"
        >https://github.com/davellanedam/vue-skeleton-mvp</a
      >
    </v-flex>
    <v-flex xs12 text-xs-center mb-5>
      {{ $t('landing.DESCRIPTION_API') }}
      <br />
      <br />
      {{ $t('landing.API_DOCUMENTATION') }}:
      <a
        href="https://github.com/davellanedam/node-express-mongodb-jwt-rest-api-skeleton"
        >https://github.com/davellanedam/node-express-mongodb-jwt-rest-api-skeleton</a
      >
    </v-flex>
  </div>
</template>

<script>
export default {
  name: 'ProjectDescription'
}
</script>
