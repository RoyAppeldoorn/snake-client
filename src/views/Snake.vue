<template>
  <div>
    <GameBoard />

    <BottomNavigation />
  </div>
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
