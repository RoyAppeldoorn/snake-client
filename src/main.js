import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import $ from "jquery";
import vuetify from "./plugins/vuetify";
window.jQuery = window.$ = $;
require("bootstrap/dist/css/bootstrap.min.css");
require("bootstrap/dist/js/bootstrap.min.js");

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount("#app");
