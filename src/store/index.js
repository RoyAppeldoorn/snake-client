import Vue from "vue";
import Vuex from "vuex";
import user from "@/store/modules/user.js";
import activity from "@/store/modules/activity.js";
import statistic from "@/store/modules/statistic.js";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: { user, activity, statistic }
});
