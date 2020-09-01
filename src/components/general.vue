<template>
  <div class="main">
    <h1>General Settings</h1>
    <div class="passwords">
      <h2>Change Passwords</h2>
      <div class="adminPass">
        <h3>Change Admin Password</h3>
        <div style="margin: 1vh 1vw;">
          <input type="text" name="oldPassword" placeholder="old password" v-model="passwords.oldPass" autocomplete="off">
          <br>
          <input type="text" name="newPassword" placeholder="new password" v-model="passwords.newPass" autocomplete="off">
          <br>
          <button class="changePassButton" @click="APass = true">Change Admin Password</button>
        </div>
      </div>
      <div class="editPass">
        <h3>Change Editor Password</h3>
        <div style="margin: 1vh 1vw;">
          <input type="text" name="oldEPassword" placeholder="old password" v-model="passwords.oldEPass" autocomplete="off">
          <br>
          <input type="text" name="newEPassword" placeholder="new password" v-model="passwords.newEPass" autocomplete="off">
          <br>
          <button class="changePassButton" @click="EPass = true">Change Editor Password</button>
        </div>
      </div>
      <div class="viewPass">
        <h3>Change View Password</h3>
        <div style="margin: 1vh 1vw;">
          <input type="text" name="oldVPassword" placeholder="old password" v-model="passwords.oldVPass" autocomplete="off">
          <br>
          <input type="text" name="newVPassword" placeholder="new password" v-model="passwords.newVPass" autocomplete="off">
          <br>
          <button class="changePassButton" @click="VPass = true">Change View Password</button>
        </div>
      </div>
    </div>
    <!-- modals now yay -->
    <modal v-if="APass" @close="APass = false">
      <h3 slot="header">Confirm admin password change</h3>
      <div slot="body">
        Change the old password, <b>{{passwords.oldPass}}</b>, to the new password, <b>{{passwords.newPass}}</b>?
      </div>
      <div slot="footer">
        <button @click="APass = false" style="border: none; background-color: transparent; outline: none; float: right; padding: 5px 10px; cursor: pointer;">Cancel</button>
        <button @click="changeAPass" style="float: right; border: none; color: white; background-color: #42b983; text-align: center; padding: 5px 10px; cursor: pointer; border-radius: 2px;">Change</button>
      </div>
    </modal>

    <modal v-if="EPass" @close="EPass = false">
      <h3 slot="header">Confirm editor password change</h3>
      <div slot="body">
        Change the old password, <b>{{passwords.oldEPass}}</b>, to the new password, <b>{{passwords.newEPass}}</b>?
      </div>
      <div slot="footer">
        <button @click="EPass = false" style="border: none; background-color: transparent; outline: none; float: right; padding: 5px 10px; cursor: pointer;">Cancel</button>
        <button @click="changeEPass" style="float: right; border: none; color: white; background-color: #42b983; text-align: center; padding: 5px 10px; cursor: pointer; border-radius: 2px;">Change</button>
      </div>
    </modal>

    <modal v-if="VPass" @close="VPass = false">
      <h3 slot="header">Confirm view password change</h3>
      <div slot="body">
        Change the old password, <b>{{passwords.oldVPass}}</b> to the new password, <b>{{passwords.newVPass}}</b>?
      </div>
      <div slot="footer">
        <button @click="VPass = false" style="border: none; background-color: transparent; outline: none; float: right; padding: 5px 10px; cursor: pointer;">Cancel</button>
        <button @click="changeVPass" style="float: right; border: none; color: white; background-color: #42b983; text-align: center; padding: 5px 10px; cursor: pointer; border-radius: 2px;">Change</button>
      </div>
    </modal>

  </div>
</template>

<script>
import Modal from "../components/modal.vue";
import {db} from "../firestore.js";
export default {
  name: "general",
  data() {
    return {
      passwords: {
        oldPass: "",
        newPass: "",
        oldEPass: "",
        newEPass: "",
        oldVPass: "",
        newVPass: ""
      },
      APass: false,
      EPass: false,
      VPass: false
    }
  },
  methods: {
    changeAPass() {
      var _self = this;
      db.collection("users").doc(this.$store.state.user.username).get().then(function(doc) {
        if (doc.data().password == _self.passwords.oldPass) {
          db.collection("users").doc(_self.$store.state.user.username).update({ password: _self.passwords.newPass });
          console.log("Successfully changed the admin password");
        }
        else {
          // u entered the wrong password lmao
          console.log("You entered the wrong admin password");
        }
        _self.APass = false;
        _self.passwords.oldPass = ""; _self.passwords.newPass = "";
      })
    },
    changeEPass() {
      var _self = this;
      db.collection("users").doc(this.$store.state.user.username).get().then(function(doc) {
        if (doc.data().editor == _self.passwords.oldEPass) {
          db.collection("users").doc(_self.$store.state.user.username).update({editor: _self.passwords.newEPass});
          console.log("Successfully changed the editor password");
        }
      })
    },
    changeVPass() {
      var _self = this;
      db.collection("users").doc(this.$store.state.user.username).get().then(function(doc) {
        if (doc.data().view == _self.passwords.oldVPass) {
          db.collection("users").doc(_self.$store.state.user.username).update({ view: _self.passwords.newVPass });
          console.log("Successfully changed the view password");
        }
        else {
          // u entered the wrong view passowrd n0b
          console.log("You entered the wrong view password");
        }
        _self.VPass = false;
        _self.passwords.oldVPass = ""; _self.passwords.newVPass = "";
      })
    }
  },
  components: {
    Modal
  }
}
</script>

<style scoped>
@import "../assets/styles/variables.css";

.passwords {
  margin-left: 1vw;
  margin-bottom: 10vh;
}

.adminPass {
  display: inline-block;
  width: 40vw;
}

.editPass {
  display: block;
  width: 40vw;
}

.viewPass {
  display: inline-block;
  width: 40vw;
}

.changePassButton {
  margin-top: 2vh;
  border: var(--dark-red) 1.5px solid;
  border-radius: 2px;
  padding: 5px 10px;
  background-color: var(--light-red);
  color: var(--dark-red);
  cursor: pointer;
  outline: none;
}

.changePassButton:hover {
  background-color: rgba(255, 204, 203, 0.8);
}

input[type=text] {
  margin: 5px 0;
  padding: 5px 10px;
}

.main {
  text-align: left;
  padding-left: 10vw;
}

</style>
