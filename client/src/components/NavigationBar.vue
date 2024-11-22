<template>
  <nav class="navbar">
    <ul class="nav-menu">
      <li 
        v-for="(item, index) in menuItems" 
        :key="index" 
        @mouseover="hoveredIndex = index" 
        @mouseleave="hoveredIndex = null" 
        :class="['nav-item', `item-${index}`]"
      >
        <router-link :to="item.link" class="nav-button">
          <span v-if="hoveredIndex === index">{{ item.name }}</span>
          <font-awesome-icon v-else :icon="item.icon" />
        </router-link>
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
      hoveredIndex: null, // Variable pour suivre l'élément survolé
      menuItems: [
        { name: 'Accueil', link: '/', icon: 'home' },
        { name: 'Mini-jeux', link: '/mini_jeux', icon: 'gamepad' },
        { name: 'Support', link: '/support', icon: 'headset' },
        { name: 'À propos', link: '/apropos', icon: 'info-circle' },
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
  width: 120px;
  height: 100px;
  border-radius: 200px;
  background-color: black;
  color: white;
  text-decoration: none;
  font-weight: bold;
  transition: background-color 0.3s;
}

.nav-button:hover {
  background-color: #a9a9a9;
}

svg {
  font-size: 2em; /* Taille de l'icône */
  transition: transform 0.3s;
  color: white; /* Change la couleur de l'icône en blanc */
}

.nav-button:hover svg {
  transform: scale(1.2); /* Agrandir l'icône au survol */
}

/* Animation d'apparition pour chaque élément du menu */
@keyframes slideIn {
  0% {
    transform: translateX(-20px); /* Commencer légèrement à gauche */
    opacity: 0; /* Invisible au début */
  }
  100% {
    transform: translateX(0); /* Position finale à l'endroit d'origine */
    opacity: 1; /* Visible à la fin */
  }
}

/* Application de l'animation avec un délai pour chaque élément */
.nav-menu li {
  animation: slideIn 1s ease-out forwards;
}

.nav-menu li:nth-child(1) {
  animation-delay: 1.2s; /* Délai pour le premier élément */
}
.nav-menu li:nth-child(2) {
  animation-delay: 1.4s; /* Délai pour le deuxième élément */
}
.nav-menu li:nth-child(3) {
  animation-delay: 1.6s; /* Délai pour le troisième élément */
}
.nav-menu li:nth-child(4) {
  animation-delay: 1.8s; /* Délai pour le quatrième élément */
}
</style>
