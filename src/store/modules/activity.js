import Vue from "vue";

export default {
  state: {
    players: [],
    sessionId: null
  },
  mutations: {
    ADD_PLAYER(state, payload) {
      if (!state.players.some(player => player.nickname == payload.nickname)) {
        state.players.push(payload);
      } else {
        state.players.push(payload);
      }
    },
    REMOVE_PLAYER(state, payload) {
      let index = state.players.findIndex(x => x.sessionId == payload);
      Vue.delete(state.players, index);
    },
    ADD_POINT(state, payload) {
      let index = state.players.findIndex(
        x => x.sessionId == payload.sessionId
      );
      Vue.set(state.players[index], "points", payload.points);
    },
    CLEAR_PLAYERS(state) {
      state.players = [];
    },
    SET_SESSION_ID(state, payload) {
      state.sessionId = payload;
    }
  },
  actions: {
    addToPlayers({ commit }, payload) {
      commit("ADD_PLAYER", payload);
      commit("SET_SESSION_ID", payload.sessionId);
    },
    removeFromPlayers({ commit }, payload) {
      commit("REMOVE_PLAYER", payload);
    },
    updatePoints({ commit }, payload) {
      commit("ADD_POINT", payload);
    },
    clearPlayers({ commit }) {
      commit("CLEAR_PLAYERS");
    }
  },
  getters: {
    players: state => {
      return state.players;
    },
    sessionId: state => {
      return state.sessionId;
    }
  }
};
