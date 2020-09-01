import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./firestore";
import VueScrollactive from "vue-scrollactive";

Vue.use(VueScrollactive);


Vue.config.productionTip = false;

/*

import * as admin from "firebase-admin";

var serviceAccount = require("./nifo-2d10e-firebase-adminsdk-ggcu5-de907eb66d.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://nifo-2d10e.firebaseio.com"
});


// start import functions :D
function isCollection(data, path, depth) {
  if (typeof data != 'object' || data == null || data.length === 0 || isEmpty(data)) { return false; }

  for (const key in data) {
    if (typeof data[key] != 'object' || data[key] == null) {
      // If there is at least one non-object item in the data then it cannot be collection.
      return false;
    }
  }

  return true;
}

// Checks if object is empty.
function isEmpty(obj) {
  for(const key in obj) {
    if(obj.hasOwnProperty(key)) { return false; }
  }
  return true;
}

async function upload(data, path) {
  return await admin.firestore()
    .doc(path.join('/'))
    .set(data)
    .then(() => console.log(`Document ${path.join('/')} uploaded.`))
    .catch(() => console.error(`Could not write document ${path.join('/')}.`));
}

async function resolve(data, path = []) {
  if (path.length > 0 && path.length % 2 == 0) {
    // Document's length of path is always even, however, one of keys can actually be a collection.

    // Copy an object.
    const documentData = Object.assign({}, data);

    for (const key in data) {
      // Resolve each collection and remove it from document data.
      if (isCollection(data[key], [...path, key])) {
        // Remove a collection from the document data.
        delete documentData[key];
        // Resolve a colleciton.
        resolve(data[key], [...path, key]);
      }
    }

    // If document is empty then it means it only consisted of collections.
    if (!isEmpty(documentData)) {
      // Upload a document free of collections.
      await upload(documentData, path);
    }
  } else {
    // Collection's length of is always odd.
    for (const key in data) {
      // Resolve each collection.
      await resolve(data[key], [...path, key]);
    }
  }
}

window.addEventListener("keydown", (e) => {
  if (e.key == "i") {
    // import
    resolve(data, ["users", store.state.user.username, "dataTree", "userNotes"])
  }
})
*/


// Uses the Vue router: https://router.vuejs.org/guide/
// and the Vuex store: https://vuex.vuejs.org/guide/
// More specifically, this section: https://router.vuejs.org/guide/advanced/meta.html
// Basically it just redirects you if you don't have permission to enter a page
router.beforeEach( (to, from, next) => {
  // meta.auth is what we set in /src/router/index.js
  // store.state.user.loggedIn is in /src/router/index.js - check the const store variable
  if (to.meta.auth && !store.state.user.loggedIn) {
    // if the router is trying to redirect you to /profile, and if you have admin perms (or only viewOnly / editOnly perms)
    if (to.name == "profile" && !store.state.user.viewOnly && !store.state.user.editOnly) {
      // if you have admin perms, go ahead
      next("/profile");
    }
    // otherwise, go to the login page :(
    else {
      next("/login");
    }
  }
  // else, if you're not trying to go to a protected route, go ahead to wherever you want to go
  else {
    next();
  }
})

// create a new Vue instance
// some reference: https://vuejs.org/v2/guide/instance.html
// https://forum.vuejs.org/t/what-does-render-h-h-app-mean/53313/2
// https://vuejs.org/v2/guide/render-function.html
// look at App.vue next 
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
