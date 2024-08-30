import { createApp } from 'vue';
import App from './App.vue';
import router from './router'; // Importez votre configuration de router

// Importez le fichier Tailwind CSS
import './assets/tailwind.css'; // Assurez-vous que ce fichier existe dans le dossier src/assets/

const app = createApp(App);

app.use(router);

app.mount('#app');
