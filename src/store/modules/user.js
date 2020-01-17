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

          var newUser = {
            player_id: response.user.uid,
            nickname: payload.nickname
          };

          dispatch("insertInDatabase", {
            newUser
          });
        })
        .catch(error => {
          commit("SET_ERROR", error.message);
          commit("SET_LOADING", false);
        });
    },

    signIn({ commit, dispatch }, payload) {
      commit("SET_LOADING", true);
      firebase
        .auth()
        .signInWithEmailAndPassword(payload.email, payload.password)
        .then(response => {
          commit("SET_USER_DATA", response.user.uid);
          commit("SET_ERROR", null);

          dispatch("getPlayerFromDatabase", {
            id: response.user.uid
          });
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
      PlayerService.insertPlayer(
        payload.newUser.player_id,
        payload.newUser.nickname
      )
        .then(() => {
          dispatch("getPlayerFromDatabase", {
            id: payload.newUser.player_id
          });
        })
        .catch(error => {
          console.log(error);
          commit("SET_ERROR", "Something went wrong! Please try again later.");
          commit("SET_LOADING", false);
        });
    },

    getPlayerFromDatabase({ commit }, payload) {
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
