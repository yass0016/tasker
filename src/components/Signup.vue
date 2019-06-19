<template>
  <div class="signup">
    <div v-if="signingUp" class="container-loading">
      <img src="/loading.gif" alt="Loading Icon">
    </div>
    <p v-if="signupError">{{ signupError }}</p>
    <form @submit.prevent="signupSubmit">
      <input type="text" placeholder="First name" v-model="firstname">
      <input type="text" placeholder="Last name" v-model="lastname">
      <input type="email" placeholder="E-Mail" v-model="email">
      <input type="password" placeholder="Password" v-model="password">
      <button type="submit">Signup</button>
    </form>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  data() {
    return {
      firstname: "",
      lastname: "",
      email: "",
      password: ""
    };
  },
  computed: {
    ...mapState(["signingUp", "signupError"])
  },
  methods: {
    ...mapActions(["doSignup"]),
    signupSubmit() {
      this.doSignup({
        firstname: this.firstname,
        lastname: this.lastname,
        email: this.email,
        password: this.password
      });
    }
  }
};
</script>