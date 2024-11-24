<template>
  <div class="challenges-page">
    <h1>Défis</h1>
    <p class="question-count">Question {{ currentQuestionIndex + 1 }} sur {{ questions.length }}</p>
    <h2>{{ currentQuestion.text }}</h2>
    <ColorScale
      :value="selectedValue"
      @input="handleInput"
      @next-question="nextQuestion"
      ref="colorScale"
    />
    <div class="button-container">
      <button class="next-question-btn" @click="nextQuestion" :disabled="isLastQuestion && messageDisplayed">Question suivante</button>
    </div>
    <div v-if="isLastQuestion && messageDisplayed" class="button-container">
      <button class="reset-btn" @click="resetAnswers">Réinitialiser</button>
      <button class="validate-btn" @click="submitAnswers">Soumettre les réponses</button>
    </div>
    <div class="color-legend">
      <h3>Légende des Couleurs</h3>
      <table>
        <thead>
          <tr>
            <th>Couleur</th>
            <th>Fréquence</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(color, index) in colorLegend" :key="index">
            <td class="color-box" :class="color.class"></td>
            <td>{{ color.text }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-if="messageDisplayed" class="thank-you-message">
      Merci pour vos réponses !
    </div>
  </div>
</template>

<script>
import ColorScale from '@/components/ColorScale.vue'; // Assurez-vous que le chemin est correct

export default {
  name: 'ChallengesPages',
  components: {
    ColorScale,
  },
  data() {
    return {
      questions: [
        { text: "Habituellement, à quelle fréquence consommez-vous des légumes, en dehors des pommes de terre ?" },
        { text: "Habituellement, à quelle fréquence consommez-vous des légumes secs (comme des lentilles, pois chiches, haricots secs) ?" },
        { text: "Habituellement, à quelle fréquence consommez-vous des féculents complets (comme du pain complet, des pâtes complètes ou du riz complet) ?" },
      ],
      currentQuestionIndex: 0,
      selectedValue: 3,
      answers: [],
      colorLegend: [
        { class: 'red', text: 'Rouge : 1 à 3 fois par semaine' },
        { class: 'orange', text: 'Orange : 4 à 6 fois par semaine' },
        { class: 'yellow', text: 'Jaune : 1 fois par jour' },
        { class: 'green', text: 'Vert : 2 fois par jour' },
        { class: 'blue', text: 'Bleu : 3 fois par jour' },
        { class: 'violet', text: 'Violet : 4 fois et plus par jour' },
      ],
      messageDisplayed: false
    };
  },
  computed: {
    currentQuestion() {
      return this.questions[this.currentQuestionIndex];
    },
    isLastQuestion() {
      return this.currentQuestionIndex === this.questions.length - 1;
    },
  },
  methods: {
    handleInput(value) {
      this.selectedValue = value;
    },
    nextQuestion() {
      if (this.currentQuestionIndex < this.questions.length - 1) {
        this.answers.push({ question: this.currentQuestion.text, answer: this.selectedValue });
        this.selectedValue = 3;
        if (this.$refs.colorScale && typeof this.$refs.colorScale.clearSelection === 'function') {
          this.$refs.colorScale.clearSelection();
        }
        this.currentQuestionIndex++;
      } else {
        this.answers.push({ question: this.currentQuestion.text, answer: this.selectedValue });
        this.selectedValue = 3;
        if (this.$refs.colorScale && typeof this.$refs.colorScale.clearSelection === 'function') {
          this.$refs.colorScale.clearSelection();
        }
        this.messageDisplayed = true;
      }
    },
    submitAnswers() {
      const score = this.answers.length;
      const feedback = this.answers.map(answer => this.generateFeedback(answer.answer));
      const scoreItem = {
        date: new Date(),
        type: 'Défi',
        detail: 'Questionnaire sur l\'alimentation',
        score: score,
        feedback: feedback.join(' ')
      };

      // Récupérer l'historique des scores actuel
      const existingScores = JSON.parse(localStorage.getItem('scoreHistory')) || [];

      // Ajouter le nouveau score
      existingScores.push(scoreItem);

      // Sauvegarder l'historique des scores mis à jour
      localStorage.setItem('scoreHistory', JSON.stringify(existingScores));

      // Passer le scoreItem à la page Score via les paramètres de la route
      this.$router.push({ name: 'Score', query: { scoreItem: JSON.stringify(scoreItem) } });

      this.resetAnswers();
    },
    resetAnswers() {
      this.answers = [];
      this.currentQuestionIndex = 0;
      this.selectedValue = 3;
      this.messageDisplayed = false;
      if (this.$refs.colorScale && typeof this.$refs.colorScale.clearSelection === 'function') {
        this.$refs.colorScale.clearSelection();
      }
    },
    generateFeedback(colorValue) {
      switch(colorValue) {
        case 1: // Rouge
        case 2: // Orange
          return "Il faut manger plus de légumes et de féculents complets.";
        case 3: // Jaune
        case 4: // Vert
          return "C'est bon, continuez à maintenir ces habitudes.";
        case 5: // Bleu
        case 6: // Violet
          return "Essayez de diminuer un peu la consommation.";
        default:
          return "";
      }
    }
  },
};
</script>

<style scoped>
.challenges-page {
  text-align: center;
  margin-top: 50px;
}

h1 {
  font-size: 32px;
  margin-bottom: 20px;
}

.question-count {
  font-size: 18px;
  margin-bottom: 10px;
  color: #555;
}

h2 {
  font-size: 24px;
  margin-bottom: 20px;
}

.validate-btn,
.reset-btn,
.next-question-btn {
  padding: 15px 30px;
  font-size: 18px;
  border-radius: 5px;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s;
  margin: 0 10px;
}

.validate-btn {
  background-color: #4CAF50;
  color: white;
}

.validate-btn:hover {
  background-color: #45a049;
}

.reset-btn {
  background-color: #f44336;
  color: white;
}

.reset-btn:hover {
  background-color: #d32f2f;
}

.next-question-btn {
  background-color: #2196F3;
  color: white;
}

.next-question-btn:hover {
  background-color: #1976D2;
}

.color-legend {
  margin-top: 30px;
  padding: 10px;
  border-top: 2px solid #ccc;
  display: inline-block;
  max-width: 400px;
  text-align: left;
}

.color-legend h3 {
  font-size: 18px;
  margin-bottom: 10px;
}

.color-legend table {
  width: 100%;
  border-collapse: collapse;
  font-size: 14px;
}

.color-legend th,
.color-legend td {
  border: 1px solid #ddd;
  padding: 5px;
  text-align: left;
}

.color-legend th {
  background-color: #f4f4f4;
}

.color-box {
  width: 20px;
  height: 20px;
  display: inline-block;
  border-radius: 5px;
}

.red { background-color: red; }
.orange { background-color: orange; }
.yellow { background-color: yellow; }
.green { background-color: green; }
.blue { background-color: blue; }
.violet { background-color: violet; }

.button-container {
  text-align: center;
  margin-top: 20px;
}

.reset-btn, .validate-btn, .next-question-btn {
  margin: 0 5px;
}

.thank-you-message {
  margin-top: 20px;
  font-size: 20px;
  color: #4CAF50;
}
</style>
