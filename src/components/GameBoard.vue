<template>
  <div>
    <!-- <v-btn @click="move">Send</v-btn> -->
    <v-btn @click="disconnect">Stop</v-btn>
    <div id="log" style="font-size: 50px">{{ position }}</div>
    <canvas
      ref="game"
      width="640"
      height="480"
      id="game"
      style="border:1px solid #000000;"
    ></canvas>
    <!-- <p>
      <v-btn v-on:click="move('right')">Right</v-btn>
      <v-btn v-on:click="move('left')">left</v-btn>
      <v-btn v-on:click="move('up')">up</v-btn>
      <v-btn v-on:click="move('down')">down</v-btn>
    </p> -->
  </div>
</template>

<script>
import SockJS from "sockjs-client";
import Stomp from "webstomp-client";

export default {
  name: "snakegame",
  data() {
    return {
      connected: {},
      snakes: {}
    };
  },
  created() {
    this.socket = new SockJS("http://localhost:8090/snake");
    this.stompClient = Stomp.over(this.socket);
    this.stompClient.debug = function() {};
  },
  mounted() {
    this.context = this.$refs.game.getContext("2d");
    this.stompClient.connect(
      {},
      () => {
        this.connected = true;
        this.stompClient.subscribe("/topic/location", this.onMessageReceived);
      },
      error => {
        console.log(error);
        this.connected = false;
      }
    );
  },
  methods: {
    move() {
      if (this.stompClient && this.stompClient.connected) {
        this.stompClient.send("/app/update", JSON.stringify(this.position), {});
      }
    },
    draw() {
      this.context.clearRect(
        0,
        0,
        this.$refs.game.width,
        this.$refs.game.length
      );
    },
    onMessageReceived(payload) {
      var message = JSON.parse(payload.body);
      if (message.type == "update") {
        for (var i = 0; i < message.data.length; i++) {
          // console.log(message.data[i].body[0].x);
          // console.log(message.data[i].body[0].y);
          this.context.fillRect(
            message.data[i].body[0].x,
            message.data[i].body[0].y,
            20,
            20
          );
        }
      }
    },
    disconnect() {
      if (this.stompClient) {
        this.stompClient.disconnect();
      }
      this.connected = false;
    }
  }
};
</script>

<style scoped></style>
