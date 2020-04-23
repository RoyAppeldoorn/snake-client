import Vue from "vue";
import Vuetify from "vuetify/lib";

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    dark: true,

    themes: {
      dark: {
        primary: "#031F4B",
        secondary: "#04396C"
      }
    }
  }
});
