<template>
  <div class="profile">

    <!-- side navigation bar -->
    <div v-if="showSidenav" class="sidenav" v-on-clickaway="away">
      <ul class="random-ul">
        <!-- button to close side navigation bar -->
        <button class="transparent-button close-sidenav" @click="showSidenav = false"><img class="close-image" src="../assets/white_x.png"></button>

        <!-- the various components/tabs you can choose from -->
        <li><a class="sidenav-text" @click="tab('general')">General</a></li>
        <li><a class="sidenav-text" @click="tab('appearance')">Appearance</a></li>
      </ul>
    </div>

    <!-- main display thing -->
    <div class="main">
      <!-- button to open side navigation bar -->
      <button class="transparent-button open-sidenav left" @click="showSidenav = true"><img class="open-image" src="../assets/menu.png"></button>

      <!-- show the General component in /src/components/general.vue -->
      <general v-if="menuPartShown == 'general'"></general>

      <!-- show the Appearance component in /src/components/appearance.vue -->
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
    },
    tab: function(s) {
      this.menuPartShown = s;
      this.showSidenav = false;
    }
  }
}
</script>

<style scoped>
@import "../assets/styles/variables.css";

.profile {
  text-align: left;
}

/* Sidenav */
.sidenav {
  height: 100%;
  width: 25vw;
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  overflow-x: hidden;
  transition: 0.5s;
  background-color: var(--background-dark);
}

/* text for switching tabs */
.sidenav-text {
  color: var(--text-light);
  font-size: 2vh;
}

/* close sidenav */
.close-sidenav, .close-sidenav:focus {
  margin: 10vh 0 0 15vw;
}

.close-image {
  height: 2vw;
  width: auto;
}

/* open sidenav */
.open-sidenav {
  margin: 0 0 0 5vw;
  padding: 0;
}

.open-image {
  height: 4vw;
  width: auto;
}

</style>
