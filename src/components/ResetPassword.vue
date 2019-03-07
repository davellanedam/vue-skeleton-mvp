<template>
  <v-container fluid>
    <v-layout row wrap>
      <v-flex xs12 class="text-xs-center" mt-5>
        <h1 class="display-2 font-weight-bold mb-3">
          {{ $t('resetPassword.TITLE') }}
        </h1>
      </v-flex>
      <v-flex xs12 sm6 offset-sm3>
        <form @submit.prevent="validateBeforeSubmit">
          <v-layout column>
            <error-message />
            <success-message />
            <v-flex v-show="showChangePasswordInputs">
              <v-text-field
                id="password"
                name="password"
                type="password"
                :label="$t('resetPassword.PASSWORD')"
                v-model="password"
                :data-vv-as="$t('resetPassword.PASSWORD')"
                :error="errors.has('password')"
                :error-messages="errors.collect('password')"
                v-validate="'required|min:5'"
                ref="password"
                autocomplete="off"
              ></v-text-field>
            </v-flex>
            <v-flex v-show="showChangePasswordInputs">
              <v-text-field
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                :label="$t('resetPassword.CONFIRM_PASSWORD')"
                v-model="confirmPassword"
                :data-vv-as="$t('resetPassword.PASSWORD')"
                :error="errors.has('confirmPassword')"
                :error-messages="errors.collect('confirmPassword')"
                v-validate="'required|min:5|confirmed:password'"
                autocomplete="off"
              ></v-text-field>
            </v-flex>
            <v-flex
              v-show="showChangePasswordInputs"
              class="text-xs-center"
              mt-5
            >
              <v-btn
                color="secondary"
                type="submit"
                :disabled="disabledButton"
                >{{ $t('resetPassword.CHANGE_PASSWORD') }}</v-btn
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
      id: this.$route.params.id,
      password: '',
      confirmPassword: ''
    }
  },
  components: {
    ErrorMessage,
    SuccessMessage
  },
  methods: {
    ...mapActions(['resetPassword']),
    validateBeforeSubmit() {
      this.$validator.validateAll().then(result => {
        if (result) {
          this.resetPassword({
            id: this.id,
            password: this.password
          })
          return
        }
      })
    }
  },
  computed: {
    showChangePasswordInputs() {
      return this.$store.state.resetPassword.showChangePasswordInputs
    },
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
