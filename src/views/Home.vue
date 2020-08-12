<template>
  <ul>
    <item class="item" v-for="data in smth.treeData" :model="data" :before="smth" :key="data.id"></item>
  </ul>
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
  }
};
</script>

<style scoped>
.item {
  text-align: left;
  cursor: pointer;
}
</style>
