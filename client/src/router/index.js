import { createRouter, createWebHistory } from 'vue-router';
import MinijeuxPage from '../views/MinijeuxPage.vue';
import HomePage2 from '../views/HomePage2.vue'; // Import de la nouvelle page
import ChallengesPages from '../views/ChallengesPages.vue';
import RecipePage from '../views/RecipePage.vue';
import ScorePage from '../views/ScorePage.vue';
import AproposPage from '../views/AproposPage.vue';
import SupportPage from '../views/SupportPage.vue';
import ProfileEdit from '../components/ProfileEdit.vue'; 
import SnakeGame from '../views/SnakeGame.vue'; 
import StartSnake from '../views/StartSnake.vue'; 
import VoirScore from '../views/VoirScore.vue'; 
import ChangeCouleurSerpent from '../views/ChangeCouleurSerpent.vue'; // Nouvelle page
import NutriScoreCalculator from '../components/NutriScoreCalculator.vue'; // Import du calculateur de Nutri-Score
import ParametresGenerales from '../components/ParametresGenerales.vue'; // Import de la nouvelle page
import NotificationPage from '../components/NotificationPage.vue'; // Import de la nouvelle page Notification

const routes = [
  { path: '/mini_jeux', name: 'MinijeuxPage', component: MinijeuxPage },
  { path: '/', name: 'HomePage2', component: HomePage2 }, // Ajout de la route pour HomePage2
  { path: '/challenges', name: 'ChallengesPages', component: ChallengesPages },
  { path: '/recipes', name: 'Recipes', component: RecipePage },
  { path: '/score', name: 'Score', component: ScorePage },
  { path: '/apropos', name: 'Apropos', component: AproposPage },
  { path: '/support', name: 'Support', component: SupportPage },
  { path: '/profile', name: 'ProfileEdit', component: ProfileEdit }, 
  { path: '/snake', name: 'StartSnake', component: StartSnake }, 
  { path: '/snake/game', name: 'SnakeGame', component: SnakeGame }, 
  { path: '/scores', name: 'VoirScore', component: VoirScore }, 
  { path: '/snake/change-color', name: 'ChangeCouleurSerpent', component: ChangeCouleurSerpent }, // Route ajoutée
  { path: '/nutri-score', name: 'NutriScoreCalculator', component: NutriScoreCalculator }, // Ajout de la route pour le calculateur de Nutri-Score
  { path: '/parametres', name: 'ParametresGenerales', component: ParametresGenerales }, // Ajout de la route pour ParametresGenerales
  { path: '/notifications', name: 'NotificationPage', component: NotificationPage }, // Ajout de la route pour NotificationPage
  
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
