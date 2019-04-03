<template>
  <v-container>
    <v-layout column px-3 pb-3>
      <v-flex xs12 text-xs-center mt-5 mb-3>
        <h1 class="display-2 font-weight-bold">{{ $t('verify.TITLE') }}</h1>
      </v-flex>
      <error-message />
      <success-message />
    </v-layout>
  </v-container>
</template>

<script>
import ErrorMessage from '@/components/common/ErrorMessage.vue'
import SuccessMessage from '@/components/common/SuccessMessage.vue'
import { mapActions } from 'vuex'

export default {
  metaInfo() {
    return {
      title: this.$store.getters.appTitle,
      titleTemplate: this.$t('verify.TITLE') + ' - %s'
    }
  },
  components: {
    ErrorMessage,
    SuccessMessage
  },
  methods: {
    ...mapActions(['sendVerify'])
  },
  async created() {
    try {
      await this.sendVerify(this.$route.params.id)
      // eslint-disable-next-line no-unused-vars
    } catch (error) {
      return
    }
  }
}
</script>
