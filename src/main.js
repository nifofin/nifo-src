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

router.beforeEach( (to, from, next) => {
  if (to.meta.auth && !store.state.user.loggedIn) {
    if (to.name == "profile" && !store.state.user.viewOnly) {
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
