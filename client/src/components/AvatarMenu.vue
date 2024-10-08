<template>
  <div class="avatar-menu">
    <img :src="avatarSrc" @click="toggleMenu" alt="Avatar" class="avatar" />
    <div v-if="showMenu" class="dropdown-menu">
      <router-link to="/profile">Modifier le profil</router-link>
      <router-link to="/parametres">Paramètres générales</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AvatarMenu',
  data() {
    return {
      showMenu: false,
      avatarSrc: '/path/to/default-avatar.png', // Avatar par défaut
    };
  },
  methods: {
    toggleMenu() {
      this.showMenu = !this.showMenu;
    },
    loadAvatar() {
      const savedProfile = localStorage.getItem('userProfile');
      if (savedProfile) {
        const profile = JSON.parse(savedProfile);
        if (profile.avatarUrl) {
          this.avatarSrc = profile.avatarUrl; // Charger l'URL de l'avatar depuis localStorage
        }
      }
    },
  },
  mounted() {
    this.loadAvatar(); // Charger l'avatar lors du montage du composant

    // Écouter les changements d'avatar
    window.addEventListener('avatar-updated', this.loadAvatar);
  },
  beforeUnmount() {
    window.removeEventListener('avatar-updated', this.loadAvatar);
  },
};
</script>

<style scoped>
.avatar-menu {
  position: absolute;
  right: 20px;
  top: 10px;
}

.avatar {
  width: 65px;
  height: 65px;
  border-radius: 50%;
  cursor: pointer;
  margin-top: 10px;
  margin-right: 30px;
}

.dropdown-menu {
  position: absolute;
  top: 80px;
  right: -11px;
  background-color: white;
  border: 1px solid #ddd;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  z-index: 1;
  min-width: 150px;
  border-radius: 5px;
  padding: 10px 0;
}

.dropdown-menu a {
  display: block;
  padding: 10px 20px;
  color: #333;
  text-decoration: none;
  font-weight: bold;
}

.dropdown-menu a:hover {
  background-color: #f1f1f1;
}
</style>
