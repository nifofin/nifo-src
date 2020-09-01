<template>
  <div>
    <ul>
      <item class="item" v-for="data in smth.treeData" :model="data" :before="smth" :key="data.id"></item>
    </ul>
  </div>
</template>

<script>
import item from "../components/item.vue";
import { db } from "../firestore";


export default {
  components: {
    item
  },
  data() {
    return {
      smth: {
        treeData: [],
        parent: "none"
      }
    };
  },
  mounted() {
    var _self = this;
    db.collection("users").doc(this.$store.state.user.username).collection("dataTree").doc("userNotes").collection("depth0").get()
    .then(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {
        _self.smth.treeData.push({name: doc.data().name, content: doc.data().content, depth: 0, id: doc.id, parent: "none"});
      })
    if (_self.smth.treeData.length == 0) { _self.smth.treeData.push({name: "Sample", content: "Sample content", depth: 0, id: "1"}); }
    })
    window.addEventListener("keydown", (e) => {
      if (e.key == "i") {
        // import
      }
      else if (e.key == "o" && this.$router.currentRoute.path == "/") {
        // export
        // clean up json
        var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(this.smth.treeData, ["name", "content", "children", ""], 4));
        var downloadAnchorNode = document.createElement('a');
        downloadAnchorNode.setAttribute("href",     dataStr);
        downloadAnchorNode.setAttribute("download",  "nifo_export_" + this.$store.state.user.username + ".json");
        document.body.appendChild(downloadAnchorNode); // required for firefox
        downloadAnchorNode.click();
        downloadAnchorNode.remove();
      }
    })
  }
};
</script>

<style scoped>
@import "../assets/styles/variables.css";

.item {
  text-align: left;
  cursor: pointer;
}
</style>
