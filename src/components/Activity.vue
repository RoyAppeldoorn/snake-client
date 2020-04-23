<template>
  <v-row align="center">
    <v-col class="text-center" cols="12">
      <v-list>
        <v-subheader>CONNECTED PLAYERS</v-subheader>

        <v-list-item-group color="primary">
          <v-list-item v-for="item in activity.players" :key="item.sessionId">
            <v-list-item-icon>
              <v-icon v-text="icon"></v-icon>
            </v-list-item-icon>
            <v-list-item-content v-bind:style="{ color: item.color }">
              <v-list-item-title
                >{{ item.nickname }}
                <span style="float: right; padding-right: 10px;">{{
                  item.points
                }}</span></v-list-item-title
              >
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
      <div class="my-2">
        <v-btn
          @click="startGame"
          :disabled="
            (activity.players.length < 2 && !roomMaster) || gameRunning
          "
        >
          START GAME
        </v-btn>
      </div>
    </v-col>
  </v-row>
</template>

<script>
import { mapState } from "vuex";
import SockJS from "sockjs-client";
import Stomp from "webstomp-client";

export default {
  data() {
    return {
      icon: "mdi-account",
      gameRunning: false,
      roomMaster: false
    };
  },
  computed: {
    ...mapState(["activity", "user", "sessionId"])
  },
  methods: {
    startGame() {
      this.socket = new SockJS("http://localhost:8090/snake");
      this.stompClient = Stomp.over(this.socket);
      this.stompClient.debug = () => {};
      this.stompClient.connect(
        {},
        () => {
          this.stompClient.send("/app/startGame", {}, {});
          this.gameRunning = true;
        },
        error => {
          alert(
            "Verbinding met de websocket is verloren. Probeer opnieuw te connecten!"
          );
          console.log(error);
        }
      );
    },
    checkRoomMaster() {
      this.activity.players.findIndex(snake => {
        if (snake.sessionId == this.user.sessionId) {
          if (snake.roomMaster) {
            this.roomMaster = true;
          }
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.v-list-item {
  padding: 0px !important;
}
</style>
