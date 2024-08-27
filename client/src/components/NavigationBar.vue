<template>
  <nav class="navbar">
    <ul class="nav-menu">
      <li v-for="(item, index) in menuItems" :key="index">
        <router-link :to="item.link">{{ item.name }}</router-link>
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
        { name: 'Feedback', link: '/feedback' },
        { name: 'Score', link: '/score' },
        { name: 'Support', link: '/support' },
        { name: 'À propos', link: '/about' },
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
  background-color: #2c3e50;
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

.nav-menu a {
  color: white;
  text-decoration: none;
  font-weight: bold;
}

.nav-menu a:hover {
  text-decoration: underline;
}
</style>

