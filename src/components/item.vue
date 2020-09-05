<template>
  <li>
    <div :class="{bold: isFolder}" @click="toggle" @dblclick="changeType" @contextmenu="handler($event)" style="width: 100vw;" class="hovering">
      <div style="padding: 5px 10px;" :class="{selecting: this.$store.state.currentSelected == path}">
        <p style="display: inline-block; margin: 2.5px 5px;">{{model.name}}</p>
        <span v-if="isFolder">[{{open ? '-' : '+'}}]</span>
      </div>
      <button  v-if="isItViewOnly" class="options-button" @click.stop="showOptions = true"><img src="../assets/colorful_icon.png" style="height: 15px; width: auto;"></button>
      <div class="modelContent" style="display: block;" v-if="this.showContent">
        <div v-html="htmledContent"></div>
      </div>
    </div>

    <div v-show="this.showing && isItViewOnly && !this.$store.state.useModal" class="editor-wrapper">
      <input class="editor-title" type="text" v-model="adding.name" placeholder="Title" />
      <textarea v-bind:id="model.id" style="display: none;" placeholder="Content..."></textarea>
      <button class="editor-default-button" @click="submitNote">Add</button>
      <button class="editor-default-button" @click="showing = false">Cancel</button>
    </div>

      <div v-show="showOptions && isItViewOnly && !this.$store.state.useModal" class="editor-wrapper">
        <input class="editor-title" type="text" v-model="tempName" placeholder="Title" />
        <textarea v-bind:id="model.id + 'edit'" v-model="tempContent" style="display: none;" placeholder="Content..."></textarea>
        <button class="editor-default-button" @click="editNote">Edit</button>
        <button class="editor-default-button" @click="deleteNote">Delete</button>
        <button class="editor-default-button" @click="showOptions = false">Cancel</button>
      </div>

    <ul v-show="open" v-if="isFolder">
        <item class="item" v-for="mdl in model.children" :model="mdl" :before="model" :key="mdl.id" :path="path + '.children[' + model.children.findIndex(thing => thing.id == mdl.id) + ']'"></item>
        <li v-if="isItViewOnly" class="add" style="padding: 5px 10px;" @click="addChild"><div style="margin: 2.5px 5px">+</div></li>
      </ul>

    <!-- Modal for adding -->


    <modal v-if="this.showing && isItViewOnly && this.$store.state.useModal" @close="showing = false">
      <h3 slot="header">Add note</h3>
      <div slot="body">
        <input type="text" name="name" placeholder="name" autocomplete="off" v-model="adding.name" autofocus>
        <br>
        <textarea name="content" placeholder="content" cols="100" rows="20" v-model="adding.content"></textarea>
      </div>
      <div slot="footer">
        <div style="width: 25vw; display: inline-block;">Adding to {{ this.model.name }}</div>
        <button class="modal-cancel-button" @click.stop="showing = false">Cancel</button>
        <button class="modal-default-button" @click.stop="submitNote">Ok</button>
      </div>
    </modal>





    <!-- Modal for options  -->

    <modal v-if="showOptions && isItViewOnly && this.$store.state.useModal" @close="showOptions = false">
      <h3 slot="header">Options</h3>
      <div slot="body">
        <h4>Edit</h4>
        <input type="text" name="name" class="editor-title" v-model="tempName" autofocus autocomplete="off" placeholder="name">
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
import EasyMDE from "easymde";
//import _ from "underscore";

// give the html produced from markdown a class
const classMap = {
  a: "grey-link"
}

const bindings = Object.keys(classMap)
  .map(key => ({
    type: 'output',
    regex: new RegExp(`<${key}(.*)>`, 'g'),
    replace: `<${key} class="${classMap[key]}" $1>`
  }));

const conv = new showdown.Converter({
  simpleLineBreaks: true,
  strikethrough: true,
  simplifiedAutoLink: true,
  excludeTrailingPunctuationFromURLs: true,
  tables: true,
  tasklists: true,
  extensions: [...bindings]
});

// editor
var easyMDE, easyMDE2;

