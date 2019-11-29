<template>
  <v-container class="grey lighten-5" :align="alignment">
    <v-row>
      <v-col cols="8" md="8">
        <GameBoard />
      </v-col>
      <v-col cols="4" md="4">
        <Chat />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import GameBoard from "@/components/GameBoard.vue";
import Chat from "@/components/Chat.vue";

export default {
  data() {
    return {
      alignment: "center",
      justify: "center"
    };
  },
  components: {
    GameBoard,
    Chat
  }
};
</script>

<style lang="scss" scoped></style>
