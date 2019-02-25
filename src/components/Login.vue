<template>
  <v-container fluid>
    <v-layout row wrap>
      <v-flex xs12 class="text-xs-center" mt-5>
        <h1 class="display-2 font-weight-bold mb-3">{{ $t('login.TITLE') }}</h1>
      </v-flex>
      <v-flex xs12 sm6 offset-sm3 mt-3>
        <form @submit.prevent="userLogin">
          <v-layout column>
            <v-flex>
              <v-alert type="error" dismissible v-model="alert">{{
                error
              }}</v-alert>
            </v-flex>
            <v-flex>
              <v-text-field
                name="email"
                :label="$t('login.EMAIL')"
                id="email"
                type="email"
                v-model="email"
                required
              ></v-text-field>
            </v-flex>
            <v-flex>
              <v-text-field
                name="password"
                :label="$t('login.PASSWORD')"
                id="password"
                type="password"
                v-model="password"
                required
              ></v-text-field>
            </v-flex>
            <v-flex class="text-xs-center" mt-5>
              <v-btn color="primary" type="submit" :disabled="showLoading">
                {{ $t('login.LOGIN') }}
              </v-btn>
            </v-flex>
          </v-layout>
        </form>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import * as types from '../store/mutation-types'

export default {
  data() {
    return {
      email: 'admin@admin.com',
      password: '12345',
      alert: false
    }
  },
  methods: {
    userLogin() {
      this.$store.dispatch('userLogin', {
        email: this.email,
        password: this.password
      })
    }
  },
  computed: {
    error() {
      return this.$store.state.error.errorMessage
    },
    showLoading() {
      return this.$store.state.loading.showLoading
    }
  },
  watch: {
    error(value) {
      if (value) {
        this.alert = true
      }
    },
    alert(value) {
      if (!value) {
        this.$store.commit(types.ERROR, null)
      }
    }
  }
}
</script>
