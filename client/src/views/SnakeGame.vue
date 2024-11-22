<template>
  <div id="gameContainer">
    <h1 class="title">Jeu de Serpent</h1>
    <button class="gameButton animated" v-if="!isGameStarted" @click="startGame">Démarrer le jeu</button>
    <button class="gameButton animated" v-if="!isGameStarted" @click="quitGame">Retourner au Menu</button>
    <canvas ref="gameCanvas" v-if="isGameStarted" :width="canvasSize" :height="canvasSize"></canvas>
    
    <div class="score">Score: {{ score }} | Meilleur Score: {{ highScore }}</div> <!-- Affichage du score -->

    <div v-if="isGamePaused" class="pauseMenu">
      <h2>Jeu en Pause</h2>
      <button class="gameButton animated" @click="resumeGame">Reprendre</button>
      <button class="gameButton animated" @click="quitGame">Quitter</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      canvas: null,
      context: null,
      snake: [],
      direction: { x: 0, y: 0 },
      food: { x: 0, y: 0, type: '', isHealthy: true },
      score: 0,
      highScore: 0,
      isGameStarted: false,
      isGamePaused: false,
      soundEnabled: true,
      snakeColor: 'green', // Couleur par défaut
      gameInterval: null,
      snakeSize: 30,
      canvasSize: 600,
      barrierHeight: 20,
      barrierWidth: 30,
      scores: [], // Liste des scores
      transformFoodTimeout: null, // Timeout pour la transformation automatique
      transformDuration: 10000, // 10 secondes pour transformer les aliments malsains
      healthyFood: ['🍎', '🍌', '🍒'], // Aliments sains
      unhealthyFood: ['🍔', '🍟'], // Aliments malsains
      foodSpawnCount: 0 // Compteur pour suivre les types de nourriture
    };
  },
  methods: {
    loadSnakeColor() {
      const savedColor = localStorage.getItem('snakeColor');
      if (savedColor) {
        this.snakeColor = savedColor;
      }
    },
    startGame() {
      this.isGameStarted = true;
      this.$nextTick(() => {
        this.canvas = this.$refs.gameCanvas;
        this.context = this.canvas.getContext('2d');
        this.resetGame();
        this.spawnFood();
        this.gameInterval = setInterval(this.gameLoop, 100);
        document.addEventListener('keydown', this.handleKeyDown);
      });
    },
    resetGame() {
      this.score = 0;
      this.snake = [{ x: 10, y: 10 }];
      this.direction = { x: 1, y: 0 };
      this.foodSpawnCount = 0; // Réinitialiser le compteur
      this.updateCanvas();
    },
    spawnFood() {
      const foodTypes = [
        { emoji: '🍎', isHealthy: true },
        { emoji: '🍌', isHealthy: true },
        { emoji: '🍒', isHealthy: true },
        { emoji: '🍔', isHealthy: false },
        { emoji: '🍟', isHealthy: false }
      ];
      
      const maxGridSize = (this.canvasSize / this.snakeSize) - 1;

      // Choisir aléatoirement la nourriture
      let randomFood;
      if (this.foodSpawnCount < 5) {
        randomFood = foodTypes[Math.floor(Math.random() * 3)]; // Fruits
      } else {
        randomFood = foodTypes[Math.floor(Math.random() * foodTypes.length)]; // Tout
      }

      this.food = {
        x: Math.floor(Math.random() * maxGridSize),
        y: Math.floor(Math.random() * maxGridSize),
        type: randomFood.emoji,
        isHealthy: randomFood.isHealthy
      };

      // Si la nourriture est malsaine, elle se transforme après 10 secondes
      if (!this.food.isHealthy) {
        this.transformFoodTimeout = setTimeout(() => {
          this.transformToFruit();
        }, this.transformDuration);
      }

      // Incrémenter le compteur
      this.foodSpawnCount = (this.foodSpawnCount + 1) % 6; // Réinitialiser après 6
    },
    transformToFruit() {
      // Transformer en un fruit aléatoire après 10 secondes
      const randomHealthyFood = this.healthyFood[Math.floor(Math.random() * this.healthyFood.length)];
      this.food.type = randomHealthyFood;
      this.food.isHealthy = true;
    },
    gameLoop() {
      if (this.isGamePaused) return;
      this.updateSnake();
      this.checkCollisions();
      this.updateCanvas();
    },
    updateSnake() {
      const newHead = {
        x: this.snake[0].x + this.direction.x,
        y: this.snake[0].y + this.direction.y,
      };
      this.snake.unshift(newHead);
      if (newHead.x === this.food.x && newHead.y === this.food.y) {
        if (this.food.isHealthy) {
          this.score++;
        } else {
          this.endGame(this.score); // Perdre si la nourriture n'est pas saine (burger/frites)
          return;
        }
        clearTimeout(this.transformFoodTimeout); // Annuler la transformation si la nourriture est mangée
        this.spawnFood();
      } else {
        this.snake.pop();
      }
    },
    checkCollisions() {
      const head = this.snake[0];
      if (
        head.x < 0 ||
        head.x >= this.canvasSize / this.snakeSize ||
        head.y < 0 ||
        head.y >= (this.canvasSize / this.snakeSize) - (this.barrierHeight / this.snakeSize) ||
        this.snake.slice(1).some(segment => segment.x === head.x && segment.y === head.y)
      ) {
        this.endGame(this.score);
      }
    },
    endGame(finalScore) {
      clearInterval(this.gameInterval);
      clearTimeout(this.transformFoodTimeout); // Annuler la transformation en cas de fin de jeu
      this.isGameStarted = false;
      if (finalScore > this.highScore) {
        this.highScore = finalScore;
      }
      const scores = JSON.parse(localStorage.getItem('snakeScores')) || []; // trouver le chemin de fichier JSON !!! 
      scores.push(finalScore);
      localStorage.setItem('snakeScores', JSON.stringify(scores));
      alert('Game Over! Votre score: ' + finalScore);
      document.removeEventListener('keydown', this.handleKeyDown);
      this.resetGame();
    },
    handleKeyDown(event) {
      switch (event.key) {
        case 'ArrowUp':
          if (this.direction.y === 0) this.direction = { x: 0, y: -1 };
          break;
        case 'ArrowDown':
          if (this.direction.y === 0) this.direction = { x: 0, y: 1 };
          break;
        case 'ArrowLeft':
          if (this.direction.x === 0) this.direction = { x: -1, y: 0 };
          break;
        case 'ArrowRight':
          if (this.direction.x === 0) this.direction = { x: 1, y: 0 };
          break;
        case 'Escape':
          this.togglePause();
          break;
      }
    },
    togglePause() {
      this.isGamePaused = !this.isGamePaused;
      if (this.isGamePaused) {
        clearInterval(this.gameInterval);
      } else {
        this.gameInterval = setInterval(this.gameLoop, 100);
      }
    },
    updateCanvas() {
      const canvas = this.$refs.gameCanvas;
      this.context = canvas.getContext('2d');
      this.context.clearRect(0, 0, canvas.width, canvas.height);
      this.context.strokeStyle = 'white';
      this.context.lineWidth = 6;
      this.context.strokeRect(0, 0, canvas.width, canvas.height);
      this.snake.forEach((segment, index) => {
        this.drawCylindricalSegment(segment.x * this.snakeSize, segment.y * this.snakeSize, index === 0);
      });
      this.context.fillStyle = 'red';
      this.context.font = '30px Arial';
      this.context.fillText(this.food.type, this.food.x * this.snakeSize, (this.food.y + 1) * this.snakeSize);
    },
    drawCylindricalSegment(x, y, isHead) {
      const width = this.snakeSize * 1.5;
      const height = this.snakeSize;
      this.context.fillStyle = isHead ? 'darkgreen' : this.snakeColor;
      this.context.fillRect(x, y, width, height);
      if (isHead) {
        this.context.fillStyle = 'white';
        this.context.beginPath();
        this.context.arc(x + width / 4, y + height / 4, height / 4, 0, Math.PI * 2);
        this.context.fill();
        this.context.fillStyle = 'black';
        this.context.beginPath();
        this.context.arc(x + width / 4, y + height / 4, height / 8, 0, Math.PI * 2);
        this.context.fill();
        this.context.fillStyle = 'red';
        this.context.fillRect(x + width, y + height / 3, height / 2, height / 5);
      }
    },
    playEatSound() {
      const audio = new Audio(require('@/assets/eat-sound.mp3'));
      audio.playbackRate = 2.5;
      audio.play();
    },
    resumeGame() {
      this.togglePause();
    },
    quitGame() {
      this.isGameStarted = false;
      clearInterval(this.gameInterval);
      this.$router.push({ name: 'StartSnake' });
    },
  },
  mounted() {
    this.loadSnakeColor();
  },
};
</script>
<style scoped>
html, body {
  margin: 0;
  overflow: hidden;
}

#gameContainer {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 87.3vh;
  background-color: black;
}

.title {
  font-size: 48px;
  font-weight: bold;
  color: white;
  margin-bottom: 20px;
}

.pauseMenu {
  color: white;
  text-align: center;
}

.gameButton {
  background-color: grey;
  color: white;
  border: none;
  padding: 10px 20px;
  font-size: 18px;
  cursor: pointer;
  margin: 10px;
  transition: transform 0.3s ease;
}

.gameButton.animated:hover {
  transform: translateY(-10px);
  background-color: darkred;
}

.score {
  color: white;
  font-size: 22px;
  margin-top: 20px;
}
</style>
