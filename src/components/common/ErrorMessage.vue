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
  name: 'ErrorMessage',
  computed: {
    showErrorMessage: {
      get() {
        return this.$store.state.error.showErrorMessage
      },
      set(value) {
        this.$store.commit(types.SHOW_ERROR, value)
      }
    },
    error() {
      return formatErrorMessages('errors', this.$store.state.error.errorMessage)
    }
  },
  watch: {
    error() {
      setTimeout(() => {
        this.showErrorMessage = this.error !== null
      }, 100)
    }
  }
}
</script>
