<template>
  <v-container fluid>
    <v-layout row wrap>
      <v-flex xs12 text-xs-center mt-5 mb-3>
        <h1 class="display-2 font-weight-bold">
          {{ $t('forgotPassword.TITLE') }}
        </h1>
      </v-flex>
      <v-flex xs12 text-xs-center mb-2>
        {{ $t('forgotPassword.DESCRIPTION') }}
      </v-flex>
      <v-flex xs12 sm6 offset-sm3>
        <form @submit.prevent="submit">
          <v-layout column>
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
                v-validate.disable="'required|email'"
                autocomplete="off"
              ></v-text-field>
            </v-flex>
            <v-flex text-xs-center mt-5>
              <v-btn color="secondary" @click="goBack()">
                <v-icon class="mr-2">arrow_back</v-icon>
                {{ $t('common.GO_BACK') }}
              </v-btn>
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
      titleTemplate: this.$t('forgotPassword.TITLE') + ' - %s'
    }
  },
  data() {
    return {
      email: ''
    }
  },
  components: {
    ErrorMessage,
    SuccessMessage
  },
  methods: {
    ...mapActions(['forgotPassword']),
    async submit() {
      try {
        const valid = await this.$validator.validateAll()
        if (valid) {
          await this.forgotPassword({
            email: this.email
          })
          return
        }
        // eslint-disable-next-line no-unused-vars
      } catch (error) {
        return
      }
    },
    goBack() {
      router.go(-1)
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
