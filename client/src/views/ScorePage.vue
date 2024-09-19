<template>
  <div class="score-page">
    <div class="total-score">Score total : {{ totalScore }}</div>
    <h1>Historique des scores</h1>
    <table v-if="scoreHistory.length > 0">
      <thead>
        <tr>
          <th>Date</th>
          <th>Type</th>
          <th>Détail</th>
          <th>Score</th>
          <th>Feedback</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in scoreHistory" :key="index">
          <td>{{ formatDate(item.date) }}</td>
          <td>{{ item.type }}</td>
          <td>{{ item.detail }}</td>
          <td :class="{ 'positive-score': item.score > 0, 'negative-score': item.score <= 0 }">
            {{ item.score > 0 ? '+' + item.score : item.score }}
          </td>
          <td>{{ item.feedback }}</td>
        </tr>
      </tbody>
    </table>
    <p v-else>Aucun score disponible.</p>
    <button class="reset-history-btn" @click="resetHistory">Réinitialiser l'historique</button>
  </div>
</template>

<script>
export default {
  name: 'ScorePage',
  props: {
    scoreItem: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      scoreHistory: []
    };
  },
  computed: {
    totalScore() {
      return this.scoreHistory.reduce((total, item) => total + item.score, 0);
    }
  },
  created() {
    this.loadScores();
    if (this.scoreItem) {
      try {
        const score = JSON.parse(this.scoreItem);
        this.addScore(score);
      } catch (e) {
        console.error('Erreur lors du parsing de scoreItem:', e);
      }
    }
  },
  methods: {
    loadScores() {
      const storedScores = JSON.parse(localStorage.getItem('scoreHistory')) || [];
      this.scoreHistory = Array.isArray(storedScores) ? storedScores : [];
    },
    addScore(score) {
      if (score && typeof score === 'object') {
        this.scoreHistory.push(score);
        localStorage.setItem('scoreHistory', JSON.stringify(this.scoreHistory));
      }
    },
    formatDate(date) {
      if (!date) return 'Date invalide'; // Gestion des dates invalides
      try {
        const formattedDate = new Intl.DateTimeFormat('fr-FR', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        }).format(new Date(date));
        return formattedDate;
      } catch (e) {
        console.error('Erreur lors du formatage de la date:', e);
        return 'Date invalide';
      }
    },
    resetHistory() {
      localStorage.removeItem('scoreHistory');
      this.loadScores(); // Recharger les scores après réinitialisation
    }
  }
};
</script>

<style scoped>
.score-page {
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
  margin-top: 50px;
  position: relative; /* Ajouter cette propriété pour permettre à .total-score de se positionner correctement */
}

.total-score {
  position: absolute;
  top: 20px; /* Ajuster cette valeur si nécessaire pour le placement vertical */
  left: 0; /* Aligner à gauche */
  font-size: 18px;
  font-weight: bold;
  margin-left: -450px; /* Optionnel: Ajouter un peu de marge gauche pour espacer du bord */
}

h1 {
  text-align: center;
  margin-bottom: 20px;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  border: 1px solid #ddd;
  padding: 12px;
  text-align: left;
}

th {
  background-color: #f2f2f2;
  font-weight: bold;
}

.positive-score {
  color: green;
}

.negative-score {
  color: red;
}

.reset-history-btn {
  background-color: #f44336;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 20px;
}

.reset-history-btn:hover {
  background-color: #d32f2f;
}
</style>
