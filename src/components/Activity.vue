<template>
  <v-list disabled>
    <v-subheader>CONNECTED PLAYERS</v-subheader>

    <v-list-item-group color="primary">
      <v-list-item v-for="item in activity.players" :key="item.sessionId">
        <v-list-item-icon>
          <v-icon v-text="icon"></v-icon>
        </v-list-item-icon>
        <v-list-item-content v-bind:style="{ color: item.color }">
          <v-list-item-title
            >{{ item.nickname }}
            <span style="float: right; padding-right: 10px;">{{
              item.points
            }}</span></v-list-item-title
          >
        </v-list-item-content>
      </v-list-item>
    </v-list-item-group>
  </v-list>
</template>

<script>
import { mapState } from "vuex";

export default {
  data() {
    return {
      icon: "mdi-account"
    };
  },
  computed: {
    ...mapState(["activity"])
  },
  methods: {}
};
</script>

<style lang="scss" scoped>
.v-list-item {
  padding: 0px !important;
}
</style>
