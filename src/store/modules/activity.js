export default {
  state: {
    messages: []
  },
  mutations: {
    ADD_MESSAGE(state, payload) {
      state.messages.push(payload);
    }
  },
  actions: {
    addToMessages({ commit }, payload) {
      commit("ADD_MESSAGE", payload);
    }
  },
  getters: {
    messages: state => {
      return state.messages;
    }
  }
};
