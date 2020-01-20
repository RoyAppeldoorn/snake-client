<template>
  <div id="wrap">
    <canvas
      ref="game"
      width="1100"
      height="900"
      id="outer"
      style="border:3px solid #ffffff;"
    ></canvas>

    <v-bottom-navigation app class="align-center bottom-nav-bg">
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

      <v-btn value="logout" style="height: 100%" @click="logout">
        <span>logout</span>
        <v-icon>mdi-power-plug-off</v-icon>
      </v-btn>
    </v-bottom-navigation>
  </div>
</template>

<script>
import SockJS from "sockjs-client";
import Stomp from "webstomp-client";
import { mapGetters } from "vuex";
import firebase from "firebase";
import $ from "jquery";

export default {
  name: "snakegame",
  data() {
    return {
      connected: false,
      snakes: [],
      direction: null,
      received_messages: [],
      context: null,
      points: 0
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

    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        self.$store.dispatch("getPlayerFromDatabase", { id: user.uid });
      }
    });
  },
  mounted() {
    this.context = this.$refs.game.getContext("2d");
    this.clearCanvas();

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
    ...mapGetters(["nickname", "user"])
  },
  methods: {
    addSnake(sessionId, uuid, color, nickname, points) {
      if (!this.snakes.some(snake => snake.sessionId == sessionId)) {
        this.snakes.push({
          sessionId: sessionId,
          uuid: uuid,
          color: color,
          nickname: nickname,
          points: points
        });
        this.$store.dispatch("addToPlayers", {
          sessionId: sessionId,
          nickname: nickname,
          color: color
        });
      }
    },
    updateSnake(sessionId, head, tail, points) {
      this.snakes.findIndex(snake => {
        if (snake.sessionId == sessionId) {
          snake.head = head;
          snake.tail = tail;
          snake.points = points;
          this.$store.dispatch("updatePoints", {
            sessionId: snake.sessionId,
            points: snake.points
          });
        }
      });
    },
    removeSnake(sessionId) {
      let index = this.snakes.findIndex(x => x.sessionId == sessionId);
      this.$delete(this.snakes, index);
    },
    setDirection(direction) {
      this.direction = direction;
      this.stompClient.send("/app/setDirection", direction, {});
    },
    onMessageReceived(payload) {
      var message = JSON.parse(payload.body);
      var content = JSON.parse(message.content);

      switch (message.type) {
        case "JOIN": {
          for (var j = 0; j < content.length; j++) {
            this.addSnake(
              content[j].sessionId,
              content[j].uuid,
              content[j].hexColor,
              content[j].nickname,
              content[j].points
            );
          }
          break;
        }
        case "UPDATE":
          for (var i = 0; i < content.length; i++) {
            this.updateSnake(
              content[i].sessionId,
              content[i].head,
              content[i].tail,
              content[i].points
            );
          }
          this.draw();
          break;
        case "LEAVE": {
          this.removeSnake(content);
          this.$store.dispatch("removeFromPlayers", content);
          break;
        }
        case "DEAD":
          console.log(
            "Info: Your snake is dead, bad luck! " + content.nickname
          );
          this.$store.dispatch("updatePlayerDeads", content.uuid);
          break;
        case "KILL":
          console.log("Info: Head shot! " + content.nickname + " got a kill");
          this.$store.dispatch("updatePlayerKills", content.uuid);
          break;
        case "ROUND_OVER":
          console.log("Info: Round over!");
          break;
        case "GAME_OVER":
          console.log("Info: Game over!");
          while (this.snakes.length) {
            this.snakes.pop();
          }
          this.clearCanvas();
          this.disconnect();
          break;
      }
    },
    draw() {
      this.clearCanvas();
      for (var j = 0; j < this.snakes.length; j++) {
        this.context.fillStyle = this.snakes[j].color;
        this.context.fillRect(
          this.snakes[j].head.x,
          this.snakes[j].head.y,
          20,
          20
        );
        this.context.clearRect(
          this.snakes[j].head.x + 2,
          this.snakes[j].head.y + 2,
          16,
          16
        );
        for (var i = 0; i < this.snakes[j].tail.length; i++) {
          this.context.fillRect(
            this.snakes[j].tail[i].x,
            this.snakes[j].tail[i].y,
            20,
            20
          );
          this.context.clearRect(
            this.snakes[j].tail[i].x + 2,
            this.snakes[j].tail[i].y + 2,
            16,
            16
          );
        }
      }
    },
    clearCanvas() {
      this.context.clearRect(0, 0, 1100, 900);
      this.context.fillStyle = this.canvasGradient;
      this.context.fillRect(0, 0, 1100, 900);
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
        JSON.stringify({
          nickname: this.nickname,
          uuid: this.user
        }),
        {}
      );
    },
    disconnect() {
      if (this.stompClient) {
        this.connected = false;
        this.stompClient.disconnect();
      }
    },
    logout() {
      this.$store.dispatch("signOut");
    }
  }
};
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
