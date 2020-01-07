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
  insertPlayer(player) {
    apiClient.post("player", JSON.stringify(player), {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    });
  }
};
