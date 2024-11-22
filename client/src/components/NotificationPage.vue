<template>
  <div v-if="notifications.length" class="notification-container">
    <transition-group name="fade" tag="div">
      <div
        v-for="(notification, index) in notifications"
        :key="index"
        class="notification"
      >
        {{ notification.message }}
        <button @click="removeNotification(index)" class="close-button">✖</button>
      </div>
    </transition-group>
  </div>
</template>

<script>
export default {
  data() {
    return {
      notifications: [],
    };
  },
  created() {
    window.addEventListener('notification', this.addNotification);
  },
  beforeDestroy() {
    window.removeEventListener('notification', this.addNotification);
  },
  methods: {
    addNotification(event) {
      this.notifications.push(event.detail);
      setTimeout(() => this.removeNotification(0), 5000);
    },
    removeNotification(index) {
      this.notifications.splice(index, 1);
    },
  },
};
</script>

<style scoped>
.notification-container {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 1000;
}

.notification {
  background-color: #4caf50;
  color: white;
  padding: 15px;
  margin-bottom: 10px;
  border-radius: 5px;
  animation: slide-in 0.5s forwards;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.close-button {
  background: none;
  border: none;
  color: white;
  font-size: 16px;
  cursor: pointer;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}

@keyframes slide-in {
  from {
    transform: translateY(-20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}
</style>

