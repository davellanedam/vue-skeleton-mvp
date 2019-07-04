<template>
  <v-container fluid>
    <v-layout row wrap>
      <v-flex xs12 text-xs-center mt-5 mb-3>
        <Heading :title="$t('resetPassword.TITLE')" />
      </v-flex>
      <v-flex xs12 sm6 offset-sm3>
        <form @submit.prevent="submit">
          <v-layout column>
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
                v-validate.disable="'required|min:5'"
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
                v-validate.disable="'required|min:5|confirmed:password'"
                autocomplete="off"
              ></v-text-field>
            </v-flex>
            <v-flex v-show="showChangePasswordInputs" text-xs-center mt-5>
              <SubmitButton :text="$t('resetPassword.CHANGE_PASSWORD')" />
            </v-flex>
          </v-layout>
        </form>
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
      const valid = await this.$validator.validateAll()
      if (valid) {
        await this.resetPassword({
          id: this.id,
          password: this.password
        })
      }
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
