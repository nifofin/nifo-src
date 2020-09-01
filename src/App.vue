<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link>
      <router-link to="/docs">Docs</router-link>
      <router-link v-if="isntLoggedIn && !this.$store.state.user.viewOnly && !this.$store.state.user.editOnly" to="/profile">Profile</router-link>
      <a style="cursor: pointer;" v-if="isntLoggedIn" v-on:click="logout()" replace>Logout ({{this.$store.state.user.username}})</a>
    </div>
    <router-view />
  </div>
</template>

<script>
  export default {
    name: "App",
    methods: {
      logout() {
        this.$store.commit("clearDetails");
        window.localStorage.removeItem("nifo_login");
        window.localStorage.removeItem("nifo_login2");
        this.$router.replace("/login");
      }
    },
    computed: {
      isntLoggedIn() {
        return this.$store.state.user.loggedIn;
      }
    }
  }
</script>

<style>
@import "./assets/styles/variables.css";

button {
  outline: none;
}
#app {
  font-family: var(--font-family);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: var(--dark);
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: var(--dark);
  padding-left: 10px;
  padding-right: 10px;
}

#nav a.router-link-exact-active {
  color: var(--light);
}

a {
  color: var(--light);
  text-decoration: none;
}
</style>
