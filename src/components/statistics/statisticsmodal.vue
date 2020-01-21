<template>
  <v-row justify="center">
    <v-dialog :value="value" persistent max-width="290" @input="$emit('input')">
      <v-card>
        <v-card-title class="headline">Account statistics</v-card-title>
        <v-card-text>
          <v-alert type="success">
            Going strong with {{ statistic.statistic.kills }} kills!
          </v-alert></v-card-text
        >
        <v-card-text>
          <v-alert type="error">
            I know the game is hard.. you died
            {{ statistic.statistic.deads }} times!
          </v-alert></v-card-text
        >
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click.native="$emit('input')"
            >Close</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import { mapState } from "vuex";

export default {
  props: ["value"],
  computed: {
    user() {
      return this.$store.getters.user;
    },
    ...mapState(["statistic"])
  },
  created() {
    this.$store.dispatch("getStatistic", this.user);
  }
};
</script>
