<template>
  <div>
    <ul>
      <item class="item" v-for="data in smth.children" :model="data" :before="smth" :key="data.id" :path="'children[' + smth.children.findIndex(thing => thing.name == data.name) + ']'"></item>
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
        children: [],
        parent: "none"
      },
      path: "children"
    };
  },
  mounted() {
    var _self = this;
    console.log("Retrieving root folder");
    // retrieve whatever has depth 0 (the root folder)
    db.collection("users").doc(this.$store.state.user.username).collection("dataTree").doc("userNotes").collection("depth0").get()
    .then(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {
        // add it to children
        console.log("Adding to children");
        _self.smth.children.push({name: doc.data().name, content: doc.data().content, depth: 0, id: doc.id, parent: "none"});
        console.log("Added ", doc.data().name, " to children");
      })

    // if there's nothing for some odd reason, push a sample one
    if (_self.smth.children.length == 0) { _self.smth.children.push({name: "Sample", content: "Sample content", depth: 0, id: "1"}); }
    })

    // import and export
    window.addEventListener("keydown", (e) => {
      var tar = e.target.tagName.toLowerCase();
      if (tar != "input" && tar != "textarea") {
        if (e.key == "i") {
          // import
        }
        else if (e.key == "o" && this.$router.currentRoute.path == "/") {
          // export
          var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(this.smth.children, ["name", "content", "children", ""], 4));
          var downloadAnchorNode = document.createElement('a');
          downloadAnchorNode.setAttribute("href",     dataStr);
          downloadAnchorNode.setAttribute("download",  "nifo_export_" + this.$store.state.user.username + ".json");
          document.body.appendChild(downloadAnchorNode); // required for firefox
          downloadAnchorNode.click();
          downloadAnchorNode.remove();
        }
        else if (e.key == "ArrowDown") {
          this.$store.commit("uploadTreeData", this.smth.children);
        }

        else if (e.key == "z") {
          if (this.$store.state.currentSelected == null) {
            this.$store.commit("updateCurrentSelected", "children[0]");
          }
          else {
            this.$store.commit("updateCurrentSelected", null);
          }
        }
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
