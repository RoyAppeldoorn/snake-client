<template>
  <v-navigation-drawer app class="dark-bg">
    <div id="main-content" class="container">
      <div class="row">
        <div class="col-md-12">
          <Activity />
        </div>
      </div>
    </div>
  </v-navigation-drawer>
</template>

<script>
import Activity from "@/components/Activity.vue";

export default {
  components: {
    Activity
  }
};
</script>

<style lang="scss" scoped>
.dark-bg {
  background-color: #0b0f1b !important;
}
</style>
