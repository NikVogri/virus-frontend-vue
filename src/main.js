import Vue from "vue";
import App from "./App.vue";
import axios from "axios";

import methodsMixin from "./mixins/methodsMixin";

const configuredAxios = axios.create({
  baseURL: "https://virus-api-updated.herokuapp.com/api/v2",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

Vue.prototype.$http = configuredAxios;

Vue.config.productionTip = false;

Vue.mixin(methodsMixin);
new Vue({
  render: (h) => h(App),
}).$mount("#app");
