import Vue from "vue";
import VueRouter from "vue-router";
import Auth from "@/packages/auth";
import Login from "../views/Login.vue";
import Home from "../views/Home.vue";
import Dashboard from "../views/Home/Dashboard.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "login",
    component: Login,
    meta: { requiresAuth: false },
    beforeEnter: (to, from, next) => {
      if (Auth.isAuthenticated()) {
        next({
          name: "home.dashboard"
        });
      } else {
        next();
      }
    }
  },
  {
    path: "/home",
    component: Home,
    meta: { requiresAuth: true },
    children: [
      {
        path: "/",
        name: "home.dashboard",
        component: Dashboard,
        meta: { requiresAuth: true }
      }
    ]
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!Auth.isAuthenticated()) {
      next({
        name: "login"
      });
    } else {
      next(); // make sure to always call next()!
    }
  } else {
    next(); // make sure to always call next()!
  }
});

export default router;
