import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { createPinia } from 'pinia';

import '@fortawesome/fontawesome-free/css/all.min.css';
import './assets/styles.css'; // Import global styles

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
app.use(router);
app.mount('#app');
