import { createI18n } from 'vue-i18n';
import messages from './messages.js';

const i18n = createI18n({
  locale: 'fr', // Langue par défaut
  messages,
});

export default i18n;

