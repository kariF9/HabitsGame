import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../views/HomePage.vue';
import ChallengesPages from '../views/ChallengesPages.vue';
import RecipePage from '../views/RecipePage.vue';
import ScorePage from '../views/ScorePage.vue';

const routes = [
  { path: '/', name: 'Home', component: HomePage },
  { path: '/challenges', name: 'ChallengesPages', component: ChallengesPages },
  { path: '/recipes', name: 'Recipes', component: RecipePage },
  { path: '/score', name: 'Score', component: ScorePage, props: route => ({ scoreItem: route.params.scoreItem }) },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
