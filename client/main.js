import Vue from "vue";
import App from "./App.vue";

import "./assets/style/global.styl";
import "./assets/style/style.sass";

new Vue({
  el: "#app",
  render: h => h(App)
});
