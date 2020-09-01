<template>
  <div v-if="showpls" class="login">
    <div v-if="error">
      <div class="error">{{errorMessage}}<button class="transparent-button right" @click="error = false">x</button></div>
    </div>

    <h1>Login</h1>

    <div>
      <input class="textInput border" type="text" name="username" placeholder="username" v-model="user.username" autocomplete="off" autofocus>
      <br>
      <input class="textInput border" type="password" name="password" placeholder="password" v-model="user.password" autocomplete="off">
      <br>
      <button @click="signIn" class="border login-button">Login</button>
    </div>


    <div style="margin-top: 10vh;" v-if="register">
      <h1>Register</h1>
      <input class="textInput border" type="text" name="username" placeholder="username" v-model="user2.username" autocomplete="off">
      <br>
      <input class="textInput border" type="text" name="password" placeholder="password" v-model="user2.password" autocomplete="off">
      <br>
      <button @click="registering" class="border login-button">Register</button>
    </div>
  </div>
</template>

<script>
import { db } from "../firestore";

export default {
  name: "login",
  data() {
    return {
      user: {
        username: "",
        password: "",
        loggedIn: true
      },
      user2: {
        username: "",
        password: "",
        loggedIn: true
      },
      error: false,
      errorMessage: "",
      register: false,
      showpls: true
    }
  },
  beforeMount() {
    var userss = window.localStorage.getItem("nifo_login");
    var passss = window.localStorage.getItem("nifo_login2");
    if (userss === null || passss === null) {
      // nothing happens
    }
    else {
      // try signing in
      this.showpls = false;
      this.user.username = userss;
      this.user.password = passss;
      this.signIn();
      //this.showpls = true;
    }
  },
  methods: {
    setStorage(username, password) {
      this.$router.push("/home");
      this.clearStorage();
      window.localStorage.setItem("nifo_login", username);
      window.localStorage.setItem("nifo_login2", password);
    },
    clearStorage() {
      window.localStorage.removeItem("nifo_login");
      window.localStorage.removeItem("nifo_login2");
    },
    registering() {
      var _self = this;

      // get ref to the user doc
      var docRef = db.collection("users").doc(this.user2.username);

      // get doc
      docRef.get().then(function(doc) {
        // has the user already been registered?
        // if not
        if (!doc.exists) {
          // set the username, password, editor password, and view password in firestore
          db.collection("users").doc(_self.user2.username).set({username: _self.user2.username,password: _self.user2.password,view: "", editor: _self.user2.password})
          .then(function() { console.log("Registered as: ", _self.user2.username); }).catch(function(error) { console.error("Error registering: ", error);});

          // update in store
          _self.$store.commit("updateDetails", _self.user2);
          console.log("Updated details in the store");

          // add root folder
          db.collection("users").doc(_self.$store.state.user.username).collection("dataTree").doc("userNotes").collection("depth0").doc("123").set({name: _self.$store.state.user.username, content: "Root folder\nSingle click to toggle folders\nDouble click to create a new folder or retrieve it from the DB\nRight click to view content", id: "123", depth: "0", parent: "none"});

          // localstorage for login persistence
          this.setStorage(_self.user2.username, _self.user2.password);
        }
        // otherwise you can't register
        else {
          // Error message
          console.log("Error: User already exists. ");
          _self.error = true; _self.errorMessage = "Error: User already exists";
        }
      });
    },
    signIn() {
      var _self = this;

      // did you actually enter a username?
      // if yes
      if (this.user.username != "") {
        // ref to the user doc
        var docRef = db.collection("users").doc(this.user.username);

        // get the ref
        docRef.get().then(function(doc) {

          // has the user already been registered?
          if (doc.exists) {
            //admin
            if (doc.data().password == _self.user.password ) {
              // yo you're in
              // update store
              _self.$store.commit("updateDetails", _self.user);
              console.log("Updated details in the store");

              // localstorage for login persistence
              _self.setStorage(_self.user.username, _self.user.password);

              // cleanup
              _self.showpls = true;
              _self.user.username = null;
              _self.user.password = null;
            }

            // edit
            else if (doc.data().editor == _self.user.password) {
              // update store
              _self.$store.commit("updateDetails", _self.user);
              _self.$store.commit("toggleEditOnly")
              console.log("Updated details in the store; you have permissions: editor");

              // localstorage for login persistence
              _self.setStorage(_self.user.username, _self.user.password);

              // cleanup
              _self.showpls = true;
              _self.user.username = null;
              _self.user.password = null;
            }

            //view-only
            else if (doc.data().view == _self.user.password) {
              // update store
              _self.$store.commit("updateDetails", _self.user);
              _self.$store.commit("toggleViewOnly");
              console.log("Updated details in the store; you have permissions: viewOnly");

              // localstorage for login persistence
              _self.setStorage(_self.user.username, _self.user.password);

              // cleanup
              _self.showpls = true;
              _self.user.username = null;
              _self.user.password = null;
            }

            // if the password doesn't match anything
            else {
              console.log("Wrong password n0b");
              _self.error = true; _self.errorMessage = "Error: Wrong password";

              // cleanup
              _self.showpls = true;
            }
          }

          // if the user hasn't been registered yet // it doesn't exist
          else {
            console.log("This account doesn't even exist n0b");
            _self.register = true;
            _self.user.username = "";
            _self.user.password = "";
            _self.showpls = true;
          }
        })
      }

      // if the username field was left blank
      else {
        console.log("n0b you need to actually enter stuff to login");
      }
    }
  }
}

</script>

<style scoped>
@import "../assets/styles/variables.css";

/* error */
.error {
  border-radius: 3px;
  background-color: var(--light-red);
  margin: 0 15vw;
  padding: 10px 15px;
}

/* input */
.login-button {
  margin: 10px 0 0 0;
  padding: 5px 10px;
  background-color: rgba(200, 200, 200, 0.3);
}
.login-button:hover {
  color: var(--text-accent);
  border-color: var(--text-accent);
  background-color: rgba(200, 200, 200, 0.2);
}
</style>
