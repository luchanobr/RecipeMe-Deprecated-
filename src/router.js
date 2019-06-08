import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import login from "./views/login.vue";
import registro from "./views/registro.vue";
import perfil from "./components/perfil";


Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("./views/About.vue")
    },
    {
      path: "/login",
      name: "login",
      component: login
    },
    {
      path: "/registro",
      name: "registro",
      component: registro
    },
    {
      path: "/allrecipes",
      name: "allrecipes",
      component: () => import("./views/recetas.vue")
    },
    {
      path: "/user/:usuario/",
      name: "perfil",
      component: perfil,
      props: true,
      meta: {
        requiresAuth: true
      },
      children: [
        {
          path: "newrecipe",
          name: "newrecipe",
          component: () => import("./components/crearReceta.vue"),
          props: true,
          meta: {
            requiresAuth: true
          }
        },
        {
          path: "myrecipes",
          name: "myrecipes",
          component: () => import("./components/misrecetas.vue"),
          props: true,
          meta: {
            requiresAuth: true
          }
        }
      ]
    }
  ]
});

