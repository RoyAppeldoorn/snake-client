import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:8082",
  withCredentials: false,
  headers: {
    Accept: "application/json",
    "Content-type": "application/json"
  }
});

export default {
  updatePlayerKills(id) {
    return apiClient.post(
      "statistics/" + id + "/kill",
      // eslint-disable-next-line prettier/prettier
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      }
    );
  },

  updatePlayerDeads(id) {
    return apiClient.post(
      "statistics/" + id + "/dead",
      // eslint-disable-next-line prettier/prettier
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      }
    );
  },

  getStatistic(id) {
    return apiClient.get("statistics/" + id, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    });
  }
};
