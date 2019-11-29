<template>
  <v-app>
    <v-app-bar app color="primary" dark></v-app-bar>

    <v-content>
      <router-view />
    </v-content>
  </v-app>
</template>

<script>
// import WebsocketGreetings from "@/components/WebsocketGreetings";
export default {
  name: "App",

  data: () => ({
    //
  })
};
</script>
