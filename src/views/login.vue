<template>
  <div v-if="showpls" class="login">
    <div v-if="passNoMatchError">
      <div style="border-radius: 3px; background-color: #ffcccb; margin-left: 15vw; margin-right: 15vw; padding: 10px 15px;">
        Error: Password and username don't match
        <button style="float: right; border: none; background-color: transparent;" @click="passNoMatchError = false">x</button>
      </div>
    </div>
    <h1>Login</h1>
    <div>
      <input class="asdf" type="text" name="username" placeholder="username" v-model="user.username" autocomplete="off" autofocus>
      <br>
      <input type="password" class="asdf" name="password" placeholder="password" v-model="user.password" autocomplete="off">
      <br>
      <button @click="signIn" class="login-button">Login</button>
    </div>
    <div style="margin-top: 10vh;" v-if="register">
      <input class="asdf" type="text" name="username" placeholder="username" v-model="user2.username" autocomplete="off" autofocus>
      <br>
      <input type="text" class="asdf" name="password" placeholder="password" v-model="user2.password" autocomplete="off">
      <br>
      <button @click="registering" style="background-color: rgba(66, 185, 131, 0.2);" class="login-button">Register</button>
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
      passNoMatchError: false,
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
    registering() {
      var _self = this;
      var docRef = db.collection("users").doc(this.user.username);
      docRef.get().then(function(doc) {
        if (!doc.exists) {
          db.collection("users").doc(_self.user2.username).set({username: _self.user2.username,password: _self.user2.password,view: "", editor: _self.user2.password})
          .then(function() { console.log("Registered as: ", _self.user2.username); }).catch(function(error) { console.error("Error registering: ", error);});
          _self.$store.commit("updateDetails", _self.user2);
          console.log("Updated details in the store");
          db.collection("users").doc(_self.$store.state.user.username).collection("dataTree").doc("userNotes").collection("depth0").doc("123").set({name: _self.$store.state.user.username, content: "Root folder\nSingle click to toggle folders\nDouble click to create a new folder or retrieve it from the DB\nRight click to view content", id: "123", depth: "0", parent: "none"});
          _self.$router.push("/home");
          window.localStorage.removeItem("nifo_login");
          window.localStorage.removeItem("nifo_login2");
          window.localStorage.setItem("nifo_login", _self.user2.username);
          window.localStorage.setItem("nifo_login2", _self.user2.password);
        }
        else {
          console.log("Error: User already exists. ");
        }
      });
    },
    signIn() {
      var pass = this.user.password;
      var _self = this;
      if (this.user.username != "") {
        var docRef = db.collection("users").doc(this.user.username);
        docRef.get().then(function(doc) {
          if (doc.exists) {
            //admin
            if (doc.data().password == pass ) {
              // yo you're in
              _self.$store.commit("updateDetails", _self.user);
              console.log("Updated details in the store");
              _self.$router.push("/home");
              // set to localstorage
              window.localStorage.setItem("nifo_login", _self.user.username);
              window.localStorage.setItem("nifo_login2", _self.user.password);
              _self.showpls = true;
              _self.user.username = null;
              _self.user.password = null;
            }
            // edit
            else if (doc.data().editor == pass) {
              _self.$store.commit("updateDetails", _self.user);
              _self.$store.commit("toggleEditOnly")
              console.log("Updated details in the store; you have permissions: editor");
              _self.$router.push("/home");
              //localstorage and cleaning up
              window.localStorage.setItem("nifo_login", _self.user.username);
              window.localStorage.setItem("nifo_login2", _self.user.password);
              _self.showpls = true;
              _self.user.username = null;
              _self.user.password = null;
            }
            //view-only
            else if (doc.data().view == pass) {
              // you only have view perms n0b
              _self.$store.commit("updateDetails", _self.user);
              _self.$store.commit("toggleViewOnly");
              console.log("Updated details in the store; you have permissions: viewOnly");
              _self.$router.push("/home");
              // set to localstorage
              window.localStorage.setItem("nifo_login", _self.user.username);
              window.localStorage.setItem("nifo_login2", _self.user.password);
              _self.showpls = true;
              _self.user.username = null;
              _self.user.password = null;
            }
            // nothing
            else {
              console.log("Wrong password n0b");
              _self.passNoMatchError = true;
              _self.showpls = true;
            }
          }
          else {
            console.log("This account doesn't even exist n0b");
            _self.register = true;
            _self.user.username = "";
            _self.user.password = "";
            _self.showpls = true;
          }
        })
      }
      else {
        console.log("n0b you need to actually enter stuff to login");
      }
    }
  }
}

</script>

<style scoped>
@import "../assets/styles/variables.css";

.asdf {
  /*vertical | horizontal*/
  margin: 5px 0;
  padding: 5px 10px;
  border: var(--dark) 1.5px solid;
  border-radius: 2px;
}

.asdf:focus {
  border: var(--dark) 2px solid;
  border-radius: 2px;
}

.login-button {
  border: var(--dark) 1.25px solid;
  border-radius: 2px;
  margin-top: 10px;
  padding: 5px 10px;
  cursor: pointer;
  background-color: rgba(200, 200, 200, 0.3);
}

.login-button:hover {
  border: var(--light) 1.25px solid;
  border-radius: 2px;
  color: var(--light);
  background-color: rgba(200, 200, 200, 0.2);
}

.login-button:focus {
  border: var(--dark) 2px solid;
  border-radius: 2px;
}

</style>
