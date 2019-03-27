<template>
  <v-btn
    :color="colorString"
    type="submit"
    :disabled="disabledButton"
    :class="customClass"
    :flat="flat"
    >{{ text }}</v-btn
  >
</template>

<script>
export default {
  name: 'SubmitButton',
  props: {
    color: String,
    text: String,
    customClass: String,
    flat: Boolean
  },
  computed: {
    disabledButton() {
      return this.$store.state.loading.showLoading
    },
    colorString() {
      return this.color ? this.color : 'secondary'
    }
  }
}
</script>
