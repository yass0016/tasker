import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import router from "./router";
import Parse from "./services/parse";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: null,
    accessToken: null,
    loggingIn: false,
    signingUp: false,
    loginError: null,
    signupError: null
  },
  mutations: {
    loginStart: state => (state.loggingIn = true),
    loginStop: (state, errorMessage) => {
      state.loggingIn = false;
      state.loginError = errorMessage;
    },
    signupStart: state => (state.signingUp = true),
    signupStop: (state, errorMessage) => {
      state.signingUp = false;
      state.signupError = errorMessage;
    },
    updateAccessToken: (state, accessToken) => {
      state.accessToken = accessToken;
    },
    updateUser: (state, user) => {
      state.user = user;
    },
    logout: state => {
      state.accessToken = null;
    }
  },
  actions: {
    async doSignup({ commit }, signupData) {
      commit("signupStart");

      let user = new Parse.User();
      user.set("username", signupData.email);
      user.set("password", signupData.password);
      user.set("email", signupData.email);
      user.set("firstname", signupData.firstname);
      user.set("lastname", signupData.lastname);

      try {
        const current = await user.signUp();

        localStorage.setItem("accessToken", current.attributes.sessionToken);
        localStorage.setItem("user", JSON.stringify(current));

        commit("signupStop", null);
        commit("updateAccessToken", current.attributes.sessionToken);
        commit("updateUser", JSON.stringify(current));

        router.push("/dashboard");
      } catch (error) {
        commit("signupStop", error.message);
        commit("updateAccessToken", null);
        commit("updateUser", null);
      }
    },

    async doLogin({ commit }, loginData) {
      commit("loginStart");

      let email = loginData.email;
      let password = loginData.password;

      try {
        const user = await Parse.User.logIn(email, password);

        localStorage.setItem("accessToken", user.attributes.sessionToken);

        localStorage.setItem("user", JSON.stringify(user));

        commit("loginStop", null);
        commit("updateAccessToken", user.attributes.sessionToken);
        commit("updateUser", JSON.stringify(user));

        router.push("/dashboard");
      } catch (error) {
        commit("loginStop", error.message);
        commit("updateAccessToken", null);
        commit("updateUser", null);
      }
    },
    fetchAccessToken({ commit }) {
      commit("updateAccessToken", localStorage.getItem("accessToken"));
    },
    fetchUser({ commit }) {
      commit("updateUser", JSON.parse(localStorage.getItem("user")));
    },
    logout({ commit }) {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("user");

      Parse.User.logOut();

      commit("logout");
      router.push("/login");
    }
  }
});
