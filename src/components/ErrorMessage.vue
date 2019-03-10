<template>
  <v-container v-show="showErrorMessage">
    <v-layout>
      <v-flex>
        <v-alert v-model="showErrorMessage" type="error" dismissible>
          <ul>
            <li v-for="(item, index) in error" :key="index">{{ item }}</li>
          </ul>
        </v-alert>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import * as types from '../store/mutation-types'
import { formatErrorMessages } from '../utils/utils.js'

export default {
  data() {
    return {
      showErrorMessage: false
    }
  },
  computed: {
    error() {
      return formatErrorMessages('errors', this.$store.state.error.errorMessage)
    }
  },
  watch: {
    error(value) {
      if (value) {
        this.showErrorMessage = true
      }
    },
    showErrorMessage(value) {
      if (!value) {
        this.$store.commit(types.ERROR, null)
      }
    }
  }
}
</script>
