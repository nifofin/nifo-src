<template>
  <div class="profile">
    <div v-if="showSidenav" class="sidenav" v-on-clickaway="away">
      <button class="close-sidenav-button" style="background-color: transparent;" @click="showSidenav = false"><img style="height: 20px; width: auto; background-color: transparent;" src="../assets/white_x.png"></button>
      <ul style="list-style: none;">
        <li><button class="sidebar-button" @click="menuPartShown = 'general'; showSidenav = false">General</button></li>
        <li><button class="sidebar-button" @click="menuPartShown = 'appearance'; showSidenav = false">Appearance</button></li>
      </ul>
    </div>
    <div class="main">
      <button class="open-sidenav-button" @click="showSidenav = true"><img style="height: 30px; width: auto;" src="../assets/menu.png"></button>
      <general v-if="menuPartShown == 'general'"></general>
      <appearance v-if="menuPartShown == 'appearance'"></appearance>
    </div>
  </div>
</template>

<script>
import general from "../components/general.vue";
import appearance from "../components/appearance.vue";
import { mixin as clickaway } from "vue-clickaway";

export default {
  name: "profile",
  mixins: [clickaway],
  data() {
    return {
      showSidenav: false,
      menuPartShown: "general"
    }
  },
  components: {
    general,
    appearance
  },
  methods: {
    away: function() {
      if (this.showSidenav) { this.showSidenav = false; }
    }
  }
}
</script>

<style scoped>
@import "../assets/styles/variables.css";

.sidebar-button {
  background-color: transparent;
  border: none;
  outline: none;
  color: white;
  cursor: pointer;
  display: block;
  margin-bottom: 10px;
  margin-top: 10px;
}

.sidenav {
  height: 100%;
  width: 25vw;
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  background-color: rgba(1, 1, 1, 1);
  overflow-x: hidden;
  transition: 0.5s;
  padding-top: 10vh;
}

.close-sidenav-button, .close-sidenav-button:focus {
  border: none;
  background-color: transparent;
  float: right;
  color: white;
  margin-right: 5vw;
  font-size: 16px;
  outline: none;
  cursor: pointer;
}

.open-sidenav-button {
  border: none;
  background-color: transparent;
  margin-left: 5vw;
  padding: 0;
  cursor: pointer;
  float: left;
  outline: none;
}

</style>
