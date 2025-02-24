<template>
  <div class="color-scale">
    <svg
      width="700"
      height="350"
      viewBox="0 0 300 150"
      role="img"
      aria-labelledby="colorScaleTitle"
    >
      <title id="colorScaleTitle"></title>
      <path
        v-for="(segment, index) in segments"
        :key="index"
        :d="getSegmentPath(index)"
        :fill="segment.color"
        :class="{ selected: index === selectedIndex }"
        @click="handleSegmentClick(index)"
        @mouseover="hoverSegment(index)"
        @mouseleave="hoverSegment(null)"
        aria-label="Segment {{ index + 1 }}"
      />
    </svg>
    <div v-if="hoveredIndex !== null" class="hover-info">
      {{ segments[hoveredIndex].info }}
    </div>
    <div class="options">
      <button @click="selectOption('never')">Jamais</button>
      <button @click="selectOption('unknown')">Je ne sais pas</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ColorScale',
  props: {
    value: {
      type: Number,
      default: 3, // Valeur par défaut au centre (4ème segment)
    },
  },
  data() {
    return {
      segments: [
        { color: '#FF0000', info: '1-3 fois/semaine' },
        { color: '#FF7F00', info: '4-6 fois/semaine' },
        { color: '#FFFF00', info: '1 fois/jour' },
        { color: '#00FF00', info: '2 fois/jour' },
        { color: '#0000FF', info: '3 fois/jour' },
        { color: '#8B00FF', info: '4 fois ou +/jour' },
      ],
      selectedIndex: null,
      hoveredIndex: null,
      rotation: 90,
    };
  },
  methods: {
    getSegmentPath(index) {
      const startAngle = -90 + index * 30 + this.rotation;
      const endAngle = startAngle + 30;
      const start = this.polarToCartesian(150, 100, 100, startAngle);
      const end = this.polarToCartesian(150, 100, 100, endAngle);
      const largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1';

      return [
        'M', start.x, start.y,
        'A', 100, 100, 0, largeArcFlag, 1, end.x, end.y,
        'L', 150, 100,
        'Z',
      ].join(' ');
    },
    polarToCartesian(centerX, centerY, radius, angleInDegrees) {
      const angleInRadians = (angleInDegrees * Math.PI) / 180.0;
      return {
        x: centerX + (radius * Math.cos(angleInRadians)),
        y: centerY - (radius * Math.sin(angleInRadians)),
      };
    },
    handleSegmentClick(index) {
      this.selectedIndex = index;
      this.$emit('input', index);
      setTimeout(() => {
        this.$emit('next-question'); // Émet un événement pour passer à la question suivante après 2 secondes
        this.selectedIndex = null; // Réinitialise la sélection
      }, 2000);
    },
    hoverSegment(index) {
      this.hoveredIndex = index;
    },
    selectOption(option) {
      if (option === 'never') {
        this.$emit('input', -1);
      } else if (option === 'unknown') {
        this.$emit('input', 6);
      }
      this.$emit('next-question');
      this.selectedIndex = null; // Réinitialise la sélection
    },
  },
};
</script>

<style scoped>
.color-scale {
  text-align: center;
  position: relative;
  width: 600px;
  margin: 0 auto;
  margin-right: 680px;
}

path {
  cursor: pointer;
  transition: stroke 0.3s ease;
}

path.selected {
  stroke: #000;
  stroke-width: 4;
  stroke-opacity: 0.8;
}

.hover-info {
  position: absolute;
  top: 50%;
  left: 58%;
  transform: translate(-50%, -50%);
  background: rgba(0, 0, 0, 0.7);
  color: #fff;
  padding: 8px 16px;
  margin-top: -50px;
  border-radius: 4px;
  font-size: 14px;
  text-align: center;
  z-index: 10;
}

.options {
  position: relative;
  margin-top: -220px;
  margin-left: 160px;
  display: flex;
  justify-content: space-between;
}

button {
  position: absolute;
  top: 100px;
  padding: 12px 24px;
  font-size: 18px;
  border-radius: 8px;
  background-color: #f0f0f0;
  border: 1px solid #ccc;
  cursor: pointer;
  transition: background-color 0.2s;
}

button:hover {
  background-color: #e0e0e0;
}

button:first-child {
  left: -130px;
}

button:last-child {
  right: -130px;
}
</style>
