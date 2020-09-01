<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link>
      <router-link to="/docs">Docs</router-link>
      <router-link v-if="isLoggedIn && !this.$store.state.user.viewOnly && !this.$store.state.user.editOnly" to="/profile">Profile</router-link>
      <a v-if="isLoggedIn" v-on:click="logout()" replace>Logout ({{this.$store.state.user.username}})</a>
    </div>
    
    <router-view />
  </div>
</template>

<script>
  export default {
    name: "App",
    methods: {
      logout() {
        // clears info from the store
        this.$store.commit("clearDetails");

        // clears info from localstorage
        window.localStorage.removeItem("nifo_login");
        window.localStorage.removeItem("nifo_login2");

        // redirect to /login so you can login to an account
        this.$router.replace("/login");
      }
    },
    computed: {
      isLoggedIn() {
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
  background-color: var(--background);
  color: var(--text);
  text-align: center;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: var(--text);
  padding: 0 10px;
}

#nav a.router-link-exact-active {
  color: var(--text-accent);
}
</style>
