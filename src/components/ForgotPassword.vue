<template>
  <v-container fluid>
    <v-layout row wrap>
      <v-flex xs12 class="text-xs-center" mt-5>
        <h1 class="display-2 font-weight-bold mb-3">
          {{ $t('forgotPassword.TITLE') }}
        </h1>
      </v-flex>
      <v-flex xs12 class="text-xs-center">
        {{ $t('forgotPassword.DESCRIPTION') }}
      </v-flex>
      <v-flex xs12 sm6 offset-sm3>
        <form @submit.prevent="validateBeforeSubmit">
          <v-layout column>
            <error-message />
            <success-message />
            <v-flex>
              <v-text-field
                id="email"
                name="email"
                type="email"
                :label="$t('forgotPassword.EMAIL')"
                v-model="email"
                :data-vv-as="$t('forgotPassword.EMAIL')"
                :error="errors.has('email')"
                :error-messages="errors.collect('email')"
                v-validate="'required|email'"
                autocomplete="off"
              ></v-text-field>
            </v-flex>
            <v-flex class="text-xs-center" mt-5>
              <v-btn
                color="secondary"
                type="submit"
                :disabled="disabledButton"
                >{{ $t('forgotPassword.RECOVER') }}</v-btn
              >
            </v-flex>
          </v-layout>
        </form>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import router from '@/router'
import ErrorMessage from '@/components/ErrorMessage.vue'
import SuccessMessage from '@/components/SuccessMessage.vue'
import { mapActions } from 'vuex'

export default {
  data() {
    return {
      email: 'admin@admin.com'
    }
  },
  components: {
    ErrorMessage,
    SuccessMessage
  },
  methods: {
    ...mapActions(['forgotPassword']),
    validateBeforeSubmit() {
      this.$validator.validateAll().then(result => {
        if (result) {
          this.forgotPassword({
            email: this.email
          })
          return
        }
      })
    }
  },
  computed: {
    disabledButton() {
      return this.$store.state.loading.showLoading
    }
  },
  created() {
    if (this.$store.state.auth.isTokenSet) {
      router.push({ name: 'home' })
    }
  }
}
</script>
