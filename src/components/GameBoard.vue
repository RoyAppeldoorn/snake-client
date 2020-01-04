<template>
  <div>
    <canvas
      ref="game"
      width="640"
      height="480"
      id="game"
      style="border:1px solid #000000;"
    ></canvas>

    <v-bottom-navigation app class="align-center">
      <v-btn value="account" style="height: 100%">
        <span>Account</span>
        <v-icon>mdi-account</v-icon>
      </v-btn>

      <v-btn
        value="connect"
        style="height: 100%"
        @click="connect"
        :disabled="connected"
      >
        <span>Connect</span>
        <v-icon>mdi-power-plug</v-icon>
      </v-btn>

      <v-btn value="disconnect" style="height: 100%" @click="disconnect">
        <span>Disconnect</span>
        <v-icon>mdi-power-plug-off</v-icon>
      </v-btn>
    </v-bottom-navigation>
  </div>
</template>

<script>
import SockJS from "sockjs-client";
import Stomp from "webstomp-client";

export default {
  name: "snakegame",
  data() {
    return {
      connected: false,
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
          this.draw();
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
        this.context.fillStyle = this.snakes[j].color;
        this.context.fillRect(
          this.snakes[j].snakeBody[0].x,
          this.snakes[j].snakeBody[0].y,
          20,
          20
        );
      }
    },
    connect() {
      this.socket = new SockJS("http://localhost:8090/snake");
      this.stompClient = Stomp.over(this.socket);

      this.stompClient.connect({}, this.onConnected, error => {
        this.connected = false;
        this.context.clearRect(0, 0, 640, 480);
        alert(
          "Verbinding met de websocket is verloren. Probeer opnieuw te connecten!"
        );
        console.log(error);
      });
    },
    onConnected() {
      this.connected = true;
      this.stompClient.subscribe("/topic/public", this.onMessageReceived);

      this.stompClient.send("/app/addUser", JSON.stringify("kenker"), {});
    },
    disconnect() {
      if (this.stompClient) {
        this.connected = false;
        this.stompClient.disconnect();
      }
      this.$store.dispatch("signOut");
    }
  }
};

// if (this.stompClient && this.stompClient.connected) {
//   this.stompClient.send("/app/update", JSON.stringify(this.position), {});
// }
</script>

<style scoped></style>
