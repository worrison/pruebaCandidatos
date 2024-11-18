import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { setupStore } from './stores';
import icons from './icons';

import '../src/style.css';

const app = createApp(App);
// Registra cada ícono como un componente global
Object.entries(icons).forEach(([name, component]) => {
    app.component(name, component);
  });

setupStore(app);
app.use(router);
app.mount('#app');
