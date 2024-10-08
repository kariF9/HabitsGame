import { createApp } from 'vue';
import App from './App.vue';
import router from './router'; // Importez votre configuration de router
import 'tailwindcss/tailwind.css'; // Ajoutez cette ligne pour importer Tailwind CSS

const app = createApp(App);

app.use(router);

app.mount('#app');
