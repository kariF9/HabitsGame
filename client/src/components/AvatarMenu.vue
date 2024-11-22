<template>
  <div class="avatar-menu">
    <img :src="avatarSrc" @click="toggleMenu" alt="Avatar" class="avatar" />
    <transition name="slide-down">
      <div v-if="showMenu" class="dropdown-menu">
        <router-link to="/profile" @click="closeMenu">Modifier le profil</router-link>
        <router-link to="/parametres" @click="closeMenu">Paramètres générales</router-link>
      </div>
    </transition>
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
    closeMenu() {
      this.showMenu = false; // Fermer le menu après avoir cliqué sur un élément
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
  animation: slide-avatar 1s ease-out; /* Animation de l'avatar */
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

/* Animation pour l'avatar de gauche à droite */
@keyframes slide-avatar {
  from {
    transform: translateX(-100%);
  }
  to {
    transform: translateX(0);
  }
}

/* Transition pour le menu déroulant de haut en bas */
.slide-down-enter-active {
  animation: slide-down 0.5s ease-out forwards;
}

.slide-down-leave-active {
  animation: slide-up 0.5s ease-out forwards;
}

@keyframes slide-down {
  from {
    transform: translateY(-100%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

@keyframes slide-up {
  from {
    transform: translateY(0);
    opacity: 1;
  }
  to {
    transform: translateY(-100%);
    opacity: 0;
  }
}
</style>
