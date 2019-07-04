<template>
  <v-container fluid>
    <v-layout row wrap>
      <Heading :title="$t('about.TITLE')" />
      <Description :description="$t('about.DESCRIPTION')" />
    </v-layout>
    <ProjectDescription />
  </v-container>
</template>

<script>
export default {
  metaInfo() {
    return {
      title: this.$store.getters.appTitle,
      titleTemplate: `${this.$t('about.TITLE')} - %s`
    }
  }
}
</script>
