import Vue from "vue";
import Vuex from "vuex";
import user from "@/store/modules/user.js";
import websocket from "@/store/modules/websocket.js";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: { user, websocket }
});
