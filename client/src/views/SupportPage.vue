<template>
  <div class="contact-container">
    <h1>{{ $t('menu.contactUs') }}</h1>
    <form @submit.prevent="sendEmail" class="contact-form">
      <div class="form-group">
        <label for="name">{{ $t('menu.name') }}</label>
        <input v-model="form.name" id="name" type="text" required />
      </div>
      <div class="form-group">
        <label for="firstname">{{ $t('menu.firstName') }}</label>
        <input v-model="form.firstname" id="firstname" type="text" required />
      </div>
      <div class="form-group">
        <label for="email">{{ $t('menu.email') }}</label>
        <input v-model="form.email" id="email" type="email" required />
      </div>
      <div class="form-group">
        <label for="message">{{ $t('menu.message') }}</label>
        <textarea v-model="form.message" id="message" required></textarea>
      </div>
      <button type="submit" :disabled="loading">{{ $t('menu.send') }}</button>
    </form>
    <p v-if="message" :class="{ success: isSuccess, error: !isSuccess }">{{ message }}</p>
  </div>
</template>

<script>
import emailjs from 'emailjs-com';

emailjs.init('jenLAdfTxPzDatMWj');  // Remplacez par votre clé publique

export default {
  data() {
    return {
      form: {
        name: '',
        firstname: '',
        email: '',
        message: ''
      },
      message: '',
      isSuccess: false,
      loading: false
    };
  },
  methods: {
    validateEmail(email) {
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return re.test(email);
    },
    async sendEmail() {
      this.loading = true;
      this.message = '';
      this.isSuccess = false;

      if (!this.form.name || !this.form.firstname || !this.form.email || !this.form.message) {
        this.message = 'Tous les champs doivent être remplis.';
        this.isSuccess = false;
        this.loading = false;
        return;
      }

      if (!this.validateEmail(this.form.email)) {
        this.message = 'Adresse e-mail invalide.';
        this.isSuccess = false;
        this.loading = false;
        return;
      }

      // Structuration du message avec l'adresse e-mail
      const emailParams = {
        to_name: this.form.firstname + ' ' + this.form.name, // Nom du destinataire
        from_name: this.form.firstname + ' ' + this.form.name, // Nom de l'expéditeur
        from_email: this.form.email, // Ajout de l'adresse e-mail
        message: this.form.message, // Contenu du message
      };

      try {
        await emailjs.send(
          'service_lovms1s',  // Remplacez par votre ID de service
          'template_kvkthxo', // Remplacez par votre ID de modèle
          emailParams // Utilisation des paramètres structurés
        );
        this.message = 'Merci pour votre message ! Il a été bien envoyé.';
        this.isSuccess = true;
        this.form = { name: '', firstname: '', email: '', message: '' };
      } catch (error) {
        console.error('Erreur lors de l\'envoi de l\'email:', error);
        this.message = 'Échec de l\'envoi du message. Veuillez vérifier les informations.';
        this.isSuccess = false;
      } finally {
        this.loading = false;
      }
    }
  }
};
</script>

<style scoped>
h1 {
  color: white;
}
.contact-container {
  max-width: 800px; /* Largeur maximale du conteneur */
  margin: 0 auto;
  padding: 40px; /* Padding autour du formulaire */
  background: black;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Ombre pour plus de profondeur */
  position: relative;
  overflow: hidden;
  margin-top: 30px;
}

.contact-container h1 {
  animation: bounceIn 1s ease-out;
  text-align: center; /* Centrer le titre */
  font-size: 2.5em; /* Taille du titre */
  margin-bottom: 30px; /* Espacement sous le titre */
  
}

.contact-form {
  display: flex;
  flex-direction: column;
  margin-left: 200px;
}

.form-group {
  margin-bottom: 20px; /* Espacement entre les champs */
  opacity: 1;
  transform: translateX(-100px);
  animation-duration: 1s;
  animation-fill-mode: both;
}

.form-group label {
  display: block;
  font-weight: bold; /* Mettre en gras les étiquettes */
  color: white;
}

#name, #firstname, #email, #message {
  animation: slideInFromLeft 1s ease-out forwards;
  color: white; /* Définit la couleur du texte */
}

input,
textarea {
  width: 100%;
  padding: 12px; /* Augmenter le padding pour plus de confort */
  border: 1px solid #ddd;
  border-radius: 4px;
  color: white; /* Modifie la couleur du texte en blanc */
  background-color: #333; /* Modifie la couleur de fond */
}

textarea {
  height: 150px; /* Hauteur du champ message */
  resize: vertical; /* Permettre la redimension verticale */
}


button {
  padding: 12px 24px; /* Taille du bouton */
  border: none;
  border-radius: 4px;
  background-color:black;
  color: black;
  font-size: 18px; /* Taille du texte */
  cursor: pointer;
  animation: slideUp 3s ease-out forwards;
  opacity: 1;
  display: block;
  margin: 0 auto; /* Centrer le bouton */
  background-color: white;
  margin-left: 100px;
}
button:hover {
  background-color: #a9a9a9;
}

button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

p {
  margin-top: 20px;
  font-size: 16px;
  text-align: center; /* Centrer le message */
}

.success {
  color: green;
}

.error {
  color: red;
}

/* Animations for each element */
@keyframes bounceIn {
  0% {
    opacity: 0;
    transform: translateY(-50px);
  }
  50% {
    opacity: 1;
    transform: translateY(10px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideInFromLeft {
  0% {
    opacity: 0;
    transform: translateX(-100px);
  }
  100% {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes slideInFromRight {
  0% {
    opacity: 0;
    transform: translateX(100px);
  }
  100% {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes slideUp {
  from {
    transform: translateY(100px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}
</style>
