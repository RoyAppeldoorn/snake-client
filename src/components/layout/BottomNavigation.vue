<!--<template>
  <v-bottom-navigation app class="align-center">
    <v-btn value="account" style="height: 100%">
      <span>Account</span>
      <v-icon>mdi-account</v-icon>
    </v-btn>

    <v-btn value="connect" style="height: 100%" @click="connect">
      <span>Connect</span>
      <v-icon>mdi-power-plug</v-icon>
    </v-btn>

    <v-btn value="disconnect" style="height: 100%" @click="disconnect">
      <span>Disconnect</span>
      <v-icon>mdi-power-plug-off</v-icon>
    </v-btn>
  </v-bottom-navigation>
</template>

<script>
import Stomp from "webstomp-client";

export default {
  data: () => ({}),
  methods: {
    connect() {
      this.$store.dispatch("connectToWebsocket");
    },
    disconnect() {
      this.$store.dispatch("signOut");
    }
  }
};
</script>
!-->
