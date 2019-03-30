<template>
  <v-container v-show="showErrorMessage">
    <v-layout>
      <v-flex>
        <v-snackbar
          v-model="showErrorMessage"
          color="error"
          multi-line
          bottom
          :timeout="0"
        >
          <ul>
            <li v-for="(item, index) in error" :key="index">{{ item }}</li>
          </ul>
          <v-btn dark flat @click="showErrorMessage = false">{{
            $t('common.CLOSE')
          }}</v-btn>
        </v-snackbar>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import * as types from '@/store/mutation-types'
import { formatErrorMessages } from '@/utils/utils.js'

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
    error() {
      this.showErrorMessage = false
      setTimeout(() => {
        this.showErrorMessage = true
      }, 100)
    }
  }
}
</script>
