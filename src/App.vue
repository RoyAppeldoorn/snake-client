<template>
  <v-app id="inspire">
    <!-- <v-navigation-drawer v-model="drawer" app clipped>
      <v-list dense>
        <v-list-item link>
          <v-list-item-action>
            <v-icon>mdi-view-dashboard</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Dashboard</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link>
          <v-list-item-action>
            <v-icon>mdi-settings</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Settings</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer> -->

    <v-app-bar app clipped-left>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title>{{ title }}</v-toolbar-title>
    </v-app-bar>

    <v-content>
      <router-view />
    </v-content>

    <v-footer app>
      <span>&copy; 2019</span>
    </v-footer>
  </v-app>
</template>

<script>
// import WebsocketGreetings from "@/components/WebsocketGreetings";
export default {
  name: "App",

  data: () => ({
    items: [
      { title: "Dashboard", icon: "mdi-view-dashboard" },
      { title: "Photos", icon: "mdi-image" },
      { title: "About", icon: "mdi-help-box" }
    ],
    right: null,
    drawer: null,
    title: process.env.VUE_APP_TITLE
  })
};
</script>
