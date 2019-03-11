<template>
  <v-container fluid>
    <v-layout row wrap>
      <div class="text-xs-center">
        <v-dialog v-model="showVerifyDialog" width="500" persistent>
          <v-card>
            <v-card-title
              class="headline grey lighten-2 black--text dlgVerifyAccount"
              primary-title
            >
              <v-icon class="orange--text">warning</v-icon>
              &nbsp;{{ $t('home.VERIFY_YOUR_ACCOUNT') }}
            </v-card-title>
            <v-card-text>
              {{ $t('home.VERIFY_YOUR_ACCOUNT_DESCRIPTION') }}
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="primary"
                flat
                @click="showVerifyDialog = false"
                class="btnClose"
              >
                {{ $t('home.CLOSE') }}
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </div>
      <v-flex xs12 text-xs-center mt-5 mb-3>
        <h1 class="display-2 font-weight-bold">{{ $t('home.TITLE') }}</h1>
      </v-flex>
      <v-flex xs12 text-xs-center mb-2>{{ $t('home.DESCRIPTION') }}</v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      showVerifyDialog: !this.$store.state.verify.emailVerified
    }
  }
}
</script>
