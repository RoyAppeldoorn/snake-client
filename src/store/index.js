import Vue from "vue";
import Vuex from "vuex";
import user from "@/store/modules/user.js";
import activity from "@/store/modules/activity.js";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: { user, activity }
});
