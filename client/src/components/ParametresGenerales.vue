<template>
  <div class="settings">
    <h1>Paramètres générales</h1>

    <form @submit.prevent="saveSettings" class="settings-form">
      <div class="form-group">
        <label for="notifications">Notifications</label>
        <select v-model="settings.notifications" id="notifications">
          <option value="enabled">Activées</option>
          <option value="disabled">Désactivées</option>
        </select>
      </div>

      <div class="form-group">
        <label for="theme">Thème</label>
        <select v-model="settings.theme" id="theme">
          <option value="light">Clair</option>
          <option value="dark">Sombre</option>
        </select>
      </div>

      <div class="form-group">
        <label for="language">Langue</label>
        <select v-model="settings.language" id="language">
          <option value="fr">Français</option>
          <option value="en">Anglais</option>
          <option value="es">Espagnol</option>
        </select>
      </div>

      <div class="form-group">
        <label for="privacy">Confidentialité</label>
        <select v-model="settings.privacy" id="privacy">
          <option value="public">Public</option>
          <option value="private">Privé</option>
        </select>
      </div>

      <button type="button" @click="confirmAccountDeletion">Supprimer le compte</button>

      <button type="submit">Enregistrer les modifications</button>
    </form>

    <div v-if="message" class="message">{{ message }}</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      settings: {
        notifications: 'enabled',
        theme: 'light',
        language: 'fr',
        privacy: 'public'
      },
      message: ''
    };
  },
  methods: {
    saveSettings() {
      // Sauvegarde les paramètres dans localStorage
      localStorage.setItem('userSettings', JSON.stringify(this.settings));
      this.message = 'Paramètres enregistrés avec succès !';
    },
    confirmAccountDeletion() {
      const confirmDelete = confirm('Êtes-vous sûr de vouloir supprimer votre compte ? Cette action est irréversible.');
      if (confirmDelete) {
        // Logique pour supprimer le compte de l'utilisateur
        localStorage.removeItem('userProfile');
        localStorage.removeItem('userSettings');
        alert('Votre compte a été supprimé avec succès.');
        // Rediriger ou faire d'autres actions si nécessaire
      }
    }
  },
  mounted() {
    // Charger les paramètres depuis localStorage s'ils existent
    const savedSettings = localStorage.getItem('userSettings');
    if (savedSettings) {
      this.settings = JSON.parse(savedSettings);
    }
  }
};
</script>

<style scoped>
.settings {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin-top: 100px;
}

h1 {
  text-align: center;
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 20px;
}

label {
  display: block;
  margin-bottom: 5px;
}

input, select {
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
}

button {
  display: block;
  width: 100%;
  padding: 10px;
  background-color: black;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #218838;
}

.message {
  margin-top: 20px;
  text-align: center;
  color: green;
}
</style>

