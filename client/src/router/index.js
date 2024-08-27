import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../views/HomePage.vue';
import ChallengesPages from '@/views/ChallengesPages.vue';
import RecipePage from '../views/RecipePage.vue'; 

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomePage,
  },
  { path: '/challenges', name: 'ChallengesPages', component: ChallengesPages },
  {
    path: '/recipes',
    name: 'recipes',
    component: RecipePage
  },
  // Ajoutez d'autres routes ici si nécessaire
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;

