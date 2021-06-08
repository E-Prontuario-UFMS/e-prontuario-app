import Vue from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import router from "./router";
import "./registerServiceWorker";
import "es6-promise/auto";
import store from "./store";
import Axios from "axios";
import VueDateFns from "vue-date-fns";
import * as Sentry from "@sentry/vue";
import { Integrations } from "@sentry/tracing";

import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

Vue.$http = new Axios.create({
  baseURL: "http://localhost:8080/eprontuario-api",
});

Object.defineProperty(Vue.prototype, "$http", {
  get() {
    return Axios;
  },
});

Axios.interceptors.request.use(
  function(config) {
    const token = store.state.login.token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  function(err) {
    window.location.href = "/login";
    return Promise.reject(err);
  },
);

Vue.config.productionTip = false;
Vue.use(VueDateFns);

Sentry.init({
  Vue,
  dsn: process.env.VUE_APP_SENTY_TOKEN,
  integrations: [new Integrations.BrowserTracing()],
  tracesSampleRate: 1.0,
});

new Vue({
  vuetify,
  router,
  store,
  render: h => h(App),
}).$mount("#app");
