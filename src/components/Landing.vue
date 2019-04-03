<template>
  <v-container fluid>
    <v-layout row wrap>
      <Heading :title="$t('landing.TITLE')" />
      <Description :description="$t('landing.DESCRIPTION')" />
    </v-layout>
  </v-container>
</template>

<script>
import Heading from '@/components/common/Heading.vue'
import Description from '@/components/common/Description.vue'

export default {
  components: {
    Heading,
    Description
  }
}
</script>