export default {
  name: "item",
  props: {
    model: Object,
    before: Object,
    path: String
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
      changing: false,
      mouse: true
    }
  },
  mounted() {
    var _self = this;
    easyMDE = new EasyMDE({
      element: document.getElementById(_self.$props.model.id),
      previewRender: function(plaintext, preview) {
        setTimeout(function() {
          preview.innerHTML = conv.makeHtml(plaintext);
        })
        return "Loading...";
      },
      spellChecker: false,
      forceSync: true
    });

    easyMDE2 = new EasyMDE({
      element: document.getElementById(_self.$props.model.id + "edit"),
      previewRender: function(plaintext, preview) {
        setTimeout(function() {
          preview.innerHTML = conv.makeHtml(plaintext);
        })
        return "Loading...";
      },
      spellChecker: false,
      forceSync: true
    });

    window.addEventListener("keyup", (e) => {
      var tar = e.target.tagName.toLowerCase();
      if (this.$router.currentRoute.path == "/" && tar != "input" && tar != "textarea") {
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
        else if (e.key == "m") {
          this.mouse = !this.mouse;
        }
        else if (e.key == "Escape") {
          this.showOptions = false;
          this.showing = false;
        }
        else if (this.$props.path == this.$store.state.currentSelected && (Date.now() - this.$store.state.lastKeyDown > 100)) {
          if (e.key == "ArrowUp") {
            this.$store.commit("updateKeyDown",Date.now());
            this.$store.commit("changeSelected", {direction: "up", showing: this.open, folder: this.model.children && this.model.children.length});
          }
          else if (e.key == "ArrowDown" ) {
            this.$store.commit("updateKeyDown",Date.now());
            this.$store.commit("changeSelected", {direction: "down", showing: this.open, folder: this.model.children && this.model.children.length});
          }
          else if (e.key == "n") {
            // is it a folder
            if (this.isFolder) {
              this.addChild();
            }
            // if it's not one
            else {
              this.changeType();
            }
          }
          else if (e.key == "Enter") {
            this.showContent = !this.showContent;
          }
          else if (e.key == "q") {
            this.open = !this.open;
          }
          else if (e.key == "z") {
            this.showOptions = !this.showOptions;
          }
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
      // moved this above
      //var converter = new showdown.Converter({simpleLineBreaks: true});
      return conv.makeHtml(this.model.content);
    }
  },
  methods: {
    handler(e) {
      if (this.mouse) {
        this.showContent = !this.showContent;
        e.preventDefault();
        this.$nextTick().then(()=>{window.MathJax.typeset(); })
      }
    },
    toggle() {
      if (this.isFolder && this.mouse) { this.open = !this.open; }
    },
    changeType() {
      if (!this.isFolder && !this.changing && this.mouse) {
        this.changing = true;
        Vue.set(this.model, "children", []);
        var _self = this;
        var asdf = "depth" + (this.model.depth+1).toString(10)
        db.collection("users").doc(this.$store.state.user.username).collection("dataTree").doc("userNotes").collection(asdf).where("parent", "==", this.model.id).get()
        .then(function(querySnapshot) {
          if (querySnapshot.empty) {
            if (!_self.changedBCEsc) {_self.addCild();}
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
      if (this.model.depth > 0) {
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
      }
      else {
        console.log("Sorry, you can't delete the root folder. ");
      }
    },
    editNote() {
      this.model.name = this.tempName;
      this.model.content = this.$store.state.useModal ? this.tempContent : easyMDE2.value() ;
      db.collection("users").doc(this.$store.state.user.username).collection("dataTree").doc("userNotes").collection("depth" + this.model.depth.toString(10)).doc(this.model.id).update({name: this.model.name, content: this.model.content});
      this.showOptions = false;
    },
    submitNote() {
      // add logic for adding to database
      this.showing = false;
      var data = {
        name: this.adding.name,
        content: this.adding.content ? this.adding.content : easyMDE.value(),
        depth: this.adding.depth,
        id: this.adding.name + new Date().getTime().toString(10)
      }
      db.collection("users").doc(this.$store.state.user.username).collection("dataTree").doc("userNotes").collection("depth" + data.depth.toString(10)).doc(data.id).set({name: data.name, content: data.content, depth: data.depth, parent: this.model.id});
      this.model.children.push(data);
      this.adding.name = ""; this.adding.content = ""; easyMDE.value("");
    }
  },
  components: {
    Modal
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
  background-color: rgba(1,1,1,0.01);
  color: var(--text);
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

.selecting {
  background-color: var(--text);
  color: var(--text-light);
}

.editor-title {
  font: 18px "Helvetica Neue", "Xin Gothic", "Hiragino Sans GB", "WenQuanYi Micro Hei", "Microsoft YaHei", sans-serif;
  background: transparent;
    padding: 4px;
    width: 100%;
    border: none;
    outline: none;
    opacity: 0.6;
}

.editor-default-button {
  border: 1px var(--text) solid;
  border-radius: 3px;
  background-color: var(--background);
  text-align: center;
  padding: 5px 10px;
  cursor: pointer;
  user-select: none;
  margin: 0 10px;
  margin-bottom: 10px;
}
.editor-default-button:hover {
  background-color: var(--background-grey);
}
</style>
