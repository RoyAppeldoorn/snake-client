import firebase from "firebase";
import router from "@/router/index.js";
import PlayerService from "@/services/PlayerService.js";

export default {
  state: {
    user: null,
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
    signUp({ commit, dispatch }, payload) {
      commit("SET_LOADING", true);
      firebase
        .auth()
        .createUserWithEmailAndPassword(payload.email, payload.password)
        .then(response => {
          // // base-64 encoded ASCII string
          // btoa(response);
          commit("SET_USER_DATA", response.user.uid);
          commit("SET_LOADING", false);
          commit("SET_ERROR", null);

          var obj = {
            player_id: response.user.uid,
            nickname: payload.nickname
          };
          console.log(obj);

          dispatch("insertUserInDatabase", {
            obj
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
          commit("SET_LOADING", false);
          commit("SET_ERROR", null);
          router.push({ name: "snake" });
        })
        .catch(error => {
          commit("SET_LOADING", false);
          commit("SET_ERROR", error.message);
        });
    },

    signOut({ commit, dispatch }) {
      commit("SET_LOADING", true);
      firebase
        .auth()
        .signOut()
        .then(() => {
          commit("CLEAR_USER_DATA");
          commit("SET_LOADING", false);
          commit("SET_ERROR", null);

          dispatch("disconnectFromWebSocket");

          router.push({ name: "signin" });
        })
        .catch(error => {
          commit("SET_LOADING", false);
          commit("SET_ERROR", error.message);
        });
    },

    insertUserInDatabase({ commit, dispatch }, payload) {
      commit("SET_LOADING", true);
      console.log(payload);
      console.log(payload.player_id);
      PlayerService.insertPlayer(payload.player_id, payload.nickname)
        .then(() => {
          dispatch("insertUserInStatistic", {
            player_id: payload.player_id
          });
        })
        .catch(error => {
          commit("SET_ERROR", error.message);
          commit("SET_LOADING", false);
        });
    },

    insertUserInStatistic({ commit }, payload) {
      console.log(payload.player_id);
      PlayerService.insertStatistic(payload.player_id)
        .then(() => {
          router.push({ name: "snake" });
        })
        .catch(error => {
          commit("SET_ERROR", error.message);
          commit("SET_LOADING", false);
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
  }
};
