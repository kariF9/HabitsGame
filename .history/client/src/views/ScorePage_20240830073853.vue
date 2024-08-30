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
            {{ item.score }}
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
  },
  methods: {
    loadScores() {
      const storedScores = JSON.parse(localStorage.getItem('scoreHistory')) || [];
      this.scoreHistory = Array.isArray(storedScores) ? storedScores : [];
      console.log('Scores chargés:', this.scoreHistory);
    },
    formatDate(date) {
      return new Intl.DateTimeFormat('fr-FR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }).format(new Date(date));
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
}

.total-score {
  position: absolute;
  top: 60px;
  right: 20px;
  font-size: 18px;
  font-weight: bold;
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

