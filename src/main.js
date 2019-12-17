import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import * as firebase from "firebase";
import AlertComp from "@/components/shared/Alert.vue";

import vuetify from "./plugins/vuetify";

Vue.config.productionTip = false;
Vue.component("app-alert", AlertComp);

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount("#app");

var firebaseConfig = {
  apiKey: process.env.VUE_APP_FIREBASE_API_KEY,
  authDomain: process.env.VUE_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.VUE_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.VUE_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VUE_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VUE_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.VUE_APP_FIREBASE_APP_ID
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
