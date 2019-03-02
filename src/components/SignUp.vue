<template>
  <v-container fluid>
    <v-layout row wrap>
      <v-flex xs12 class="text-xs-center" mt-5>
        <h1 class="display-2 font-weight-bold mb-3">
          {{ $t('signup.TITLE') }}
        </h1>
      </v-flex>
      <v-flex xs12 sm6 offset-sm3 mt-3>
        <form @submit.prevent="validateBeforeSubmit">
          <v-layout column>
            <error-message />
            <v-flex>
              <v-text-field
                id="name"
                name="name"
                type="text"
                :label="$t('signup.NAME')"
                v-model="name"
                :data-vv-as="$t('signup.NAME')"
                :error="errors.has('name')"
                :error-messages="errors.collect('name')"
                v-validate="'required'"
              ></v-text-field>
            </v-flex>
            <v-flex>
              <v-text-field
                id="email"
                name="email"
                type="email"
                :label="$t('signup.EMAIL')"
                v-model="email"
                :data-vv-as="$t('signup.EMAIL')"
                :error="errors.has('email')"
                :error-messages="errors.collect('email')"
                v-validate="'required|email'"
              ></v-text-field>
            </v-flex>
            <v-flex>
              <v-text-field
                id="password"
                name="password"
                type="password"
                :label="$t('signup.PASSWORD')"
                v-model="password"
                :data-vv-as="$t('signup.PASSWORD')"
                :error="errors.has('password')"
                :error-messages="errors.collect('password')"
                v-validate="'required|min:5'"
                ref="password"
              ></v-text-field>
            </v-flex>
            <v-flex>
              <v-text-field
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                :label="$t('signup.CONFIRM_PASSWORD')"
                v-model="confirmPassword"
                :data-vv-as="$t('signup.PASSWORD')"
                :error="errors.has('confirmPassword')"
                :error-messages="errors.collect('confirmPassword')"
                v-validate="'required|min:5|confirmed:password'"
              ></v-text-field>
            </v-flex>
            <v-flex class="text-xs-center" mt-5>
              <v-btn color="primary" type="submit" :disabled="disabledButton">{{
                $t('signup.SIGN_ME_UP')
              }}</v-btn>
            </v-flex>
          </v-layout>
        </form>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import ErrorMessage from '@/components/ErrorMessage.vue'

export default {
  data() {
    return {
      name: '',
      email: '',
      password: '',
      confirmPassword: ''
    }
  },
  components: {
    ErrorMessage
  },
  methods: {
    validateBeforeSubmit() {
      this.$validator.validateAll().then(result => {
        if (result) {
          this.$store.dispatch('userSignUp', {
            name: this.name,
            email: this.email,
            password: this.password
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
  }
}
</script>
