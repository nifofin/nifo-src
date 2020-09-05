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
    },
    currentSelected: "children[0]", // children[0].children[0]
    children: [],
    lastKeyDown: null,
    useModal: false
  },
  modules: {
  },
  mutations: {
    changeUseModal(state, data) {
      state.useModal = data;
    },
    updateCurrentSelected(state, data) {
      state.currentSelected = data;
    },
    updateKeyDown(state, data) {
      state.lastKeyDown = data;
    },
    uploadTreeData(state, data) {
      state.children = data;
    },
    changeSelected(state, payload) {
      var cur = state.currentSelected;
      if (cur != "") {

        console.log("The current selected is", cur);

        var st = cur.lastIndexOf("["); var en = cur.lastIndexOf("]"); var diff = en - st - 1;
        if (payload.direction == "up") {
          // go to parent

          console.log("going up");

          if (cur.substr(st+1, diff) == "0") {

            console.log("going to parent");

            var sta = cur.lastIndexOf(".");
            if (sta != -1) {
              state.currentSelected = cur.substr(0, sta);
            }
            console.log("the current state now is: ", state.currentSelected);
          }
          // go up one
          else {

            console.log("going up one");

            var ct = parseInt(cur.substr(st+1, diff), 10);
            state.currentSelected = cur.substr(0, st) + "[" + (ct - 1) + "]";

            console.log("the current state now is: ", state.currentSelected);
          }
        }
        else if (payload.direction == "down") {

          console.log("going down");

          // if you can go deeper
          if (payload.showing && payload.folder) {

            console.log("going deeper");

            if ("children" in eval("state." + cur)) {
              if (eval("state."+cur+".children.length") > 0) {
                state.currentSelected = cur + ".children[0]";
              }
            }
            console.log("the current state now is: ", state.currentSelected);
          }

          // we can't go deeper so we go forwards
          else if (cur.substr(st+1, diff) < eval("state." + cur.substr(0, st) + ".length") - 1) {

            console.log("going to the next thing");

            //var curt = cur.substr(0, cur.lastIndexOf("."));
            var asd = parseInt(cur.substr(cur.lastIndexOf("[") + 1, cur.lastIndexOf("]") - cur.lastIndexOf("[") - 1)) + 1;
            // add some recursion sometime pls
            // if there is still something in the folder
            //if (asd < eval("state." + cur.substr(0, cur.lastIndexOf("[")) + ".length")) {
              state.currentSelected = cur.substr(0, cur.lastIndexOf("[")) + "[" + asd + "]";
            //}
          }
            // otherwise we gotta go higher
            else {
              console.log("going up");
              var curt = cur.substr(0, cur.lastIndexOf("."));
              while (state.currentSelected == cur && curt != "") {
                // acurt is the start of a substr, ecurt is the length
                var acurt = curt.lastIndexOf("["); var ecurt = curt.lastIndexOf("]") - acurt - 1;
                // if we can continue here
                var asdf = parseInt(curt.substr(acurt+1, ecurt)) + 1;
                if (asdf < eval("state." + curt.substr(0, acurt) + ".length")) {
                  state.currentSelected = curt.substr(0, acurt) + "[" + asdf + "]";
                }
                else {
                  // if it was children[0].children[0].children[0], now it's children[0].children[0]
                  curt = curt.substr(0, curt.lastIndexOf("."));
                }
              }
            }
        }
      }
    },
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
