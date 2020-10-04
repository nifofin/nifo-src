<template>
  <div class="about">
    <scrollactive class="sidenav" v-on:itemchanged="onItemChanged">
      <ul style="list-style: none; margin-bottom: 15vh;">
        <li><a href="#nifo" class="scrollactive-item"><b>Nifo</b></a></li>
        <ul style="list-style: none;">
          <li><a href='#introduction' class="scrollactive-item">Introduction</a></li>
          <li><a href="#publicaccounts" class="scrollactive-item"><b>Public Accounts</b></a></li>
          <ul style="list-style: none;">
            <li><a href="#editing" class="scrollactive-item">Editing</a></li>
            <li><a href="#viewonly" class="scrollactive-item">View Only</a></li>
            <li><a href="#contributing" class="scrollactive-item">Contributing</a></li>
          </ul>
          <li><a href="#usage" class="scrollactive-item"><b>Usage</b></a></li>
          <ul style="list-style: none;">
            <li><a href="#gettingstarted" class="scrollactive-item">Getting Started</a></li>
            <li><a href="#actions" class="scrollactive-item">Actions</a></li>
            <li><a href="#permissions" class="scrollactive-item">Permissions</a></li>
          </ul>
          <li><a href="#faq" class="scrollactive-item"><b>FAQ</b></a></li>
          <li><a href="#contact" class="scrollactive-item"><b>Contact</b></a></li>
          <ul style="list-style: none;"></ul>
          <li><a href="#development" class="scrollactive-item"><b>Development</b></a></li>
          <ul style="list-style: none;">
            <li><a href="#todo" class="scrollactive-item">Todo</a></li>
            <li><a href="#done" class="scrollactive-item">Done</a></li>
          </ul>
          <li><a href="#misc" class="scrollactive-item"><b>Misc</b></a></li>
          <ul style="list-style: none;">
            <li><a href="#external" class="scrollactive-item">External</a></li>
          </ul>
        </ul>
      </ul>
    </scrollactive>
    <div class="main">
      <div id="aboutMd" v-html="this.htmlAbout">
      </div>
    </div>
    </div>
</template>

<script>
import showdown from "showdown";
import rawMd from "./about_markdown.md";
// showdown

const conv = new showdown.Converter({
  simpleLineBreaks: true,
  strikethrough: true,
  simplifiedAutoLink: true,
  excludeTrailingPunctuationFromURLs: true,
  tables: true,
  tasklists: true,
});



export default {
  name: 'about',
  data() {
    return {
      htmlAbout: ""
    };
  },
  methods: {
    sendEmail() {
      var link = "mailto:sevenisreallycommon^gmail.com".replace("^", "@") + "&subject=" + escape("Nifo - " + this.$store.state.user.username) + "&body=" + escape("Hello, \n");
      window.location.href = link;
    }
  },
  created: function() {
    this.htmlAbout = conv.makeHtml(rawMd);
  }
}
</script>

<style scoped>
@import "../assets/styles/variables.css";

.about {
  text-align: left;
}

/* scrollactive */
.is-active {
  color: #42b983 !important;
}





ul {
  padding-inline-start: 1vw;
}

li {
  margin: 5px 0px;
}


/* sidenav */
.sidenav {
  height: 100%;
  width: 20vw;
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  background-color: var(--background);
  white-space: nowrap;
  padding-top: 10vh;
  overflow-x: hidden;
  overflow-y: auto;
}

.sidenav a {
  color: var(--text);
  text-align: left;
  margin-left: 2vw;
  display: block;
}
.sidenav a:hover {
  color: var(--text-accent);
}



.main {
  margin: 0 0 0 20vw;
  padding: 0 5vw 15vh 5vw;
}
</style>
