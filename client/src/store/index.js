import { createStore } from 'vuex';

export default createStore({
  state: {
    theme: localStorage.getItem('theme') || 'light',
    language: localStorage.getItem('language') || 'fr',
    notifications: [],
  },
  mutations: {
    setTheme(state, theme) {
      state.theme = theme;
      localStorage.setItem('theme', theme);
      document.body.className = theme === 'dark' ? 'dark-theme' : '';
    },
    setLanguage(state, language) {
      state.language = language;
      localStorage.setItem('language', language);
    },
    addNotification(state, notification) {
      state.notifications.push(notification);
    },
    removeNotification(state, id) {
      state.notifications = state.notifications.filter((n) => n.id !== id);
    },
  },
  actions: {
    showNotification({ commit }, notification) {
      const id = Date.now();
      commit('addNotification', { ...notification, id });

      setTimeout(() => {
        commit('removeNotification', id);
      }, 5000); // Notification visible pendant 5 secondes
    },
  },
});

