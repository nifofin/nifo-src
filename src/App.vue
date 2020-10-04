<template>
  <div id="app">
    <div id="nav">
      <router-link style="user-select: none;" to="/">Home</router-link>
      <router-link style="user-select: none;" to="/docs">Docs</router-link>
      <router-link style="user-select: none;" v-if="isLoggedIn && !this.$store.state.user.viewOnly" to="/profile">Profile</router-link>
      <a v-if="isLoggedIn" v-on:click="logout()" style="user-select: none;" replace>Logout ({{this.$store.state.user.username}})</a>
    </div>

    <router-view />

    <pdfModal v-show="this.showPdfModal" @close="showPdfModal = false">
      <div>hi</div>
    </pdfModal>
  </div>
</template>

<script>
  import $ from 'jquery';

  import pdfModal from "./components/pdfModal.vue";

  $(document).ready(function() {
    // move to moutned function in dexport default

  });

  export default {
    name: "App",
    data() {
      return {
        showPdfModal: false,
        test: "blah"
      }
    },
    mounted() {
      var _self = this;
      $(document.body).on('click', 'a[href*=".pdf"]', function(e) {
        e.preventDefault();
        _self.showPdfModal = true;
        var pdfEmbed = document.getElementById("embedDiv");
        pdfEmbed.innerHTML = "<embed src='" + $(this).attr('href') + "' frameborder='0' width='100%' height='" + ($(window).height() * 9 / 10) + "'>";
        document.getElementById("pdfModalId").appendChild(pdfEmbed);
      });
    },
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
    },
    components: {
      pdfModal
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
