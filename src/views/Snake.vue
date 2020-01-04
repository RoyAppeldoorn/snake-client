<template>
  <v-container class="fill-height">
    <v-row>
      <v-col cols="12" class="pa-0">
        <v-row align="center" justify="center">
          <GameBoard />
        </v-row>
      </v-col>

      <!-- <v-col cols="4">
        <v-row>
          <Chat />
        </v-row>
      </v-col> -->
      <BottomNavigation />
    </v-row>
  </v-container>
</template>

<script>
import GameBoard from "@/components/GameBoard.vue";
import BottomNavigation from "@/components/layout/BottomNavigation.vue";

export default {
  data: () => ({}),
  components: {
    GameBoard,
    BottomNavigation
  }
};
</script>

<style lang="scss" scoped></style>
