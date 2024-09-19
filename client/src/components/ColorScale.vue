<template>
  <div class="color-scale">
    <svg
      width="400"
      height="250"
      viewBox="0 0 300 150"
      role="img"
      aria-labelledby="colorScaleTitle"
    >
      <title id="colorScaleTitle">Échelle des couleurs pour répondre aux questions</title>
      <path
        v-for="(segment, index) in segments"
        :key="index"
        :d="getSegmentPath(index)"
        :fill="segment.color"
        :class="{ selected: index === selectedIndex }"
        @click="handleSegmentClick(index)"
        aria-label="Segment {{ index + 1 }}"
      />
    </svg>
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
        { color: '#FF0000' }, // Rouge
        { color: '#FF7F00' }, // Orange
        { color: '#FFFF00' }, // Jaune
        { color: '#00FF00' }, // Vert
        { color: '#0000FF' }, // Bleu
        { color: '#8B00FF' }, // Violet
      ],
      selectedIndex: null, // Index du segment sélectionné
      rotation: 90 // Rotation initiale en degrés
    };
  },
  methods: {
    getSegmentPath(index) {
      const startAngle = -90 + index * 30 + this.rotation; // Inclure la rotation
      const endAngle = startAngle + 30;
      const start = this.polarToCartesian(150, 100, 100, startAngle);
      const end = this.polarToCartesian(150, 100, 100, endAngle);
      const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";
      
      return [
        "M", start.x, start.y, 
        "A", 100, 100, 0, largeArcFlag, 1, end.x, end.y,
        "L", 150, 100,
        "Z"
      ].join(" ");
    },
    polarToCartesian(centerX, centerY, radius, angleInDegrees) {
      const angleInRadians = (angleInDegrees * Math.PI) / 180.0;
      return {
        x: centerX + (radius * Math.cos(angleInRadians)),
        y: centerY - (radius * Math.sin(angleInRadians))
      };
    },
    handleSegmentClick(index) {
      this.selectedIndex = index;
      this.$emit('input', index);
      setTimeout(() => {
        this.$emit('next-question'); // Émet un événement pour passer à la question suivante après 2 secondes
      }, 2000);
    },
    selectOption(option) {
      if (option === 'never') {
        this.$emit('input', -1);
      } else if (option === 'unknown') {
        this.$emit('input', 6);
      }
      this.$emit('next-question'); // Émet un événement pour passer à la question suivante
    },
    clearSelection() {
      this.selectedIndex = null;
      this.$emit('input', null); // Émet une valeur nulle pour indiquer aucune sélection
    },
    rotateArc(degrees) {
      this.rotation += degrees; // Modifie la valeur de rotation
    }
  },
};
</script>

<style scoped>
.color-scale {
  text-align: center;
  margin-top: 40px;
  margin-left: 720px;
}

path {
  cursor: pointer;
  transition: stroke 0.3s ease;
}

path.selected {
  stroke: #000;
  stroke-width: 4;
  stroke-opacity: 0.8; /* Ajuste l'opacité de la bordure si nécessaire */
}

.options {
  margin-top: -60px;
  margin-right: 700px;
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
