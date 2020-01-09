<template>
  <table id="conversation" class="table table-striped">
    <thead>
      <tr>
        <th>Players</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in activity.messages" :key="item">
        <td>{{ item }}</td>
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
