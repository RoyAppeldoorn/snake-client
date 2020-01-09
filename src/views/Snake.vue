<template>
  <v-container fluid class="fill-height dark-bg pa-0">
    <v-row>
      <v-col cols="12" class="pa-0">
        <v-row align="center" justify="center">
          <GameBoard />
        </v-row>
      </v-col>
    </v-row>

    <Sidebar />
  </v-container>
</template>

<script>
import GameBoard from "@/components/GameBoard.vue";
import Sidebar from "@/components/layout/Sidebar.vue";

export default {
  data: () => ({}),
  components: {
    GameBoard,
    Sidebar
  }
};
</script>

<style lang="scss" scoped>
.dark-bg {
  background-color: #0c111e;
}
</style>
