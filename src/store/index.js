import Vue from "vue";
import Vuex from "vuex";
//import VuexEasyFirestore from "vuex-easy-firestore";
// import { firebase } from "../firestore.js";

Vue.use(Vuex);

//const easyFirestore = VuexEasyFirestore([notes], {
//  logging: true, FirebaseDependency: Firebase })

const store = new Vuex.Store({
  state: {
    user: {
      username: "",
      password: "",
      loggedIn: false,
      viewOnly: false
    }
  },
  //plugins: [easyFirestore],
  modules: {
  },
  mutations: {
    updateDetails (state, details) {
      state.user.username = details.username;
      state.user.password = details.password;
      state.user.loggedIn = details.loggedIn;
    },
    clearDetails (state) {
      state.user.username = "";
      state.user.password = "";
      state.user.loggedIn = false;
      state.user.viewOnly = false;
    },
    toggleViewOnly(state) {
      state.user.viewOnly = !state.user.viewOnly;
    }
  },
  actions: {},
});

//initFirebase().catch(error => {
  // take user to a page stating an error occurred
  // (might be a connection error, or the app is open in another tab)
//  console.error(error);
//});

export default store;
