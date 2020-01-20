import StatisticService from "@/services/StatisticService.js";

export default {
  state: {
    updateStatisticLoading: null,
    statistic: null
  },
  mutations: {
    SET_STATISTIC_LOADING(state, payload) {
      state.updateStatisticLoading = payload;
    },
    SET_STATISTIC(state, payload) {
      state.statistic = payload;
    }
  },
  actions: {
    updatePlayerKills({ commit }, payload) {
      commit("SET_STATISTIC_LOADING", true);
      StatisticService.updatePlayerKills(payload)
        .then(() => {
          commit("SET_LOADING", false);
          console.log("DONE");
        })
        .catch(error => {
          commit("SET_LOADING", false);
          console.log(error);
        });
    },
    updatePlayerDeads({ commit }, payload) {
      commit("SET_STATISTIC_LOADING", true);
      StatisticService.updatePlayerDeads(payload)
        .then(() => {
          commit("SET_LOADING", false);
          console.log("DONE2");
        })
        .catch(error => {
          commit("SET_LOADING", false);
          console.log(error);
        });
    },
    getStatistic({ commit }, payload) {
      commit("SET_STATISTIC_LOADING", true);
      StatisticService.getStatistic(payload)
        .then(statistic => {
          commit("SET_LOADING", false);
          commit("SET_STATISTIC", statistic);
        })
        .catch(error => {
          commit("SET_LOADING", false);
          console.log(error);
        });
    }
  },
  getters: {}
};
