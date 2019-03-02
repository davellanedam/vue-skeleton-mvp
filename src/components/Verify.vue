<template>
  <v-container>
    <v-layout column px-3 pb-3>
      <v-flex xs12 class="text-xs-center" mt-5>
        <h1 class="display-2 font-weight-bold mb-3">
          {{ $t('verify.TITLE') }}
        </h1>
      </v-flex>
      <error-message />
      <success-message />
    </v-layout>
  </v-container>
</template>

<script>
import ErrorMessage from '@/components/ErrorMessage.vue'
import SuccessMessage from '@/components/SuccessMessage.vue'

export default {
  components: {
    ErrorMessage,
    SuccessMessage
  },
  created() {
    this.$store.dispatch('sendVerify', this.$route.params.id)
  }
}
</script>
