<template>
  <v-container class="fill-height" fluid ma-0 pa-0>
    <v-col sm="6" class="pa-0 d-none d-sm-flex">
      <v-img src="@/assets/snake.jpg" rel="preload" min-height="100vh" />
    </v-col>
    <v-col xs="12" sm="6">
      <transition :name="transitionName" mode="out-in">
        <router-view />
      </transition>
    </v-col>
  </v-container>
</template>

<script>
const DEFAULT_TRANSITION = "fade";

export default {
  data: () => ({
    publicPath: process.env.BASE_URL,
    transitionName: DEFAULT_TRANSITION
  }),
  created() {
    this.$router.beforeEach((to, from, next) => {
      let transitionName = to.meta.transitionName || from.meta.transitionName;

      if (transitionName === "slide") {
        const toPath = to.path;
        transitionName = toPath === "/signup" ? "slide-right" : "slide-left";
      }

      this.transitionName = transitionName || DEFAULT_TRANSITION;
      next();
    });
  }
};
</script>

<style lang="scss" scoped>
.slide-left-enter-active,
.slide-left-leave-active,
.slide-right-enter-active,
.slide-right-leave-active {
  transition-duration: 0.5s;
  transition-property: height, opacity, transform;
  transition-timing-function: cubic-bezier(0.55, 0, 0.1, 1);
  overflow: hidden;
}

.slide-left-enter,
.slide-right-leave-active {
  opacity: 0;
  transform: translate(2em, 0);
}

.slide-left-leave-active,
.slide-right-enter {
  opacity: 0;
  transform: translate(-2em, 0);
}
</style>
