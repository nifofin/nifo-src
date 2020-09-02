<template>
  <div class="about">
    <scrollactive class="sidenav" v-on:itemchanged="onItemChanged">
      <ul style="list-style: none; margin-bottom: 15vh;">
        <li><a href="#nifo" class="scrollactive-item"><b>Nifo</b></a></li>
        <ul style="list-style: none;">
          <li><a href='#introduction' class="scrollactive-item">Introduction</a></li>
          <li><a href="#publicaccounts" class="scrollactive-item"><b>Public Accounts</b></a></li>
          <ul style="list-style: none;">
            <li><a href="#edit" class="scrollactive-item">Editor</a></li>
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
        <p>First created in August 2020, <a href="https://nifofin.github.io/nifo/">Nifo</a> includes a wide range of features, detailed in the <a href="#done">Todo - Done</a> section below. </p>
        <p>Nifo currently supports the following types of formatting:</p>
        <p><ul style="list-style: none;"><li>- Markdown</li><li>- TeX</li></ul></p>
        <p>For a quick introduction, jump to <a href="#gettingstarted">Getting Started</a></p>
        <p>For a list of public accounts/resources, jump to the <a href="#publicaccounts">public accounts</a> section.</p>
        <!--<p>Features include: </p>
        <ul style="margin-left: 1vw;">
          <li>Notes presented in a tree/folder structure, with both content and subfolders toggleable with a <a href="#controls">single click</a>. </li>
          <li>All information stored in the <a href="https://firebase.google.com/docs/firestore">Firestore database</a>, enabling realtime updates. </li>
          <li>Adding, editing, and deleting of notes with a modal window. </li>
          <li>Simple sharing—<a href="#permissions">editor/collaborator permissions and view-only permissions.</a></li>
          <li>And more</li>
        </ul>-->

        <hr>

        <h2 id="publicaccounts">Public Accounts</h2>
        <div style="margin-left: 1vw;">
          <h3 id="edit">Editor: </h3>
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
            <br>
            <p><b>Username: </b>USIH_2020-2021</p>
          </div>
          <h3 id="contributing">Contributing: </h3>
          <div style="margin-left: 1vw;">
            <p>If you wish to contribute to one of the public accounts (i.e. add notes for a textbook or something), please <a href="#contact">email or DM</a> one of the developers. </p>
            <p>If you wish to add an account to the public accounts list, please <a href="#contact">email or DM</a> one of the developers. </p>
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
            <p><b>Single click/q: </b>Toggle folder expansion</p>
            <p><b>Double click/n: </b>Create new folder, retrieve any existing elements from DB, and add an item</p>
            <p><b>Right click/Enter: </b>Show content of element</p>
            <p><b>Hover: </b>When you hover over an item, an edit button will appear. Click on it to edit or delete the item.</p>
            <br>
            <h4>Hotkeys</h4>
            <p><b>e: </b>find if subitems exist under any current item, and if so, expands it out</p>
            <p><b>r: </b>toggles "showContent"</p>
            <p><b>t: </b>sets "showContent" to false</p>
            <p><b>y: </b>sets "showContent" to true</p>
            <p><b>s: </b>toggles folders</p>
            <p><b>d: </b>collapses all folders</p>
            <p><b>f: </b>expands all folders</p>
            <p><b>m: </b>toggles mouse interaction (left click, double click, right click)</p>
            <p><b>Escape: </b>leave the modal window</p>
            <br>
            <p><b>i: </b>import a json file (<b>WIP, broken</b>)</p>
            <p><b>o: </b>export your notes as a json file</p>
            <br>
            <h4>Selection</h4>
            <p><b>ArrowUp: </b>go up</p>
            <p><b>ArrowDown: </b>go down</p>
            <p><b>z: </b>toggle selection - selection will always reappear at root folder</p>
          </div>
          <h3 id="permissions">Permissions</h3>
          <div style="margin-left: 1vw;">
            <p><b>Admin: </b> Admin permissions allow the user to change the admin password and view password, as well as change the structure and content of the notes.</p>
            <p><b>Editor: </b>Editor permissions allow the user to view and change the structure and content of the notes. By default, the editor password is the same as the admin password, meaning that you must go to Profile - General Settings - Change Passwords - Change Editor Password and change it to something different first. </p>
            <p><b>View: </b> View permissions, in contrast, are much more limited, only allowing the user to view the list of notes. By default, the view password is empty, although a user with admin permissions may change it in <router-link to="/profile">Profile->General->Change View Password.</router-link></p>
            <p>Note: This is the order of importance from high to low, meaning if two or more permission types have the same password, the highest permission type will be granted upon sign-in.</p>
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
          <p><b>A: </b>The subitems stay in the database forever, and you will never be able to access them again after deleting the parent item, so please either: <br> 1. Delete all subitems before deleting the desired item  <br> 2. <a href="#contact">Contact</a> one of the developers to delete it for you. </p>
          <br>
        </div>
        <h3 id="misc-faq">Misc</h3>
        <div style="margin-left: 1vw;">
        <p><b>Q: </b>Can I import/export things?</p>
        <p><b>A: </b>Exporting is possible—press "o" and a download called "nifo_export_username.json", with username replaced by your username, should start.
        <br> As of 08/31/2020, importing is still not possible. </p>

        <br>

        <p><b>Q: </b>What happens if I take a common username that may be used as a public account in the future? </p>
        <p><b>A: </b>If your username is used as a public account, your account's username will be changed (i.e. if your username was "C++", it could be changed to "C++1"). If it is changed, you will find a notice of it on the <router-link to="/announcements">Announcements</router-link> page. </p>

        <br>

        <p><b>Q: </b>Can you explain the different types of formatting?</p>
        <p><b>A: </b>Nifo supports markdown formatting with <a href="http://showdownjs.com/">Showdown</a>. For the most part, it uses standard markdown formatting, but for specifics, check out <a href="https://github.com/showdownjs/showdown/wiki/Showdown's-Markdown-syntax">Showdown's markdown syntax</a> on their github wiki!
        <br> Nifo also supports typesetting math with <a href="https://www.mathjax.org/">MathJax</a>. For inline math, rather than the standard "$", use "\\(" and "\\)" around your math instead! For displayed math, you can use "$$" or "\\[" and "\\]". For more information, check out <a href="http://docs.mathjax.org/en/latest/basic/mathematics.html">MathJax's documentation</a>. (Note: we don't support MathML or AsciiMath, only TeX and LaTeX.)
        <br>If you have any suggestions on what other types of formatting we should support, feel free to <a href="#contact">let us know</a>!</p>

        <br>

        <p><b>Q: </b>How are my notes sorted?</p>
        <p><b>A: </b>Notes are sorted in alphabetical order (because firestore does that). </p>

        </div>
      </div>

      <hr>

      <h2 id="contact">Feedback/Contact</h2>
      <div style="margin-left: 1vw;">
        <p>If you encounter any issues, have any feedback on how to improve the UI and/or features to implement, or just want to talk, contact one of the developers!</p>
        <p style="cursor: pointer;" @click="sendEmail">Email: sevenisreallycommon at gmail dot com</p>
      </div>

      <hr>

      <h2 id="todo">Todo</h2>
      <div style="margin-left: 1vw;">
        <p>If you would like to help out, please <a href="#contact">contact</a> our devs!</p>
        <h3 id="Todo">Todo</h3>
          <div style="margin-left: 1vw;">
            <ul>
              <li>CSS</li>
                <ul>
                  <li>Clean up CSS</li>
                  <li>Themes (with <a href="https://joshuatz.com/posts/2019/coding-a-css-theme-switcher-a-multitude-of-web-dev-options/">javascript</a> or <a href="https://www.mynotepaper.com/create-multiple-themes-in-vuejs">scss</a>)</li>
                    <ul>
                      <li>Dark theme</li>
                      <li>Allow editor-only users to see the Profile page and ONLY the Appearance tab</li>
                    </ul>
                </ul>
              <li>JS</li>
                <ul>
                  <li>Make it so that when you double click to create/retrieve a folder, it stops highlighting the text (idk how to do this) (potential <a target="_blank" href="https://stackoverflow.com/questions/10342965/how-to-prevent-a-double-click-from-highlighting-web-page-text-using-javascript">fix</a>)</li>
                </ul>
              <li>Import/export</li>
                <ul>
                  <li>Import by uploading a JSON file (ugh I have to do some dumb stuff, I'll get to it sometime, temp code (commented out) is in main.js)</li>
                </ul>
              <li>Apps</li>
                <ul>
                  <li>C++ (windows? cross-platform?) version (attempting this in raw C++, will be using a library to simplify things soon)</li>
                  <ul>
                    <li>display</li>
                    <li>edit + add</li>
                    <li>Potential libraries: </li>
                    <ul>
                      <li><a target="_blank" href="https://github.com/Immediate-Mode-UI/Nuklear">https://github.com/Immediate-Mode-UI/Nuklear</a></li>
                      <li><a target="_blank" href="https://github.com/rxi/microui">https://github.com/rxi/microui</a></li>
                      <li><a target="_blank" href="https://github.com/idea4good/GuiLite">https://github.com/idea4good/GuiLite</a></li>
                    </ul>
                  </ul>
                <li>Android (not started) (android studio is going to kill my computer)</li>
                <li>Apple (not started) (unlikely to happen because you have to pay to be on appstore :( )</li>
              </ul>
            </ul>
          </div>
        <h3 id="done">Done</h3>
          <div style="margin-left: 1vw;">
            <ul>
              <li>C++ version</li>
                <ul>
                  <li>import</li>
                  <li>export</li>
                </ul>
              <li>Hotkeys/Keyboard navigation</li>
                <ul>
                  <li>e - expand folders if exist</li>
                  <li>r - toggle content</li>
                  <li>t - hide all content</li>
                  <li>y - show all content</li>
                  <li>s - toggle folder expand/collapse</li>
                  <li>d - collapse all folders</li>
                  <li>f - expand all folders</li>
                  <li>o - export notes</li>
                    <ul>
                      <li>export as JSON</li>
                      <li>cleaned up JSON with a replacer array</li>
                    </ul>
                  <li>Hotkeys only work in home page (checks router path)</li>
                  <li>Pressing e multiple times in succession won't add duplicates (added changing variable and a check for it)</li>
                  <li>m - disable/enable (toggle) mouse interaction (left, double, and right click) - useful if you want to right click a link or read your notes without hiding/showing a part of the structure</li>
                  <li>Selection is highlighted (colors are inverted)</li>
                  <li>ArrowUp and ArrowDown to move</li>
                  <li>z - toggle selection - when retoggled, selection focuses on root folder</li>
                  <li>Escape - leave modal window</li>
                  <li>Enter - same function as right click, shows content</li>
                  <li>n - same function as double click, creates new folder and retrieves any existing elements; if it's already a folder or a folder doesn't exist, create a new note</li>
                </ul>
              <li>Formatting</li>
                <ul>
                  <li>Markdown via Showdown</li>
                  <li>TeX via MathJax (vue-mathjax is garbage, wasted so many hours of my life, I highly recommend that you avoid it : D )</li>
                </ul>
              <li>Unobsfucated <a href="https://github.com/nifofin/nifo-src">github</a> version</li>
              <li>Profile page</li>
                <ul>
                  <li>General tab</li>
                  <li>Change admin password</li>
                  <li>Change view-only password</li>
                  <li>Appearance tab</li>
                  <li>Sidebar (for tabs) disappears on clickaway</li>
                </ul>
              <li>Permissions</li>
                <ul>
                  <li>Admin - full permissions</li>
                  <li>Editor - can only view and edit notes, can't change the password</li>
                  <li>View-only - can only view notes, can't change or edit anything</li>
                </ul>
              <li>Firestore DB - sync</li>
              <li>Modal window - add, edit, and delete notes</li>
                <ul>
                  <li>Fixed CSS - button padding</li>
                  <li>Clickaway - modal disappears on click outside of modal window</li>
                </ul>
              <li>Tree view</li>
                <ul>
                  <li>single click - toggle expand/unexpand child folders</li>
                  <li>double click - create/retrieve folder from db</li>
                  <li>right click - toggle content</li>
                  <li>Sorted alphabetically by name (rather than document id)</li>
                  <li>Link default class - grey-link - link color is no longer green</li>
                </ul>
              <li>Home/main page</li>
              <li>Login page</li>
                <ul>
                  <li>LocalStorage to save login details</li>
                    <ul>
                      <li>Reverifies on page load (in case people attempt editing localstorage)</li>
                      <li>Prevents login component from showing until finished verifying</li>
                      <li>Changed logout to a instead of router-link so that logout properly works with v-on:click</li>
                    </ul>
                </ul>
              <li>Documentation page</li>
                <ul>
                  <li>Scrollactive in sidebar navigation</li>
                </ul>
            </ul>
          </div>
      </div>

      <hr>

      <h2 id="misc">Misc</h2>
      <div style="margin-left: 1vw;">
        <h3 id="external">External Stuff</h3>
        <div style="margin-left: 1vw;">
          <ul>
            <li><a href="https://vuejs.org/">Vue.js</a> (and things from vue-cli)</li>
            <li><a href="https://firebase.google.com/">Firebase</a> (firestore db)</li>
            <li><a href="https://github.com/showdownjs/showdown">Showdown</a> (for markdown -> html)</li>
            <li><a href="https://github.com/eddiemf/vue-scrollactive">VueScrollactive</a> (for docs index highlighting)</li>
            <li><a href="https://github.com/simplesmiler/vue-clickaway">VueClickaway</a> (for sidebar hiding when clicking on another portion of the screen)</li>
            <li><a href="https://www.mathjax.org/">MathJax</a> (for rendering math stuff)</li>
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
