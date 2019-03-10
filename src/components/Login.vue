<template>
  <v-container fluid>
    <v-layout row wrap>
      <v-flex xs12 text-xs-center mt-5 mb-3>
        <h1 class="display-2 font-weight-bold">{{ $t('login.TITLE') }}</h1>
      </v-flex>
      <v-flex xs12 sm6 offset-sm3>
        <form @submit.prevent="submit">
          <v-layout column>
            <error-message />
            <v-flex>
              <v-text-field
                id="email"
                name="email"
                type="email"
                :label="$t('login.EMAIL')"
                v-model="email"
                :data-vv-as="$t('login.EMAIL')"
                :error="errors.has('email')"
                :error-messages="errors.collect('email')"
                v-validate.disable="'required|email'"
                autocomplete="off"
              ></v-text-field>
            </v-flex>
            <v-flex>
              <v-text-field
                id="password"
                name="password"
                type="password"
                :label="$t('login.PASSWORD')"
                v-model="password"
                :data-vv-as="$t('login.PASSWORD')"
                :error="errors.has('password')"
                :error-messages="errors.collect('password')"
                v-validate.disable="'required|min:5'"
                autocomplete="off"
              ></v-text-field>
            </v-flex>
            <v-flex text-xs-center mt-5>
              <v-btn
                color="secondary"
                type="submit"
                :disabled="disabledButton"
                >{{ $t('login.LOGIN') }}</v-btn
              >
            </v-flex>
            <v-flex text-xs-center>
              <v-btn
                :to="{ name: 'forgotPassword' }"
                color="white"
                small
                flat
                >{{ $t('login.FORGOT_PASSWORD') }}</v-btn
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
import { mapActions } from 'vuex'

export default {
  data() {
    return {
      email: '',
      password: ''
    }
  },
  components: {
    ErrorMessage
  },
  methods: {
    ...mapActions(['userLogin']),
    async submit() {
      try {
        const valid = await this.$validator.validateAll()
        if (valid) {
          await this.userLogin({
            email: this.email,
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
