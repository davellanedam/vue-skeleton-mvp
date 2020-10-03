<template>
  <div>
    <v-flex xs12 text-xs-center mt-5 mb-5>
      {{ $t('landing.BUY_ME_A_COFFEE_DESCRIPTION') }}
      <br />
      <br />
      <a
        class="bmc-button"
        target="_blank"
        href="https://www.buymeacoffee.com/muGHf41NT"
      >
        <img
          src="https://www.buymeacoffee.com/assets/img/BMC-btn-logo.svg"
          :alt="$t('landing.BUY_ME_A_COFFEE')"
        />
        <span style="margin-left: 5px">{{
          $t('landing.BUY_ME_A_COFFEE')
        }}</span>
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
    <v-flex xs12>
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

<style>
@import url('https://fonts.googleapis.com/css?family=Cookie');

.bmc-button img {
  width: 27px !important;
  margin-bottom: 1px !important;
  box-shadow: none !important;
  border: none !important;
  vertical-align: middle !important;
}
.bmc-button {
  line-height: 36px !important;
  height: 37px !important;
  text-decoration: none !important;
  display: inline-flex !important;
  color: #ffffff !important;
  background-color: #ff813f !important;
  border-radius: 3px !important;
  border: 1px solid transparent !important;
  padding: 1px 9px !important;
  font-size: 22px !important;
  letter-spacing: 0.6px !important;
  margin: 0 auto !important;
  font-family: 'Cookie', cursive !important;
  -webkit-box-sizing: border-box !important;
  box-sizing: border-box !important;
  -o-transition: 0.3s all linear !important;
  -webkit-transition: 0.3s all linear !important;
  -moz-transition: 0.3s all linear !important;
  -ms-transition: 0.3s all linear !important;
  transition: 0.3s all linear !important;
}
</style>
