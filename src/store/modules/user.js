import firebase from "firebase";
import router from "@/router/index.js";
import PlayerService from "@/services/PlayerService.js";

export default {
  state: {
    user: null,
    nickname: null,
    loading: null,
    error: null
  },
  mutations: {
    SET_USER_DATA(state, payload) {
      state.user = {
        uid: payload
      };
      localStorage.setItem("user", JSON.stringify(payload));
    },

    SET_NICKNAME(state, payload) {
      state.nickname = payload;
      localStorage.setItem("nickname", JSON.stringify(payload));
    },

    CLEAR_USER_DATA() {
      localStorage.removeItem("user");
      location.reload();
    },

    CLEAR_NICKNAME() {
      localStorage.removeItem("nickname");
    },

    SET_LOADING(state, payload) {
      state.loading = payload;
    },

    SET_ERROR(state, payload) {
      state.error = payload;
    }
  },
  actions: {
    signUp({ commit, dispatch }, payload) {
      commit("SET_LOADING", true);
      firebase
        .auth()
        .createUserWithEmailAndPassword(payload.email, payload.password)
        .then(response => {
          // // base-64 encoded ASCII string
          // btoa(response);
          commit("SET_USER_DATA", response.user.uid);
          commit("SET_ERROR", null);

          dispatch("insertInDatabase", {
            player_id: response.user.uid,
            nickname: payload.nickname
          });
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
          commit("SET_USER_DATA", response.user.uid);
          commit("SET_ERROR", null);
          commit("SET_LOADING", false);
          router.push({ name: "snake" });
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
          commit("CLEAR_NICKNAME");
          commit("SET_LOADING", false);
          commit("SET_ERROR", null);
          router.push({ name: "signin" });
        })
        .catch(error => {
          commit("SET_LOADING", false);
          commit("SET_ERROR", error.message);
        });
    },

    insertInDatabase({ commit, dispatch }, payload) {
      PlayerService.insertPlayer(payload.player_id, payload.nickname)
        .then(() => {
          dispatch("insertUserInStatistics", {
            player_id: payload.player_id
          });
        })
        .catch(error => {
          console.log(error);
          commit("SET_ERROR", "Something went wrong! Please try again later.");
          commit("SET_LOADING", false);
        });
    },

    insertUserInStatistics({ commit }, payload) {
      PlayerService.insertStatistic(payload.player_id)
        .then(() => {
          router.push({ name: "snake" });
        })
        .catch(error => {
          console.log(error);
          commit("SET_ERROR", "Something went wrong! Please try again later.");
          commit("SET_LOADING", false);
        });
    },

    getPlayerFromDatabase({ commit }, payload) {
      commit("SET_LOADING", true);
      PlayerService.getPlayer(payload.id)
        .then(user => {
          commit("SET_NICKNAME", user.data.nickname);
          commit("SET_LOADING", false);
          router.push({ name: "snake" });
        })
        .catch(error => {
          commit("SET_ERROR", "Something went wrong! Please try again later.");
          commit("SET_LOADING", false);
          console.log(error);
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
    },

    nickname: state => {
      return state.nickname != null
        ? state.nickname
        : JSON.parse(localStorage.getItem("nickname"));
    }
  }
};
