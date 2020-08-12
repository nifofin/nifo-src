import Vue from "vue";
import VueRouter from "vue-router";
import aboutComponent from "../views/about.vue";
import loginComponent from "../views/login.vue";
import homeComponent from "../views/home.vue";
import profileComponent from "../views/profile.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "about",
    component: aboutComponent
  },
  {
    path: "/login",
    name: "login",
    component: loginComponent
  },
  {
    path: "/home",
    name: "home",
    component: homeComponent,
    meta: {
      auth: true
    }
  },
  {
    path: "/profile",
    name: "profile",
    component: profileComponent,
    meta: {
      auth: true
    }
  },
  {
    path: "*",
    component: aboutComponent
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
