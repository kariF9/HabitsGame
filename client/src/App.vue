<template>
  <div id="app" :class="theme">
    <NavigationBar />
    <router-view />
    <div v-if="currentNotification" class="notification" :key="currentNotification.id">
      <p>{{ currentNotification.text }}</p>
      <button @click="handleClick(currentNotification.link)">Voir plus</button>
    </div>
  </div>
</template>

<script>
import { computed, ref, onMounted, onUnmounted } from 'vue';
import NavigationBar from './components/NavigationBar.vue';

export default {
  name: 'App',
  components: {
    NavigationBar,
  },
  setup() {
    const theme = computed(() => localStorage.getItem('userSettings')?.theme || 'light');
    const notificationsEnabled = localStorage.getItem('notificationsEnabled') === 'true';

    const notifications = [
      {
        id: 1,
        text: "Faites des questionnaires et améliorez vos habitudes alimentaires.",
        link: "/challenges",
      },
      {
        id: 2,
        text: "Composez votre repas et obtenez un score en fonction de vos choix.",
        link: "/recipes",
      },
      {
        id: 3,
        text: "Découvrez le jeu de serpent amusant exclusif sur HabitsGame.",
        link: "/snake",
      },
      {
        id: 4,
        text: "Utilisez le calculateur Nutri-Score pour obtenir des informations sur les aliments.",
        link: "/nutri-score",
      },
    ];

    const currentNotification = ref(null);
    let notificationIndex = 0;
    let notificationInterval;

    const showNotification = () => {
      currentNotification.value = notifications[notificationIndex];
      notificationIndex = (notificationIndex + 1) % notifications.length;
    };

    const startNotifications = () => {
      if (notificationsEnabled) {
        showNotification(); // Afficher la première notification immédiatement
        notificationInterval = setInterval(() => {
          currentNotification.value = null; // Cacher la notification
          setTimeout(() => {
            showNotification(); // Afficher la suivante après 3 secondes de pause
          }, 3000); // Attente de 3s avant de montrer la prochaine notification
        }, 13000); // Total : 10s affichage + 3s pause avant la suivante
      }
    };

    const handleClick = (link) => {
      window.location.href = link; // Rediriger vers le lien associé
    };

    onMounted(() => {
      startNotifications();
    });

    onUnmounted(() => {
      clearInterval(notificationInterval);
    });

    return {
      theme,
      currentNotification,
      handleClick,
    };
  },
};
</script>

<style>
#app {
  font-family: 'Poppins', Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  margin-top: 0;
  background-image: url('./assets/background_app.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  height: 100vh;
  width: 100vw;
}

.light-theme {
  background-color: #fff;
  color: #333;
}

.dark-theme {
  background-color: #121212;
  color: #fff;
}

.notification {
  position: fixed;
  bottom: 20px;
  left: 0px;
  background-color:black;
  color: white;
  padding: 15px;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: opacity 0.3s ease;
  font-size: 0.9em;
  font-weight: bold;
}

button {
  background-color: white;
  color: black;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1em;
  margin-top: 10px;
  align-self: center;
}

button:hover {
  background-color: #45a049;
}

button:active {
  transform: scale(0.98);
}
</style>

