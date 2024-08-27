<template>
  <div class="color-scale">
    <svg
      width="400"
      height="250"
      viewBox="0 0 300 150"
      @mousedown="startDragging"
      @mousemove="drag"
      @mouseup="stopDragging"
    >
      <!-- Arc -->
      <path
        d="M 50 100 A 120 120 0 0 1 250 100"
        fill="none"
        stroke="url(#gradient)"
        stroke-width="20"
      />
      <!-- Gradient for color scale -->
      <defs>
        <linearGradient id="gradient">
          <stop offset="0%" stop-color="red" />
          <stop offset="50%" stop-color="yellow" />
          <stop offset="100%" stop-color="green" />
        </linearGradient>
      </defs>
      <!-- Needle -->
      <line
        :x1="needleX1"
        :y1="needleY1"
        :x2="needleX2"
        :y2="needleY2"
        stroke="black"
        stroke-width="4"
      />
    </svg>

    <div class="options">
      <button @click="selectOption('never')">Jamais</button>
      <button @click="selectOption('daily')">Tous les jours</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ColorScale',
  props: {
    value: {
      type: Number,
      default: 50, // Valeur par défaut au centre
    },
  },
  data() {
    return {
      dragging: false,
      dragTimeout: null,
    };
  },
  computed: {
    needleX1() {
      return 150; // Centre de l'arc
    },
    needleY1() {
      return 140; // Centre de l'arc
    },
    needleX2() {
      const angle = (50 - this.value) * 1.8 + 90; // Ajustement de l'angle pour être entre -90° et 90°
      const radians = (angle * Math.PI) / 180;
      return 150 + 100 * Math.cos(radians);
    },
    needleY2() {
      const angle = (50 - this.value) * 1.8 + 90;
      const radians = (angle * Math.PI) / 180;
      return 100 - 100 * Math.sin(radians);
    },
  },
  methods: {
    startDragging(event) {
      this.dragging = true;
      this.drag(event);
    },
    drag(event) {
      if (this.dragging) {
        const rect = event.target.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        const angle = Math.atan2(100 - y, x - 150);
        let value = ((angle * 180) / Math.PI + 90) / 1.8 + 50;

        if (value < 0) value = 0;
        if (value > 100) value = 100;

        this.$emit('input', value);
      }
    },
    stopDragging() {
      this.dragging = false;
      clearTimeout(this.dragTimeout);
      this.dragTimeout = setTimeout(() => {
        this.$emit('input-done');
      }, 3000);
    },
    selectOption(option) {
      this.$emit('input', option === 'never' ? 0 : 100);
      this.$emit('input-done');
    },
  },
};
</script>

<style scoped>
.color-scale {
  text-align: center;
  margin-top: 20px;
}

.options {
  margin-top: 20px;
  display: flex;
  justify-content: space-around;
}

button {
  padding: 10px 20px;
  font-size: 16px;
  border-radius: 5px;
  background-color: #f0f0f0;
  border: 1px solid #ccc;
  cursor: pointer;
  transition: background-color 0.2s;
}

button:hover {
  background-color: #e0e0e0;
}
</style>
