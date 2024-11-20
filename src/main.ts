import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { createPinia } from "pinia";
import icons from "./icons";

import "../src/style.css";

const app = createApp(App);
// Registra cada ícono como un componente global
Object.entries(icons).forEach(([name, component]) => {
  app.component(name, component);
});

const pinia = createPinia();
app.use(pinia);
app.use(router);
app.mount("#app");
