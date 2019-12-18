<template>
  <v-container class="fill-height" fluid ma-0 pa-0>
    <v-col sm="6" class="pa-0 d-none d-sm-flex">
      <v-img src="@/assets/snake.jpg" rel="preload" min-height="100vh" />
    </v-col>
    <v-col xs="12" sm="6">
      <Signup />
    </v-col>
  </v-container>
</template>

<script>
// import Signin from "@/components/auth/Signin.vue";
import Signup from "@/components/auth/Signup.vue";

export default {
  data() {
    return {
      publicPath: process.env.BASE_URL
    };
  },
  components: {
    // Signin,
    Signup
  }
};
</script>

<style lang="scss" scoped></style>
