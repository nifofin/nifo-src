import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

// I'm using the vuex store because it lets me store and access some things globally, which is really convenient
const store = new Vuex.Store({
  state: {
    user: {
      username: "",
      password: "",
      // I could probably just make one variable called logState that's a string, but who cares ;)
      loggedIn: false,
      viewOnly: false,
      editOnly: false
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
      state.user.editOnly = false;
    },
    toggleViewOnly(state) {
      state.user.viewOnly = !state.user.viewOnly;
    },
    toggleEditOnly(state) {
      state.user.editOnly = !state.user.editOnly;
    }
  },
  actions: {},
});

export default store;
