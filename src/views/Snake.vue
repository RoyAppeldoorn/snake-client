<template>
  <div>
    <GameBoard />
  </div>
</template>

<script>
import GameBoard from "@/components/GameBoard.vue";

export default {
  data() {
    return {
      alignment: "center",
      justify: "center"
    };
  },
  components: {
    GameBoard
  }
};
</script>

<style lang="scss" scoped></style>
