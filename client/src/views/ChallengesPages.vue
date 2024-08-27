<template>
  <div class="challenges-page">
    <h1>Défis</h1>
    <h2>{{ currentQuestion.text }}</h2>
    <ColorScale
      :value="selectedValue"
      @input="handleInput"
      @input-done="nextQuestion"
    />
    <div v-if="isLastQuestion">
      <button class="validate-btn" @click="submitAnswers">Valider</button>
    </div>
  </div>
</template>

<script>
import ColorScale from '@/components/ColorScale.vue';

export default {
  name: 'ChallengesPage',
  components: {
    ColorScale,
  },
  data() {
    return {
      questions: [
        {
          text: "Habituellement, à quelle fréquence consommez-vous des légumes, en dehors des pommes de terre ?",
        },
        {
          text: "Habituellement, à quelle fréquence consommez-vous des légumes secs (comme des lentilles, pois chiches, haricots secs) ?",
        },
        {
          text: "Habituellement, à quelle fréquence consommez-vous des féculents complets (comme du pain complet, des pâtes complètes ou du riz complet) ?",
        },
      ],
      currentQuestionIndex: 0,
      selectedValue: 50, // Valeur initiale au centre
      answers: [],
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
      this.answers.push({ question: this.currentQuestion.text, answer: this.selectedValue });

      if (this.currentQuestionIndex < this.questions.length - 1) {
        this.currentQuestionIndex++;
        this.selectedValue = 50; // Réinitialise l'aiguille au centre pour la prochaine question
      } else {
        alert('Merci pour vos réponses !');
      }
    },
    submitAnswers() {
      console.log('Réponses:', this.answers);
      alert('Réponses soumises !');
    },
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

h2 {
  font-size: 24px;
  margin-bottom: 20px;
}

.validate-btn {
  padding: 15px 30px;
  font-size: 18px;
  border-radius: 5px;
  background-color: #4CAF50;
  color: white;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s;
}

.validate-btn:hover {
  background-color: #45a049;
}
</style>
