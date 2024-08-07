import './assets/main.css';
import 'primeicons/primeicons.css';
import Toast from 'vue-toastification';
import 'vue-toastification/dist/index.css';
import router from './router';
import store from './store';

import { createApp } from 'vue';
import App from './App.vue';

const app = createApp(App);

app.use(store);
app.use(router);
app.use(Toast);

app.mount('#app');
