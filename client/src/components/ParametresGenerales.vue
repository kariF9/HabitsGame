<template>
  <div class="settings-container">
    <h1>{{ $t('settings.generalTitle') }}</h1>
    <form @submit.prevent="saveSettings" class="settings-form">
      <div class="form-group">
        <label for="notifications">{{ $t('settings.notifications') }}</label>
        <select v-model="settings.notifications" id="notifications">
          <option value="enabled">{{ $t('settings.enabled') }}</option>
          <option value="disabled">{{ $t('settings.disabled') }}</option>
        </select>
      </div>

      <div class="form-group">
        <label for="theme">{{ $t('settings.theme') }}</label>
        <select v-model="settings.theme" id="theme">
          <option value="light">{{ $t('settings.light') }}</option>
          <option value="dark">{{ $t('settings.dark') }}</option>
        </select>
      </div>

      <div class="form-group">
        <label for="language">{{ $t('settings.language') }}</label>
        <select v-model="settings.language" id="language" @change="changeLanguage">
          <option value="fr">{{ $t('settings.french') }}</option>
          <option value="en">{{ $t('settings.english') }}</option>
          <option value="es">{{ $t('settings.spanish') }}</option>
        </select>
      </div>

      <button type="submit">{{ $t('settings.save') }}</button>
    </form>

    <div v-if="message" class="message" :class="messageClass">{{ message }}</div>
  </div>
</template>

<script>
import { reactive, ref } from 'vue';
import { Notyf } from 'notyf';
import { useI18n } from 'vue-i18n';

export default {
  name: 'ParametresGenerales',
  setup() {
    const { t, locale } = useI18n();
    const notyf = new Notyf();
    const settings = reactive({
      notifications: localStorage.getItem('userSettings')
        ? JSON.parse(localStorage.getItem('userSettings')).notifications
        : 'enabled',
      theme: localStorage.getItem('userSettings')
        ? JSON.parse(localStorage.getItem('userSettings')).theme
        : 'light',
      language: localStorage.getItem('userSettings')
        ? JSON.parse(localStorage.getItem('userSettings')).language
        : 'fr',
    });

    const message = ref('');
    const messageClass = ref('');

    function changeLanguage() {
      locale.value = settings.language;
      localStorage.setItem('userSettings', JSON.stringify(settings));
      message.value = t('settings.languageChangeSuccess');
      messageClass.value = 'success';
      notyf.success(message.value);
    }

    function saveSettings() {
      try {
        localStorage.setItem('userSettings', JSON.stringify(settings));
        document.body.className = settings.theme === 'dark' ? 'dark-theme' : 'light-theme';
        message.value = t('settings.saveSuccess');
        messageClass.value = 'success';
        notyf.success(message.value);

        // Activer/désactiver les notifications selon la préférence
        if (settings.notifications === 'enabled') {
          localStorage.setItem('notificationsEnabled', 'true');
        } else {
          localStorage.setItem('notificationsEnabled', 'false');
        }

        setTimeout(() => {
          window.location.reload();
        }, 500);
      } catch (error) {
        message.value = t('settings.saveError');
        messageClass.value = 'error';
        notyf.error(message.value);
      }
    }

    return {
      settings,
      message,
      messageClass,
      saveSettings,
      changeLanguage,
      t,
    };
  },
};
</script>

<style scoped>
.settings-container {
  max-width: 600px;
  margin: auto;
  padding: 40px;
  background-color: #f9f9f9;
  border-radius: 12px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease-in-out;
  opacity: 0;
  animation: fadeIn 0.5s forwards;
  margin-top: 50px;
}

@keyframes fadeIn {
  to {
    opacity: 1;
  }
}

h1 {
  text-align: center;
  margin-bottom: 30px;
  font-size: 2em;
  color: #333;
  animation: bounceIn 1s ease-out;
}

@keyframes bounceIn {
  0% {
    transform: scale(0.5);
    opacity: 0;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}

.settings-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.form-group {
  margin-bottom: 15px;
}

label {
  font-size: 1.2em;
  color: #333;
  transition: color 0.3s;
}

select {
  padding: 10px;
  font-size: 1.1em;
  border-radius: 8px;
  border: 1px solid #ccc;
  width: 100%;
  transition: all 0.3s ease;
}

select:focus {
  outline: none;
  border-color: #4caf50;
  background-color: #f0f8f0;
}

button {
  background-color: #4caf50;
  color: white;
  padding: 15px;
  border: none;
  border-radius: 8px;
  font-size: 1.2em;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.2s;
}

button:hover {
  background-color: #45a049;
  transform: scale(1.05);
}

button:active {
  transform: scale(0.98);
}

.message {
  margin-top: 20px;
  padding: 15px;
  text-align: center;
  border-radius: 8px;
  font-size: 1.1em;
  transition: opacity 0.3s ease;
}

.success {
  background-color: #4caf50;
  color: white;
}

.error {
  background-color: #f44336;
  color: white;
}
</style>
