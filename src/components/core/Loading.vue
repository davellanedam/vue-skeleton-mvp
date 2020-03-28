<template>
  <v-dialog v-model="showLoading" persistent width="300">
    <v-card class="pt-4">
      <v-card-text>
        {{ $t('loading.PLEASE_WAIT') }}
        <v-progress-linear indeterminate class="mb-0"></v-progress-linear>
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
