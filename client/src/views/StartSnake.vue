<template>
  <div id="startContainer">
    <h1 class="title">Jeux de serpent</h1>
    <div class="menu">
      <button class="gameButton startButton" @click="startGame">Commencer</button>
      <button class="gameButton scoreButton" @click="viewScores">Voir le Score</button>
      <button class="gameButton colorButton" @click="changeSnakeColor">Changer la Couleur du Serpent</button>
      <div class="soundIcon" @click="toggleSound">
        <span v-if="soundEnabled">🔊</span>
        <span v-else>🔇</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      soundEnabled: true,  // Gestion du son
      snakeColor: 'red',    // Couleur initiale du serpent
      scores: [],           // Liste des scores sauvegardés
    };
  },
  methods: {
    // Rediriger vers la page du jeu en passant la couleur du serpent comme paramètre
    startGame() {
      this.$router.push({ name: 'SnakeGame', params: { snakeColor: this.snakeColor } });
    },
    
    // Rediriger vers la page de changement de couleur du serpent
    changeSnakeColor() {
      this.$router.push({ name: 'ChangeCouleurSerpent' });  // Redirection vers la route définie
    },

    // Activer/Désactiver le son
    toggleSound() {
      this.soundEnabled = !this.soundEnabled;
    },

    // Rediriger vers la page des scores
    viewScores() {
      this.$router.push({ name: 'VoirScore' });  // Redirection vers la route des scores
    },

    // Sauvegarder un score dans le localStorage
    saveScore(score) {
      this.scores.push(score);  // Ajouter le score à la liste
      localStorage.setItem('scores', JSON.stringify(this.scores));  // Sauvegarder dans localStorage
    },

    // Charger les scores depuis le localStorage
    loadScores() {
      const savedScores = localStorage.getItem('scores');  // Récupérer les scores sauvegardés
      this.scores = savedScores ? JSON.parse(savedScores) : [];  // Parse ou initialise vide
    },
  },

  // Actions au moment de la création du composant
  created() {
    this.loadScores();  // Charger les scores sauvegardés à l'initialisation
    const savedColor = localStorage.getItem('snakeColor');  // Récupérer la couleur sauvegardée
    if (savedColor) {
      this.snakeColor = savedColor;  // Si une couleur a été sauvegardée, la restaurer
    }
  },
};
</script>

<style scoped>
#startContainer {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 87.3vh;
  background-color: black;
  position: relative;
}

.title {
  font-size: 48px;
  font-weight: bold;
  color: white;
  margin-bottom: 50px;
  animation: slideInRight 1s ease-out;
}

.menu {
  color: white;
  text-align: center;
}

.gameButton {
  background-color: grey;
  color: white;
  border: none;
  padding: 20px 40px;
  margin: 15px;
  border-radius: 10px;
  font-size: 20px;
  cursor: pointer;
  transition: transform 0.3s ease, background-color 0.3s ease;
}

.gameButton:hover {
  transform: scale(1.1);
  background-color: darkred;
}

.startButton {
  animation: slideInLeft 1s ease-out;
}

.scoreButton {
  animation: slideInUp 1s ease-out;
}

.colorButton {
  animation: slideInRight 1s ease-out;
}

@keyframes slideInLeft {
  from {
    transform: translateX(-100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

@keyframes slideInUp {
  from {
    transform: translateY(100%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

@keyframes slideInRight {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

.soundIcon {
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
  font-size: 24px;
  color: white;
}
</style>

