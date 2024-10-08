<template>
  <div id="colorSelectionContainer">
    <h1 class="title">Changer la Couleur du Serpent</h1>
    <div class="colorOptions">
      <div 
        v-for="color in colors" 
        :key="color" 
        :style="{ backgroundColor: color }" 
        class="colorBox" 
        @click="selectColor(color)">
      </div>
    </div>
    <button @click="goBack" class="backButton animatedRight">Retour</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      colors: ['red', 'green', 'white', 'blue', 'gray', 'yellow', 'pink'], // Couleurs disponibles pour le serpent
    };
  },
  methods: {
    selectColor(color) {
      // Sauvegarde la couleur sélectionnée dans localStorage
      localStorage.setItem('snakeColor', color);
      alert(`Couleur du serpent changée en ${color}`);
    },
    goBack() {
      // Retourner à la page précédente
      this.$router.push({ name: 'StartSnake' });
    },
  },
};
</script>

<style scoped>
#colorSelectionContainer {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: black;
}

.title {
  color: white;
  margin-bottom: 30px;
  font-size: 36px;
}

.colorOptions {
  display: flex;
  justify-content: center;
}

.colorBox {
  width: 50px;
  height: 50px;
  margin: 0 10px;
  cursor: pointer;
  border: 2px solid white;
}

.backButton {
  background-color: grey;
  color: white;
  padding: 10px 20px;
  border: none;
  margin-top: 20px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.3s ease;
}

/* Animation de droite à gauche */
.animatedRight {
  animation: slideFromRight 0.5s ease-out;
}

/* Effet de zoom au hover */
.backButton:hover {
  background-color: darkred;
  transform: scale(1.1); /* Zoom au hover */
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
