<template>
  <li>
    <div :class="{bold: isFolder}" @click="toggle" @dblclick="changeType" @contextmenu="handler($event)" style="width: 100vw;" class="hovering">
      <p style="display: inline-block; margin: 0;">{{model.name}}</p>
      <span v-if="isFolder">[{{open ? '-' : '+'}}]</span>
      <button  v-if="isItViewOnly" class="options-button" @click.stop="showOptions = true"><img src="../assets/colorful_icon.png" style="height: 15px; width: auto;"></button>
      <div class="modelContent" style="display: block;" v-if="this.showContent">
        <div v-html="htmledContent"></div>
      </div>
    </div>

    <ul v-show="open" v-if="isFolder">
      <item class="item" v-for="mdl in model.children" :model="mdl" :before="model" :key="mdl.id"></item>
      <li v-if="isItViewOnly" class="add" @click="addChild">+</li>
    </ul>

    <!-- Modal for adding -->
    <modal v-if="this.showing && isItViewOnly" @close="showing = false">
      <h3 slot="header">Add note</h3>
      <div slot="body">
        <input type="text" name="name" placeholder="name" autocomplete="off" v-model="adding.name" autofocus>
        <br>
        <textarea name="content" placeholder="content" cols="100" rows="20" v-model="adding.content"></textarea>
      </div>
      <div slot="footer">
        <div style="width: 20vw;">Adding to {{ this.model.name }}</div>
        <button class="modal-cancel-button" @click.stop="showing = false">Cancel</button>
        <button class="modal-default-button" @click.stop="submitNote">Ok</button>
      </div>
    </modal>

    <!-- Modal for options  -->
    <modal v-if="showOptions && isItViewOnly" @close="showOptions = false">
      <h3 slot="header">Options</h3>
      <div slot="body">
        <h4>Edit</h4>
        <input type="text" name="name" v-model="tempName" autofocus autocomplete="off" placeholder="name">
        <br>
        <textarea name="content" placeholder="content" cols="100" rows="20" v-model="tempContent"></textarea>
      </div>
      <div slot="footer">
        <button class="modal-cancel-button" @click.stop="showOptions = false">Cancel</button>
        <button class="modal-delete-button" @click.stop="deleteNote">Delete</button>
        <button style="float: left;" class="modal-default-button" @click.stop="editNote">Ok</button>
      </div>
    </modal>
  </li>
</template>

<script>
import Vue from "vue";
import { db } from "../firestore";
import Modal from "../components/modal.vue";
import showdown from "showdown";
//import _ from "underscore";

