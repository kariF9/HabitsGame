<template>
  <nav class="navbar">
    <ul class="nav-menu">
      <li v-for="(item, index) in menuItems" :key="index">
        <router-link :to="item.link" class="nav-button">{{ item.name }}</router-link>
      </li>
    </ul>
    <AvatarMenu />
  </nav>
</template>

<script>
import AvatarMenu from './AvatarMenu.vue';

export default {
  name: 'NavigationBar',
  components: {
    AvatarMenu,
  },
  data() {
    return {
      menuItems: [
        { name: 'Accueil', link: '/' },
        { name: 'Défis', link: '/challenges' },
        { name: 'Recettes', link: '/recipes' },
        { name: 'Score', link: '/score' },
        { name: 'Support', link: '/support' },
        { name: 'À propos', link: '/apropos' },
      ],
    };
  },
};
</script>

<style scoped>
.navbar {
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  padding: 10px 20px;
}

.nav-menu {
  display: flex;
  list-style: none;
  padding: 0;
  margin: 0;
}

.nav-menu li {
  margin: 0 15px;
}

.nav-button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 120px; /* Ajustez la largeur selon vos besoins */
  height: 100px; /* Ajustez la hauteur selon vos besoins */
  border-radius: 200px; /* Augmentez le rayon pour des boutons plus ronds */
  background-color: #d3d3d3; /* Couleur grise claire */
  color: #000; /* Couleur du texte */
  text-decoration: none;
  font-weight: bold;
  transition: background-color 0.3s; /* Animation lors du survol */
}

.nav-button:hover {
  background-color: #a9a9a9; /* Couleur grise foncée au survol */
}
</style>

