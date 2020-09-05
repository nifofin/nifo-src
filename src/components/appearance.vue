<template>
<div class="main">
  <h1>Appearance</h1>
  <div class="themeSection">
    <h2>Theme</h2>
    <button class="theme-button">Light theme (default)</button>
    <h2>Options</h2>
    <input type="checkbox" @click="changeUseModal" id="useModal" name="useModal" value="useModal"/><label for="useModal">Use Modal</label>
  </div>
</div>
</template>

<script>
export default {
  name: "appearance",
  mounted() {
    document.getElementById("useModal").checked = localStorage.useModal === "true";
  },
  methods: {
    changeUseModal() {
      //console.log("changed!", document.getElementById("useModal").checked);
      localStorage.setItem("useModal", document.getElementById("useModal").checked);
      this.$store.commit("changeUseModal", document.getElementById("useModal").checked);
    }
  }
}
</script>

<style scoped>
@import "../assets/styles/variables.css";

.main {
  text-align: left;
  padding-left: 10vw;
}

.themeSection {
  margin-left: 1vw;
}

.theme-button {
  border: var(--text) 1.25px solid;
  border-radius: 2px;
  /*margin-top: 10px;*/
  padding: 5px 10px;
  cursor: pointer;
  background-color: rgba(200, 200, 200, 0.3);
}

.theme-button:hover {
  border: var(--text-accent) 1.25px solid;
  border-radius: 2px;
  color: var(--text-accent);
  background-color: rgba(200, 200, 200, 0.2);
}

.theme-button:focus {
  border: var(--text-accent) 2px solid;
  border-radius: 2px;
}

</style>
