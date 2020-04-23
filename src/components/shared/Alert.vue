<template>
  <v-alert
    type="error"
    prominent
    :dismissible="true"
    @input="onClose"
    :value="true"
  >
    <slot></slot>
  </v-alert>
</template>

<script>
export default {
  methods: {
    onClose() {
      this.$emit("dismissed");
    }
  }
};
</script>
