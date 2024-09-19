<template>
  <div class="profile-edit">
    <h1>Modifier le profil</h1>

    <form @submit.prevent="saveProfile" class="profile-form">
      <div class="form-group">
        <label for="avatar" class="avatar-label">Avatar</label>
        <div class="avatar-section">
          <img :src="avatarPreview" alt="Aperçu de l'avatar" class="avatar-preview" />
          <button type="button" @click="triggerFileInput" class="change-avatar-btn">Changer l'avatar</button>
          <input type="file" ref="fileInput" @change="handleFileUpload" class="hidden-input" />
        </div>
      </div>

      <div class="form-group">
        <label for="sex">Sexe</label>
        <select v-model="profile.sex" id="sex">
          <option value="homme">Homme</option>
          <option value="femme">Femme</option>
        </select>
      </div>

      <div class="form-group">
        <label for="age">Âge</label>
        <input type="number" v-model="profile.age" id="age" required />
      </div>

      <div class="form-group">
        <label for="height">Taille (cm)</label>
        <input type="number" v-model="profile.height" id="height" required />
      </div>

      <div class="form-group">
        <label for="weight">Poids (kg)</label>
        <input type="number" v-model="profile.weight" id="weight" required />
      </div>

      <div class="form-group">
        <label for="dietaryRestrictions">Restrictions alimentaires</label>
        <input type="text" v-model="profile.dietaryRestrictions" id="dietaryRestrictions" />
      </div>

      <button type="submit">Enregistrer les modifications</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      profile: {
        avatarUrl: null,
        sex: 'homme',
        age: null,
        height: null,
        weight: null,
        dietaryRestrictions: '',
      },
      avatarPreview: '/path/to/default-avatar.png',
    };
  },
  methods: {
    triggerFileInput() {
      // Déclenche le clic sur l'input de fichier caché
      this.$refs.fileInput.click();
    },
    handleFileUpload(event) {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.profile.avatarUrl = e.target.result; // Stocker l'URL de l'image dans l'objet profile
          this.avatarPreview = e.target.result; // Mettre à jour l'aperçu
        };
        reader.readAsDataURL(file); // Convertir l'image en Data URL
      }
    },
    saveProfile() {
      // Sauvegarder dans localStorage
      localStorage.setItem('userProfile', JSON.stringify(this.profile));

      // Déclencher un événement personnalisé pour signaler la mise à jour de l'avatar
      window.dispatchEvent(new Event('avatar-updated'));

      alert('Profil mis à jour avec succès !');
    },
  },
  mounted() {
    // Charger les données du profil depuis localStorage s'il y en a
    const savedProfile = localStorage.getItem('userProfile');
    if (savedProfile) {
      this.profile = JSON.parse(savedProfile);
      if (this.profile.avatarUrl) {
        this.avatarPreview = this.profile.avatarUrl;
      }
    }
  },
};
</script>

<style scoped>
.profile-edit {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

h1 {
  text-align: center;
  margin-bottom: 20px;
  font-size: 2em; /* Taille de police plus grande */
  font-weight: bold; /* Texte en gras */
}

.form-group {
  margin-bottom: 20px;
}

label {
  display: block;
  margin-bottom: 5px;
}

.avatar-label {
  text-align: left; /* Aligner le texte du label à gauche */
  margin-left: 30px; /* Marge pour centrer un peu à gauche */
}

input, select {
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
}

.avatar-section {
  display: flex;
  align-items: center;
}

.avatar-preview {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  object-fit: cover;
  border: 1px solid #ddd;
  margin-right: 20px;
}

.change-avatar-btn {
  background-color: #3498db;
  color: white;
  border: none;
  padding: 10px 15px;
  cursor: pointer;
  border-radius: 5px;
  font-weight: bold;
}

.change-avatar-btn:hover {
  background-color: #2980b9;
}

.hidden-input {
  display: none; /* Cacher l'input de fichier */
}

button {
  display: block;
  width: 100%;
  padding: 10px;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #218838;
}
</style>
