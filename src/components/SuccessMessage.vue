<template>
  <v-container v-show="showSuccessMessage">
    <v-layout>
      <v-flex>
        <v-snackbar
          v-model="showSuccessMessage"
          color="success"
          multi-line
          bottom
          :timeout="6000"
        >
          {{ successMessage }}
          <v-btn dark flat @click="showSuccessMessage = false">
            Close
          </v-btn>
        </v-snackbar>
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
