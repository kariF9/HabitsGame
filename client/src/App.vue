<template>
  <div id="app" :class="theme">
    <NavigationBar />
    <router-view />
  </div>
</template>

<script>
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import NavigationBar from './components/NavigationBar.vue';

export default {
  name: 'App',
  components: {
    NavigationBar,
  },
  setup() {
    const { t } = useI18n();
    const theme = computed(() => localStorage.getItem('userSettings')?.theme || 'light');
    return { t, theme };
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

.dark-theme {
  background-color: #333;
  color: #fff;
}

.light-theme {
  background-color: #fff;
  color: #000;
}
</style>
