<template>
  <div>
    <v-btn @click="intervalStart">Send</v-btn>
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
      position: {
        x: 100,
        y: 100
      }
    };
  },
  created() {
    this.socket = new SockJS("http://localhost:8090/snake");
    this.stompClient = Stomp.over(this.socket);
  },
  mounted() {
    this.context = this.$refs.game.getContext("2d");
    this.context.fillRect(this.position.x, this.position.y, 20, 20);

    this.stompClient.connect(
      {},
      () => {
        this.connected = true;
        this.stompClient.subscribe(
          "/topic/location",
          message => {
            console.log(message);
            message.ack();
            // for (var i = 0; i < data.length; i++) {
            //   this.context.fillRect(data[i].x, data[i].y, 20, 20);
            // }
          },
          { ack: "client" }
        );
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
