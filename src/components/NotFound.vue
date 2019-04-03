<template>
  <v-container fluid>
    <v-layout row wrap>
      <Heading :title="$t('errors.404')" />
    </v-layout>
  </v-container>
</template>

<script>
import Heading from '@/components/common/Heading.vue'

export default {
  components: {
    Heading
  }
}
</script>
