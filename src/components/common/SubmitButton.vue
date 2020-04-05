<template>
  <v-btn
    :color="colorString"
    type="submit"
    :disabled="disabledButton"
    :class="customClass"
    :text="text"
    >{{ buttonText }}</v-btn
  >
</template>

<script>
export default {
  name: 'SubmitButton',
  props: {
    color: String,
    buttonText: String,
    customClass: String,
    text: Boolean
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
