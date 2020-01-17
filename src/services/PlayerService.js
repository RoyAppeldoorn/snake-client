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
  insertPlayer(id, name) {
    console.log(id);
    return apiClient.post(
      "player/create",
      { player_id: id, nickname: name },
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      }
    );
  },

  insertStatistic(id) {
    console.log(id);
    return apiClient.post(
      "statistics/create",
      { player_id: id },
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      }
    );
  }
};
