import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import VeeValidate from "vee-validate";
import { firestorePlugin } from "vuefire";
import firebase from "firebase";

Vue.use(firestorePlugin);
Vue.use(VeeValidate, {
  classes: true,
  classNames: {
    valid: "is-valid",
    invalid: "is-invalid"
  },
  events: "change|blur"
});

Vue.config.productionTip = false;
router.beforeEach((to, from, next) => {
  let currentUser = firebase.auth().currentUser;
  let requiresAuth = to.matched.some(record => record.meta.requiresAuth);

  if (requiresAuth && !currentUser) next("/login");
  //else if (!requiresAuth && currentUser) next('comics')
  else next();
});

new Vue({
  router,
  //  store,
  render: h => h(App)
}).$mount("#app");
