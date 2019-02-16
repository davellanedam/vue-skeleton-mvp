<template>
  <v-container fluid>
    <v-layout row wrap>
      <v-flex xs12 class="text-xs-center" mt-5>
        <h1 class="display-2 font-weight-bold mb-3">
          {{ $t('my_profile.TITLE') }}
        </h1>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data() {
    return {}
  },
  created() {
    // fetch the data when the view is created and the data is
    // already being observed
    this.getProfile()
  },
  methods: {
    getProfile() {
      this.$store.dispatch('getProfile')
    }
  }
}
</script>
