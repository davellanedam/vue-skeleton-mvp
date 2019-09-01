<template>
  <v-container fluid>
    <v-layout wrap>
      <Heading :title="$t('landing.TITLE')" />
      <Description :description="$t('landing.DESCRIPTION')" />
    </v-layout>
    <ProjectDescription />
  </v-container>
</template>
