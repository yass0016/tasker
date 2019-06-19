<template>
  <div>
    <p>Welcome {{ this.$store.state.user.firstname + ' ' + this.$store.state.user.lastname }}</p>
    <button @click="logout">Logout</button>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  mounted() {},
  data() {
    return {};
  },
  computed: mapState(["user"]),
  methods: {
    ...mapActions(["logout"])
  }
};
</script>