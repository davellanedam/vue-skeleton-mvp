<template>
  <v-container fluid>
    <v-layout row wrap>
      <v-flex xs12 text-xs-center mt-5 mb-3>
        <h1 class="display-2 font-weight-bold">
          {{ $t('resetPassword.TITLE') }}
        </h1>
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
      <error-message />
      <success-message />
    </v-layout>
  </v-container>
</template>

<script>
import router from '@/router'
import ErrorMessage from '@/components/ErrorMessage.vue'
import SuccessMessage from '@/components/SuccessMessage.vue'
import { mapActions } from 'vuex'

export default {
  metaInfo() {
    return {
      title: this.$store.getters.appTitle,
      titleTemplate: this.$t('resetPassword.TITLE') + ' - %s'
    }
  },
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
    async submit() {
      try {
        const valid = await this.$validator.validateAll()
        if (valid) {
          await this.resetPassword({
            id: this.id,
            password: this.password
          })
          return
        }
      } catch (error) {
        return
      }
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
