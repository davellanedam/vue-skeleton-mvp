<template>
  <v-container>
    <v-layout>
      <v-flex>
        <v-alert
          v-model="showSuccessMessage"
          type="success"
          dismissible
          transition="scale-transition"
        >
          {{ successMessage }}
        </v-alert>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import * as types from '../store/mutation-types'

export default {
  data() {
    return {
      showSuccessMessage: false
    }
  },
  computed: {
    successMessage() {
      if (this.$store.state.success.successMessageParams) {
        return this.$i18n.t(this.$store.state.success.successMessage, [
          ...this.$store.state.success.successMessageParams
        ])
      } else {
        return this.$i18n.t(this.$store.state.success.successMessage)
      }
    }
  },
  watch: {
    successMessage(value) {
      if (value) {
        this.showSuccessMessage = true
      }
    },
    showSuccessMessage(value) {
      if (!value) {
        this.$store.commit(types.SUCCESS, null)
      }
    }
  }
}
</script>
