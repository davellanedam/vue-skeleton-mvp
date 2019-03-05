<template>
  <v-dialog v-model="showLoading" max-width="300" persistent>
    <v-card color="secondary white--text">
      <v-card-title class="headline justify-center">{{
        $t('loading.PROCESSING')
      }}</v-card-title>
      <v-spacer></v-spacer>
      <div class="text-xs-center">
        <v-progress-circular
          indeterminate
          v-bind:size="70"
          v-bind:width="7"
          color="white"
        >
        </v-progress-circular>
      </div>
      <v-card-text class="text-xs-center">
        {{ $t('loading.PLEASE_WAIT') }}
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: mapGetters(['showLoading'])
}
</script>
