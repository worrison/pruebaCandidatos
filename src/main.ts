import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { setupStore } from './stores';

import '../src/style.css';

const app = createApp(App);

setupStore(app);
app.use(router);
app.mount('#app');
