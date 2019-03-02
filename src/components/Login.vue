<template>
  <v-container fluid>
    <v-layout row wrap>
      <v-flex xs12 class="text-xs-center" mt-5>
        <h1 class="display-2 font-weight-bold mb-3">{{ $t('login.TITLE') }}</h1>
      </v-flex>
      <v-flex xs12 sm6 offset-sm3 mt-3>
        <form @submit.prevent="validateBeforeSubmit">
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
                v-validate="'required|email'"
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
                v-validate="'required|min:5'"
              ></v-text-field>
            </v-flex>
            <v-flex class="text-xs-center" mt-5>
              <v-btn color="primary" type="submit" :disabled="showLoading">{{
                $t('login.LOGIN')
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
      email: '',
      password: ''
    }
  },
  components: {
    ErrorMessage
  },
  methods: {
    validateBeforeSubmit() {
      this.$validator.validateAll().then(result => {
        if (result) {
          this.$store.dispatch('userLogin', {
            email: this.email,
            password: this.password
          })
          return
        }
      })
    }
  },
  computed: {
    showLoading() {
      return this.$store.state.loading.showLoading
    }
  }
}
</script>
