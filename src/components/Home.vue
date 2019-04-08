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
                >{{ $t('home.CLOSE') }}</v-btn
              >
            </v-card-actions>
          </v-card>
        </v-dialog>
      </div>
      <Heading :title="$t('home.TITLE')" />
      <Description :description="$t('home.DESCRIPTION')" />
    </v-layout>
    <ProjectDescription />
  </v-container>
</template>

<script>
export default {
  metaInfo() {
    return {
      title: this.$store.getters.appTitle,
      titleTemplate: this.$t('home.TITLE') + ' - %s'
    }
  },
  data() {
    return {
      showVerifyDialog: !this.$store.state.verify.emailVerified
    }
  }
}
</script>
