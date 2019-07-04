<template>
  <v-container fluid>
    <v-layout row wrap>
      <Heading :title="$t('forgotPassword.TITLE')" />
      <Description :description="$t('forgotPassword.DESCRIPTION')" />
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
                <v-icon class="mr-2">mdi-arrow-left</v-icon>
                {{ $t('common.GO_BACK') }}
              </v-btn>
              <SubmitButton :text="$t('forgotPassword.RECOVER')" />
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
      titleTemplate: `${this.$t('forgotPassword.TITLE')} - %s`
    }
  },
  data() {
    return {
      email: ''
    }
  },
  methods: {
    ...mapActions(['forgotPassword']),
    async submit() {
      const valid = await this.$validator.validateAll()
      if (valid) {
        await this.forgotPassword({
          email: this.email
        })
      }
    },
    goBack() {
      router.go(-1)
    }
  },
  created() {
    if (this.$store.state.auth.isTokenSet) {
      router.push({ name: 'home' })
    }
  }
}
</script>
