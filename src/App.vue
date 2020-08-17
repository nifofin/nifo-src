<template>
  <div id="app">
    <div id="nav">
      <router-link to="/home">Home</router-link>
      <router-link to="/docs">Docs</router-link>
      <router-link v-if="isntLoggedIn && !this.$store.state.user.viewOnly" to="/profile">Profile</router-link>
      <router-link v-if="isntLoggedIn" to="/login" v-on:click.native="logout()" replace>Logout ({{this.$store.state.user.username}})</router-link>
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
  color: var(--light-dark);
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: var(--light-dark);
  padding-left: 10px;
  padding-right: 10px;
}

#nav a.router-link-exact-active {
  color: var(--light-light);
}
</style>
