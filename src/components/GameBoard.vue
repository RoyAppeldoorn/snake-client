<template>
  <div id="wrap">
    <canvas
      ref="game"
      width="1100"
      height="900"
      id="outer"
      style="border:3px solid #ffffff;"
    ></canvas>

    <v-bottom-navigation class="align-center bottom-nav-bg">
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
import { mapGetters } from "vuex";
import $ from "jquery";

export default {
  name: "snakegame",
  data() {
    return {
      connected: false,
      snakes: [],
      direction: null,
      received_messages: []
    };
  },
  created() {
    var self = this;
    window.addEventListener(
      "keydown",
      function(e) {
        var code = e.keyCode;
        if (code > 36 && code < 41) {
          switch (code) {
            case 37:
              if (self.direction != "EAST") self.setDirection("WEST");
              break;
            case 38:
              if (self.direction != "SOUTH") self.setDirection("NORTH");
              break;
            case 39:
              if (self.direction != "WEST") self.setDirection("EAST");
              break;
            case 40:
              if (self.direction != "NORTH") self.setDirection("SOUTH");
              break;
          }
        }
      },
      false
    );
  },
  mounted() {
    this.context = this.$refs.game.getContext("2d");
    this.clearCanvas(this.context);

    var maxWidth = $("#outer").width();
    var maxHeight = $("#outer").height();

    $(window).resize(function() {
      var $window = $(window);
      var width = $window.width();
      var height = $window.height();
      var scale;

      // early exit
      if (width >= maxWidth && height >= maxHeight) {
        $("#outer").css({ "-webkit-transform": "" });
        $("#wrap").css({ width: "", height: "" });
        return;
      }

      scale = Math.min(width / maxWidth, height / maxHeight);

      $("#outer").css({ "-webkit-transform": "scale(" + scale + ")" });
      $("#wrap").css({ width: maxWidth * scale, height: maxHeight * scale });
    });

    this.$store.dispatch("addToMessages", this.nickname);
  },
  computed: {
    canvasGradient() {
      var grd = this.context.createLinearGradient(0, 0, 500, 500);
      grd.addColorStop(0, "#151e39");
      grd.addColorStop(0.12, "#092a42");
      grd.addColorStop(0.5, "#092a42");
      grd.addColorStop(0.82, "#092a42");
      grd.addColorStop(1, "#032f44");
      return grd;
    },
    ...mapGetters({
      nickname: "nickname"
    })
  },
  methods: {
    addSnake(id, color) {
      this.snakes.push({
        id: id,
        color: color
      });
      this.received_messages.push({
        message: "Hallo!"
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
    setDirection(direction) {
      this.direction = direction;
      this.stompClient.send("/app/setDirection", direction, {});
    },
    onMessageReceived(payload) {
      var message = JSON.parse(payload.body);
      console.log(message);
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
        case "dead":
          console.log("Info: Your snake is dead, bad luck!");
          break;
        case "kill":
          console.log("Info: Head shot!");
          break;
      }
    },
    draw() {
      this.clearCanvas(this.context);
      for (var j = 0; j < this.snakes.length; j++) {
        this.context.fillStyle = this.snakes[j].color;
        for (var i = 0; i < this.snakes[j].snakeBody.length; i++) {
          this.context.fillRect(
            this.snakes[j].snakeBody[i].x,
            this.snakes[j].snakeBody[i].y,
            20,
            20
          );
          this.context.clearRect(
            this.snakes[j].snakeBody[i].x + 2,
            this.snakes[j].snakeBody[i].y + 2,
            16,
            16
          );
        }
      }
    },
    clearCanvas(context) {
      this.context.clearRect(0, 0, 1100, 900);
      context.fillStyle = this.canvasGradient;
      context.fillRect(0, 0, 1100, 900);
    },
    connect() {
      this.socket = new SockJS("http://localhost:8090/snake");
      this.stompClient = Stomp.over(this.socket);
      this.stompClient.debug = () => {};
      this.stompClient.connect({}, this.onConnected, error => {
        this.connected = false;
        this.clearCanvas(this.context);
        alert(
          "Verbinding met de websocket is verloren. Probeer opnieuw te connecten!"
        );
        console.log(error);
      });
    },
    onConnected() {
      this.connected = true;
      this.stompClient.subscribe("/topic/public", this.onMessageReceived);

      this.stompClient.send(
        "/app/addUser",
        JSON.stringify(this.getNickname),
        {}
      );
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

<style scoped>
.bottom-nav-bg {
  background-color: #131f2c !important;
}

#outer {
  position: relative;
  transform-origin: top left;
  -webkit-transform-origin: top left;
  width: 1100px;
  height: 900px;
}

#wrap {
  position: relative;
  width: 1100px;
  height: 900px;
}
</style>
