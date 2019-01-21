import App from "./App.vue";
import LandingPage from "./components/marketing/LandingPage";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import About from "./components/marketing/About";
import TestRouteVariables from "./components/marketing/TestRouteVariables";

const routes = [
  {
    path: "/",
    name: "home",
    component: LandingPage
  },
  {
    path: "/todo",
    name: "todo",
    component: App
  },
  {
    path: "/login",
    name: "login",
    component: Login
  },
  { path: "/register", name: "register", component: Register },
  { path: "/about", name: "about", component: About },
  {
    path: "/todos/:id",
    name: "todos",
    component: TestRouteVariables
  }
];

export default routes;
