<template>
  <div class="avatar-menu">
    <img src="@/assets/avatar.png" @click="toggleMenu" alt="Avatar" class="avatar" />
    <div v-if="showMenu" class="dropdown-menu">
      <router-link to="/profile">Modifier le profil</router-link>
      <router-link to="/settings">Paramètres générales</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AvatarMenu',
  data() {
    return {
      showMenu: false,
    };
  },
  methods: {
    toggleMenu() {
      this.showMenu = !this.showMenu;
    },
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
  width: 35px;
  height: 35px;
  border-radius: 50%;
  cursor: pointer;
  margin-top: -10px;
}

.dropdown-menu {
  position: absolute;
  top: 50px; /* Adjust this value to control the dropdown position */
  right: 0;
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
