<template>
  <v-app>
    <v-content>
      <router-view />
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: "App",

  data: () => ({
    title: process.env.VUE_APP_TITLE,
    bottomNav: "recent"
  })
};
</script>
