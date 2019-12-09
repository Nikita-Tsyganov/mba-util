import Vue from "vue";
import App from "./App.vue";
import BootstrapVue from "bootstrap-vue";
Vue.use(BootstrapVue);
import "./main.scss";
import { Plugin } from "vue-fragment";
Vue.use(Plugin);

Vue.config.productionTip = false;

new Vue({
  render: h => h(App)
}).$mount("#app");
