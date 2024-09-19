import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../views/HomePage.vue';
import ChallengesPages from '../views/ChallengesPages.vue';
import RecipePage from '../views/RecipePage.vue';
import ScorePage from '../views/ScorePage.vue';
import AproposPage from '../views/AproposPage.vue';
import SupportPage from '../views/SupportPage.vue';
import ProfileEdit from '../components/ProfileEdit.vue'; // Import de ProfileEdit.vue depuis components

const routes = [
  { path: '/', name: 'Home', component: HomePage },
  { path: '/challenges', name: 'ChallengesPages', component: ChallengesPages },
  { path: '/recipes', name: 'Recipes', component: RecipePage },
  { path: '/score', name: 'Score', component: ScorePage, props: route => ({ scoreItem: route.params.scoreItem }) },
  { path: '/apropos', name: 'Apropos', component: AproposPage },
  { path: '/support', name: 'Support', component: SupportPage },
  { path: '/profile', name: 'ProfileEdit', component: ProfileEdit }, // Route pour modifier le profil
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