export default {
  name: "item",
  props: {
    model: Object,
    before: Object
  },
  data() {
    return {
      //asd: "<vue-mathjax :formula='htmledContent'></vue-mathjax>",
      showEdit: false,
      open: false,
      showing: false,
      showContent: false,
      showOptions: false,
      adding: {
        name: "",
        content: "",
        depth: this.model.depth + 1
      },
      tempName: this.model.name,
      tempContent: this.model.content,
      tempArray: [],
      changedBCEsc: false,
      changing: false
    }
  },
  mounted() {
    window.addEventListener("keydown", (e) => {
      if (this.$router.currentRoute.path == "/") {
        if (e.key == "e") {
          this.changedBCEsc = true;
          this.changeType();
        }
        else if (e.key == "r") {
          this.showContent = !this.showContent;
          this.$nextTick().then(()=>{window.MathJax.typeset(); })
        }
        else if (e.key == "t") {
          this.showContent = false;
        }
        else if (e.key == "y") {
          this.showContent = true;
          this.$nextTick().then(()=>{window.MathJax.typeset(); })
        }
        else if (e.key == "s") {
          this.open = !this.open;
        }
        else if (e.key == "d") {
          this.open = false;
        }
        else if (e.key == "f") {
          this.open = true;
        }
      }
    })
  },
  created() {
    this.tempArray = this.model.children;
  },
  computed: {
    isFolder() {
      return this.model.children && this.model.children.length;
    },
    isItViewOnly() {
      return !this.$store.state.user.viewOnly;
    },
    htmledContent() {
      var converter = new showdown.Converter({simpleLineBreaks: true});
      return converter.makeHtml(this.model.content);
    }
  },
  methods: {
    handler(e) {
      this.showContent = !this.showContent;
      e.preventDefault();
      this.$nextTick().then(()=>{window.MathJax.typeset(); })
    },
    toggle() {
      if (this.isFolder) { this.open = !this.open; }
    },
    changeType() {
      if (!this.isFolder && !this.changing) {
        this.changing = true;
        Vue.set(this.model, "children", []);
        var _self = this;
        var asdf = "depth" + (this.model.depth+1).toString(10)
        db.collection("users").doc(this.$store.state.user.username).collection("dataTree").doc("userNotes").collection(asdf).where("parent", "==", this.model.id).get()
        .then(function(querySnapshot) {
          if (querySnapshot.empty) {
            if (!_self.changedBCEsc) {_self.showing = true;}
            _self.changedBCEsc = false;
          }
          else {
            querySnapshot.forEach(function(doc) {
            if (!_self.model.children.includes(doc)) {_self.model.children.push({name: doc.data().name, content: doc.data().content, depth: _self.model.depth+1, id: doc.id}); }});
            _self.model.children.sort((a,b) => (a.name > b.name) ? 1 : -1);
          }
          _self.changing = false;
        });
        this.open = true;
      }
    },
    addChild() {
      this.showing = true;
    },
    deleteNote() {
      var asdf = "depth" + this.model.depth.toString(10);
      var fads = this.$store.state.user.username;
      db.collection("users").doc(fads).collection("dataTree").doc("userNotes").collection(asdf).doc(this.model.id).delete()
      .then(function() {
        console.log("Document successfully deleted");
      }).catch(function(error) {
        console.error("Error removing document: ", error);
      })
      var index = this.before.children.findIndex(x => x.name == this.model.name);
      this.before.children.splice(index, 1);
    },
    editNote() {
      this.model.name = this.tempName;
      this.model.content = this.tempContent;
      db.collection("users").doc(this.$store.state.user.username).collection("dataTree").doc("userNotes").collection("depth" + this.model.depth.toString(10)).doc(this.model.id).update({name: this.model.name, content: this.model.content});
      this.showOptions = false;
    },
    submitNote() {
      // add logic for adding to database
      this.showing = false;
      var data = {
        name: this.adding.name,
        content: this.adding.content,
        depth: this.adding.depth,
        id: this.adding.name + new Date().getTime().toString(10)
      }
      db.collection("users").doc(this.$store.state.user.username).collection("dataTree").doc("userNotes").collection("depth" + data.depth.toString(10)).doc(data.id).set({name: data.name, content: data.content, depth: data.depth, parent: this.model.id});
      this.model.children.push(data);
      this.adding.name = ""; this.adding.content = "";
    }
  },
  components: {
    Modal,
    //VRuntimeTemplate,
    //"vue-mathjax": VueMathjax
  }
};
</script>

<style scoped>
@import "../assets/styles/variables.css";

textarea {
  max-width: 35vw;
}

div, span {
  display: inline;
}



ul {
  padding-left: 1em;
  line-height: 1.5em;
  list-style-type: dot;
}

.bold {
  font-weight: bold;
}

input {
  margin-top: 1em;
  margin-bottom: 1em;
}

.modelContent {
  background-color: rgb(240, 240, 240);
  padding-left: 2vw;
  padding-right: 2vw;
  padding-top: 1vh;
  padding-bottom: 1vh;
  margin-left: 1vw;
  margin-right: 5vw;
  margin-top: 5px;
  font-weight: normal;
  border-radius: 2px;
}

.options-button {
  border: none;
  background-color: transparent;
  cursor: pointer;
  border-radius: 2px;
  visibility: hidden;
}

.hovering:hover > .options-button {
  visibility: visible;
}

.options-button:hover > .options-button {
  visibility: visible;
}
</style>
