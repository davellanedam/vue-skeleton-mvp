<template>
  <v-container fluid>
    <v-layout row wrap>
      <v-flex xs12 text-xs-center mt-5 mb-3>
        <Heading :title="$t('resetPassword.TITLE')" />
      </v-flex>
      <v-flex xs12 sm6 offset-sm3>
        <ValidationObserver v-slot="{ handleSubmit }">
          <form @submit.prevent="handleSubmit(submit)">
            <v-layout column>
              <v-flex v-show="showChangePasswordInputs">
                <ValidationProvider
                  rules="required|min:5"
                  v-slot="{ errors }"
                  vid="password"
                >
                  <v-text-field
                    id="password"
                    name="password"
                    type="password"
                    :label="$t('resetPassword.PASSWORD')"
                    v-model="password"
                    :error="errors.length > 0"
                    :error-messages="errors[0]"
                    ref="password"
                    autocomplete="off"
                  ></v-text-field>
                </ValidationProvider>
              </v-flex>
              <v-flex v-show="showChangePasswordInputs">
                <ValidationProvider
                  rules="required|min:5|confirmed:password"
                  v-slot="{ errors }"
                >
                  <v-text-field
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    :label="$t('resetPassword.CONFIRM_PASSWORD')"
                    v-model="confirmPassword"
                    :error="errors.length > 0"
                    :error-messages="errors[0]"
                    autocomplete="off"
                  ></v-text-field>
                </ValidationProvider>
              </v-flex>
              <v-flex v-show="showChangePasswordInputs" text-xs-center mt-5>
                <SubmitButton
                  :buttonText="$t('resetPassword.CHANGE_PASSWORD')"
                />
              </v-flex>
            </v-layout>
          </form>
        </ValidationObserver>
      </v-flex>
      <ErrorMessage />
      <SuccessMessage />
    </v-layout>
  </v-container>
</template>

<script>
import router from '@/router'
import { mapActions } from 'vuex'

export default {
  metaInfo() {
    return {
      title: this.$store.getters.appTitle,
      titleTemplate: `${this.$t('resetPassword.TITLE')} - %s`
    }
  },
  data() {
    return {
      id: this.$route.params.id,
      password: '',
      confirmPassword: ''
    }
  },
  methods: {
    ...mapActions(['resetPassword']),
    async submit() {
      await this.resetPassword({
        id: this.id,
        password: this.password
      })
    }
  },
  computed: {
    showChangePasswordInputs() {
      return this.$store.state.resetPassword.showChangePasswordInputs
    }
  },
  created() {
    if (this.$store.state.auth.isTokenSet) {
      router.push({ name: 'home' })
    }
  }
}
</script>
