<template>
  <div id="scoreContainer">
    <h1 class="title">Meilleurs Scores</h1>
    <div v-if="scores.length === 0" class="noScores">
      <p>Aucun score enregistré.</p>
    </div>
    <ul v-else>
      <li v-for="(score, index) in scores" :key="index" class="scoreItem">
        Score {{ index + 1 }}: {{ score }}
      </li>
    </ul>
    <button class="backButton animatedLeft" @click="goBack">Retourner au Menu</button>
    <button class="resetButton animatedRight" @click="resetScores">Réinitialiser les Scores</button> <!-- Bouton pour réinitialiser les scores -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      scores: [],
    };
  },
  mounted() {
    this.getScores();
  },
  methods: {
    getScores() {
      // Récupérer les scores depuis localStorage
      const savedScores = JSON.parse(localStorage.getItem('snakeScores')) || [];
      this.scores = savedScores;
    },
    goBack() {
      // Redirection vers la page StartSnake
      this.$router.push({ name: 'StartSnake' });
    },
    resetScores() {
      // Réinitialiser les scores en localStorage
      localStorage.removeItem('snakeScores');
      this.scores = [];
      alert('Tous les scores ont été réinitialisés.');
    },
  },
};
</script>

<style scoped>
#scoreContainer {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: black;
  color: white;
}

.title {
  font-size: 48px;
  margin-bottom: 20px;
}

.noScores {
  font-size: 20px;
  color: gray;
}

.scoreItem {
  font-size: 24px;
  margin: 10px 0;
}

.backButton,
.resetButton {
  background-color: grey;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  margin-top: 20px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.3s ease;
}

/* Effet de zoom au hover */
.backButton:hover,
.resetButton:hover {
  background-color: darkred;
  transform: scale(1.1); /* Zoom au hover */
}

/* Animations pour les boutons */
.animatedLeft {
  animation: slideFromLeft 0.5s ease-out;
}

.animatedRight {
  animation: slideFromRight 0.5s ease-out;
}

/* Animation de gauche à droite */
@keyframes slideFromLeft {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(0);
  }
}

/* Animation de droite à gauche */
@keyframes slideFromRight {
  0% {
    transform: translateX(100%);
  }
  100% {
    transform: translateX(0);
  }
}
</style>
