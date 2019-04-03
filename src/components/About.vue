<template>
  <v-container fluid>
    <v-layout row wrap>
      <Heading :title="$t('about.TITLE')" />
      <Description :description="$t('about.DESCRIPTION')" />
    </v-layout>
  </v-container>
</template>

<script>
import Heading from '@/components/common/Heading.vue'
import Description from '@/components/common/Description.vue'

export default {
  metaInfo() {
    return {
      title: this.$store.getters.appTitle,
      titleTemplate: this.$t('about.TITLE') + ' - %s'
    }
  },
  components: {
    Heading,
    Description
  }
}
</script>
