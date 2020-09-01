import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
//import VueFire from "vuefire";
import "./firestore";


import VueScrollactive from "vue-scrollactive";

Vue.use(VueScrollactive);

//Vue.use(VueFire);

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

router.beforeEach( (to, from, next) => {
  if (to.meta.auth && !store.state.user.loggedIn) {
    if (to.name == "profile" && !store.state.user.viewOnly && !store.state.user.editOnly) {
      next("/profile");
    }
    else {
    next("/login");
    }
  }
  else {
    next();
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
