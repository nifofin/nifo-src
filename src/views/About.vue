<template>
  <div class="about">
    <scrollactive class="sidenav" v-on:itemchanged="onItemChanged">
      <ul style="list-style: none; margin-bottom: 15vh;">
        <li><a href="#nifo" class="scrollactive-item"><b>Nifo</b></a></li>
        <ul style="list-style: none;">
          <li><a href='#introduction' class="scrollactive-item">Introduction</a></li>
          <li><a href="#publicaccounts" class="scrollactive-item"><b>Public Accounts</b></a></li>
          <ul style="list-style: none;">
            <li><a href="#edit" class="scrollactive-item">Admin</a></li>
            <li><a href="#viewonly" class="scrollactive-item">View-only</a></li>
            <li><a href="#contributing" class="scrollactive-item">Contributing</a></li>
          </ul>
          <li><a href="#usage" class="scrollactive-item"><b>Usage</b></a></li>
          <ul style="list-style: none;">
            <li><a href="#gettingstarted" class="scrollactive-item">Getting Started</a></li>
            <li><a href="#controls" class="scrollactive-item">Actions</a></li>
            <li><a href="#permissions" class="scrollactive-item">Permissions</a></li>
          </ul>
          <li><a href="#FAQ" class="scrollactive-item"><b>FAQ</b></a></li>
          <ul style="list-style: none;">
            <li><a href="#deletingitems" class="scrollactive-item">Deleting Items</a></li>
            <li><a href="#misc-faq" class="scrollactive-item">Misc</a></li>
          </ul>
          <li><a href="#contact" class="scrollactive-item"><b>Feedback/Contact</b></a></li>
          <ul style="list-style: none;"></ul>
          <li><a href="#todo" class="scrollactive-item"><b>Todo</b></a></li>
          <ul style="list-style: none;">
            <li><a href="#Todo" class="scrollactive-item">Todo</a></li>
            <li><a href="#done" class="scrollactive-item">Done</a></li>
          </ul>
          <li><a href="#misc" class="scrollactive-item"><b>Misc</b></a></li>
          <ul style="list-style: none;">
            <li><a href="#external" class="scrollactive-item">External Stuff</a></li>
          </ul>
        </ul>
      </ul>
    </scrollactive>
    <div class="main">
      <h1 id="nifo">Nifo</h1>
      <div style="margin-left: 1vw;">
        <h3 id="introduction">Introduction</h3>
        <p>Nifo is a simple note-taking/note-keeping application with a collapsible tree structure to simplify organization. </p>
        <p>First created in August 2020, <a class="routerLink" href="https://nifofin.github.io/nifo/">Nifo</a> includes a wide range of features, detailed in the <a class="routerLink" href="#done">Todo - Done</a> section below. </p>
        <p>Nifo currently supports the following types of formatting:</p>
        <p><ul style="list-style: none;"><li>- Markdown</li><li>- TeX</li></ul></p>
        <p>For a quick introduction, jump to <a class="routerLink" href="#gettingstarted">Getting Started</a></p>
        <p>For a list of public accounts/resources, jump to the <a class="routerLink" href="#publicaccounts">public accounts</a> section.</p>
        <!--<p>Features include: </p>
        <ul style="margin-left: 1vw;">
          <li>Notes presented in a tree/folder structure, with both content and subfolders toggleable with a <a href="#controls" class="routerLink">single click</a>. </li>
          <li>All information stored in the <a href="https://firebase.google.com/docs/firestore" class="routerLink">Firestore database</a>, enabling realtime updates. </li>
          <li>Adding, editing, and deleting of notes with a modal window. </li>
          <li>Simple sharing—<a href="#permissions" class="routerLink">editor/collaborator permissions and view-only permissions.</a></li>
          <li>And more</li>
        </ul>-->

        <hr>

        <h2 id="publicaccounts">Public Accounts</h2>
        <div style="margin-left: 1vw;">
          <h3 id="edit">Admin: </h3>
          <div style="margin-left: 1vw;">
            <p><b>Username: </b>test <b>Password: </b>test</p>
          </div>
          <h3 id="viewonly">View-only: </h3>
          <div style="margin-left: 1vw;">
            <p> (None of these have a password) </p>
            <p><b>Username: </b>Math</p>
            <p><b>Username: </b>Biology</p>
            <p><b>Username: </b>Chemistry</p>
            <p><b>Username: </b>Physics</p>
          </div>
          <h3 id="contributing">Contributing: </h3>
          <div style="margin-left: 1vw;">
            <p>If you wish to contribute to one of the public accounts (i.e. add notes for a textbook or something), please <a href="#contact" class="routerLink">email or DM</a> one of the developers. </p>
            <p>If you wish to add an account to the public accounts list, please <a href="#contact" class="routerLink">email or DM</a> one of the developers. </p>
          </div>
        </div>

        <hr>

        <h2 id="usage">Usage</h2>
        <div style="margin-left: 1vw;">
          <h3 id="gettingstarted">Getting Started</h3>
          <div style="margin-left: 1vw;">
            <p>1. Navigate to <b>Home</b>, where you will be redirected to a login page if you are not signed in to an account.</p>
            <p>2. To login, enter a username and a password.</p>
            <p style="padding-left: 1vw;">2.a. (Registration) If the entered username is not present in the DB, you will be prompted to register and create an account, and then you will be redirected to the home page.</p>
            <p>3. At the home page, a root folder that's named your username has already been created. Double click on it to start adding. We support infinite nesting (probably). Right click it to see a short introduction on how to use NIFO. </p>
          </div>
          <h3 id="controls">Actions</h3>
          <div style="margin-left: 1vw;">
            <p><b>Single click: </b>Toggle folder expansion</p>
            <p><b>Double click: </b>Create new folder, retrieve any existing elements from DB, and add an item</p>
            <p><b>Right click: </b>Show content of element</p>
            <p><b>Hover: </b>When you hover over an item, an edit button will appear. Click on it to edit or delete the item.</p>
          </div>
          <h3 id="permissions">Permissions</h3>
          <div style="margin-left: 1vw;">
            <p><b>Admin: </b> Admin permissions allow the user to change the admin password and view password, as well as change the structure and content of the notes.</p>
            <p><b>View: </b> View permissions, in contrast, are much more limited, only allowing the user to view the list of notes. By default, the view password is empty, although a user with admin permissions may change it in <router-link class="routerLink" to="/profile">Profile->General->Change View Password.</router-link></p>
          </div>
      </div>

      <hr>

      <h2 id="FAQ">FAQ</h2>
      <div style="margin-left: 1vw;">
        <h3 id="deletingitems">Deleting/Editing Items</h3>
        <div style="margin-left: 1vw;">
          <p><b>Q: </b>If I delete/edit an item, can I undo it / get it back?</p>
          <p><b>A: </b>No, once you delete or edit it, it's gone forever. </p>
          <br>
          <p><b>Q: </b>What happens to the nested items when I delete an item?</p>
          <p><b>A: </b>The subitems stay in the database forever, and you will never be able to access them again after deleting the parent item, so please either: <br> 1. Delete all subitems before deleting the desired item  <br> 2. <a href="#contact" class="routerLink">Contact</a> one of the developers to delete it for you. </p>
          <br>
        </div>
        <h3 id="misc-faq">Misc</h3>
        <div style="margin-left: 1vw;">
        <p><b>Q: </b>Can I import/export things?</p>
        <p><b>A: </b>No, this feature still hasn't been implemented yet. In the near future, we'll probably add this feature.</p>
        <br>
        <p><b>Q: </b>What happens if I take a common username that may be used as a public account in the future? </p>
        <p><b>A: </b>If your username is used as a public account, your account's username will be changed (i.e. if your username was "C++", it could be changed to "C++1"). If it is changed, you will find a notice of it on the <router-link class="routerLink" to="/announcements">Announcements</router-link> page. </p>
        </div>
      </div>

      <hr>

      <h2 id="contact">Feedback/Contact</h2>
      <div style="margin-left: 1vw;">
        <p>If you encounter any issues, have any feedback on how to improve the UI and/or features to implement, or just want to talk, contact one of the developers!</p>
        <p style="cursor: pointer;" @click="sendEmail">Email: sevenisreallycommon at gmail dot com</p>
        <p>Discord: a fluffy fruit#7626</p>
      </div>

      <hr>

      <h2 id="todo">Todo</h2>
      <div style="margin-left: 1vw;">
        <h3 id="Todo">Todo</h3>
          <div style="margin-left: 1vw;">
            <ul>
              <li>Make it so that when you double click to create/retrieve a folder, it stops highlighting the text (idk how to do this)</li>
              <li>Dark theme (needs restructuring of css so that it uses variables or something idk)</li>
              <li>Import by uploading a JSON file (easy enough, I'll add this functionality sometime)</li>
              <li>Export by downloading a JSON file (note: exporting will probably be nigh-impossible without a lot of pointless effort on my end because of how dumbly firestore is set up which makes it so that you can't really retrieve all the subdocuments and stuff in a single query facepalm)</li>
              <li>C++ windows version (importing and exporting is finished, but the display + in-app editing is still a rip)</li>
              <li>Android (not started) (android studio is going to kill my computer)</li>
              <li>Apple (not started) (unlikely to happen because you have to pay to be on appstore :( )</li>
            </ul>
          </div>
        <h3 id="done">Done</h3>
          <div style="margin-left: 1vw;">
            <ul>
              <li>Added MathJax to automatically render anything you write with tex (bro this took ridiculously long to do because some people made a dumb thing called "vue-mathjax" which is actually trash)</li>
              <li>Added another page to the profile/settings page—Appearance, where you can change your theme (only light/default theme so far, which uses Vue's default colors)</li>
              <li>Make it so that when you're in the Profile page and you have the sidebar open, if you click somewhere not on the sidebar or on one of the links, the sidebar disappears. (QoL)
              <li>Support markdown in notes</li>
              <li>Upload a (non obsfucated) version to <a class="routerLink" href="https://github.com/nifofin/nifo-src">github</a></li>
              <li>Make it so that when you click outside of a modal window, the modal window disappears. </li>
              <li>Fixed css of the Add Note modal (if the title is too long it looks wack)</li>
              <li>Added profile page, where (if you have permissions) you can change the admin password and the view password</li>
              <li>Added two different forms of permissions (depending on the password used): "admin"/"edit"/"collaborator", aka full permissions, and "view-only", aka you can only see notes but you can't change anything</li>
              <li>Sync with firestore database</li>
              <li>Add, edit, and delete in a modal window</li>
              <li>Added home page, added tree view so you can single click to expand/unexpand (toggle), double click to create folder/retrieve subnotes/subfolders/subdocuments from th db, and right click to show "content"</li>
              <li>Added login page</li>
              <li>Added docs page</li>
            </ul>
          </div>
      </div>

      <hr>

      <h2 id="misc">Misc</h2>
      <div style="margin-left: 1vw;">
        <h3 id="external">External Stuff</h3>
        <div style="margin-left: 1vw;">
          <ul>
            <li><a href="https://vuejs.org/" class="routerLink">Vue.js</a> (and things from vue-cli)</li>
            <li><a href="https://firebase.google.com/" class="routerLink">Firebase</a> (firestore db)</li>
            <li><a href="https://github.com/showdownjs/showdown" class="routerLink">Showdown</a> (for markdown -> html)</li>
            <li><a href="https://github.com/eddiemf/vue-scrollactive" class="routerLink">VueScrollactive</a> (for docs index highlighting)</li>
            <li><a href="https://github.com/simplesmiler/vue-clickaway" class="routerLink">VueClickaway</a> (for sidebar hiding when clicking on another portion of the screen)</li>
            <li><a href="https://www.mathjax.org/" class="routerLink">MathJax</a> (for rendering math stuff)</li>
          </ul>
        </div>
      </div>
    </div>
    </div>
    </div>
</template>

<script>
export default {
  name: 'about',
  methods: {
    sendEmail() {
      var link = "mailto:sevenisreallycommon^gmail.com".replace("^", "@") + "&subject=" + escape("Nifo - " + this.$store.state.user.username) + "&body=" + escape("Hello, \n");
      window.location.href = link;
    }
  }
}
</script>

<style scoped>
@import "../assets/styles/variables.css";

hr {
  height: 1px;
  border: 0;
  color: var(--light-dark);
  background-color: var(--light-dark);
}

.routerLink {
  color: var(--light-light);
  text-decoration: none;
}

ul {
  padding-inline-start: 1vw;
}

li {
  margin: 5px 0px;
}

.is-active {
  color: #42b983 !important;
}

.sidenav {
  height: 100%;
  width: 20vw;
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  background-color: white;
  white-space: nowrap;
  padding-top: 10vh;
  overflow-x: hidden;
  overflow-y: auto;
}

.sidenav a {
  text-decoration: none;
  color: var(--light-dark);
  text-align: left;
  margin-left: 2vw;
  display: block;
}

.sidenav a:hover {
  color: var(--light-light);
}

.main {
  margin-left: 20vw;
  padding-left: 5vw;
  padding-right: 5vw;
  padding-bottom: 15vh;
}

.center {
  text-align: center;
}

.left, p, h3 {
  text-align: left;
}

.about {
  text-align: left;
}

</style>
