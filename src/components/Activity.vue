<template>
  <table id="conversation" class="table table-striped">
    <thead>
      <tr>
        <th>Players</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in activity.players" :key="item.sessionId">
        <td v-bind:style="{ color: item.color }">
          {{ item.nickname }} {{ item.points }}
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import { mapState } from "vuex";

export default {
  computed: {
    ...mapState(["activity"])
  },
  methods: {}
};
</script>

<style lang="scss" scoped></style>
