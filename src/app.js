import Vue from "vue";
import App from "./App.vue";
import router from "./routes";

import "material-design-icons/iconfont/material-icons.css";

new Vue({
  el: "#app",
  router,
  render: h => h(App)
});
