<template>
  <v-flex xs12 text-xs-center mb-2>{{ description }}</v-flex>
</template>

<script>
export default {
  name: 'Description',
  props: {
    description: String
  }
}
</script>
