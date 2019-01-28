import Vue from "vue";
import VueRouter from "vue-router";
import Homepage from "./pages/Homepage.vue";
import About from "./pages/About.vue";
import Services from "./pages/Services.vue";
import Impressum from "./pages/Impressum.vue";

const routes = [
  {
    path: "/",
    component: Homepage
  },
  {
    path: "/ueber-mich",
    component: About
  },
  {
    path: "/leistungen",
    component: Services
  },
  {
    path: "/impressum",
    component: Impressum
  }
];

Vue.use(VueRouter);

export default new VueRouter({
  routes
});
