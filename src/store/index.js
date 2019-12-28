import Vue from "vue";
import Vuex from "vuex";
import firebase from "firebase";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: null,
    loading: null,
    error: null
  },
  mutations: {
    SET_USER_DATA(state, payload) {
      state.user = payload;
      localStorage.setItem("user", JSON.stringify(payload));
    },

    CLEAR_USER_DATA() {
      localStorage.removeItem("user");
      location.reload();
    },

    SET_LOADING(state, payload) {
      state.loading = payload;
    },

    SET_ERROR(state, payload) {
      state.error = payload;
    }
  },
  actions: {
    signUp({ commit }, payload) {
      commit("SET_LOADING", true);
      firebase
        .auth()
        .createUserWithEmailAndPassword(payload.email, payload.password)
        .then(response => {
          console.log(response);
          commit("SET_USER_DATA", response.user);
          commit("SET_LOADING", false);
          commit("SET_ERROR", null);
        })
        .catch(error => {
          commit("SET_ERROR", error.message);
          commit("SET_LOADING", false);
        });
    },

    signIn({ commit }, payload) {
      commit("SET_LOADING", true);
      firebase
        .auth()
        .signInWithEmailAndPassword(payload.email, payload.password)
        .then(response => {
          commit("SET_USER_DATA", response.user);
          commit("SET_LOADING", false);
          commit("SET_ERROR", null);
        })
        .catch(error => {
          commit("SET_LOADING", false);
          commit("SET_ERROR", error.message);
        });
    },

    signOut({ commit }) {
      commit("SET_LOADING", true);
      firebase
        .auth()
        .signOut()
        .then(() => {
          commit("CLEAR_USER_DATA");
          commit("SET_LOADING", false);
          commit("SET_ERROR", null);
        })
        .catch(error => {
          commit("SET_LOADING", false);
          commit("SET_ERROR", error.message);
        });
    },

    clearError({ commit }) {
      commit("SET_ERROR", null);
    }
  },
  getters: {
    loading: state => {
      return state.loading;
    },

    user: state => {
      return state.user;
    },

    error: state => {
      return state.error;
    },

    loggedIn: state => {
      return !!state.user;
    }
  },
  modules: {}
});
