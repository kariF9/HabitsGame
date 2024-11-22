import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import 'tailwindcss/tailwind.css';

import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faHome, faGamepad, faHeadset, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
library.add(faHome, faGamepad, faHeadset, faInfoCircle);

import { createI18n } from 'vue-i18n';
import messages from './i18n/messages';

const savedSettings = JSON.parse(localStorage.getItem('userSettings')) || {
  language: 'fr',
  theme: 'light',
  notifications: 'enabled',
};

const i18n = createI18n({
  locale: savedSettings.language,
  fallbackLocale: 'en',
  messages,
});

document.body.className = savedSettings.theme === 'dark' ? 'dark-theme' : 'light-theme';

const app = createApp(App);
app.component('font-awesome-icon', FontAwesomeIcon);
app.use(i18n);
app.use(router);

app.mount('#app');
