import { createApp } from 'vue';
import App from './App.vue';
import router from './router'; // Importez votre configuration de router


const app = createApp(App);

app.use(router);


app.mount('#app');
