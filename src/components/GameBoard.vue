<template>
  <div>
    <v-btn @click="connect">Connect</v-btn>
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
      snakes: [],
      direction: null
    };
  },
  mounted() {
    this.context = this.$refs.game.getContext("2d");
    this.context.fillStyle = "white";
    this.context.fillRect(0, 0, 640, 480);
  },
  methods: {
    connect() {
      this.socket = new SockJS("http://localhost:8090/snake");
      this.stompClient = Stomp.over(this.socket);
      // this.stompClient.debug = function() {};
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
    addSnake(id, color) {
      this.snakes.push({
        id: id,
        color: color
      });
    },
    updateSnake(id, snakeBody) {
      this.snakes.findIndex(snake => {
        if (snake.id == id) {
          snake.snakeBody = snakeBody;
          this.draw();
        }
      });
    },
    removeSnake(id) {
      let index = this.snakes.findIndex(x => x.id == id);
      this.$delete(this.snakes, index);
    },
    onMessageReceived(payload) {
      var message = JSON.parse(payload.body);
      console.log(message.type);
      switch (message.type) {
        case "join": {
          for (var j = 0; j < message.data.length; j++) {
            this.addSnake(message.data[j].id, message.data[j].color);
          }
          break;
        }
        case "update":
          for (var i = 0; i < message.data.length; i++) {
            this.updateSnake(message.data[i].id, message.data[i].body);
          }
          break;
        case "leave": {
          this.removeSnake(message.id);
          break;
        }
      }
    },
    draw() {
      this.context.clearRect(0, 0, 640, 480);
      for (var j = 0; j < this.snakes.length; j++) {
        console.log(this.snakes[j]);
        this.context.fillStyle = this.snakes[j].color;
        this.context.fillRect(
          this.snakes[j].snakeBody[0].x,
          this.snakes[j].snakeBody[0].y,
          20,
          20
        );
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

// if (this.stompClient && this.stompClient.connected) {
//   this.stompClient.send("/app/update", JSON.stringify(this.position), {});
// }
</script>

<style scoped></style>
