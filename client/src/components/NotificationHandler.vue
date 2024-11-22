<template>
  <div v-if="message" class="message">
    {{ message }}
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { Notyf } from 'notyf';

export default {
  name: 'NotificationHandler',
  setup() {
    const notyf = new Notyf();
    const message = ref('');

    const notifications = [
      "Il y a des questionnaires à faire.",
      "Vous pouvez composer votre repas.",
    ];

    onMounted(() => {
      setInterval(() => {
        const randomMessage = notifications[Math.floor(Math.random() * notifications.length)];
        message.value = randomMessage;
        notyf.open({ message: randomMessage, duration: 3000 });
      }, 30000);
    });

    return {
      message,
    };
  },
};
</script>

<style scoped>
.message {
  position: fixed;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
  background-color: #ffcc00;
  padding: 10px;
  border-radius: 5px;
  color: #000;
}
</style>

