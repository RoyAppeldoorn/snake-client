<template>
  <v-container class="fill-height">
    <v-row>
      <v-col cols="12" class="pa-0">
        <v-row align="center" justify="center">
          <GameBoard />
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import GameBoard from "@/components/GameBoard.vue";

export default {
  data: () => ({}),
  components: {
    GameBoard
  }
};
</script>

<style lang="scss" scoped></style>
