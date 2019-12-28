<template>
  <v-bottom-navigation v-model="bottomNav" app>
    <v-btn value="recent">
      <span>Account</span>
      <v-icon>mdi-account</v-icon>
    </v-btn>

    <v-btn value="favorites">
      <span>Spectate</span>
      <v-icon>mdi-eye-outline</v-icon>
    </v-btn>

    <v-btn value="nearby" @click="logout">
      <span>Disconnect</span>
      <v-icon>mdi-power-plug-off</v-icon>
    </v-btn>
  </v-bottom-navigation>
</template>

<script>
export default {
  data: () => ({}),
  methods: {
    logout() {
      this.$store.dispatch("signOut");
    }
  }
};
</script>
