<template>
  <div class="homepage">
    <div class="intro-section">
      <h1>Transformer vos habitudes alimentaires en jeu captivant</h1>
      <h2>
        Développez un mode de vie plus sain en relevant des défis nutritionnels,
        tout en vous amusant à choisir vos repas, répondre aux questionnaires,
        et suivre vos progrès.
      </h2>
    </div>

    <div class="pnns-section">
      <h1>Qu'est-ce que le PNNS ?</h1>
      <h2>
        Le Programme National Nutrition Santé (PNNS) est une initiative
        française visant à améliorer la santé publique à travers des actions
        nutritionnelles. Il promeut une alimentation équilibrée, l'activité
        physique régulière, et la prévention des maladies liées à la nutrition.
      </h2>
    </div>

    <div class="carousel-container">
      <div class="carousel" :style="{ transform: translateX }">
        <div class="carousel-slide">
          <h4>alimentation</h4>
          <img src="https://docteurbonnebouffe.com/wp-content/uploads/2019/02/PNNS-4-recommandations-nutritionnelles.jpg" alt="Alimentation" width="400" height="240" />
        </div>
        <div class="carousel-slide">
          <h4>Labélisation</h4>
          <img src="https://www.normandie.ars.sante.fr/system/files/2024-04/site-PNNS.jpg" alt="Labélisation" width="400" height="240" />
        </div>
        <div class="carousel-slide">
          <h4>Exercice</h4>
          <img src="https://www.bourgogne-franche-comte.ars.sante.fr/system/files/2017-09/PNNS-Logo_678x454.jpg" alt="Exercice" width="400" height="240" />
        </div>
      </div>
      <button class="arrow left" @click="prevSlide">&#10094;</button>
      <button class="arrow right" @click="nextSlide">&#10095;</button>
    </div>
    <div>
      <a href="https://www.mangerbouger.fr/" target="_blank" class="pnns-button">Découvrir le PNNS</a>
    </div>
  </div>
</template>

<script>
export default {
  name: "HomePage2",
  data() {
    return {
      currentIndex: 0,
      interval: null, // Pour stocker l'intervalle
    };
  },
  methods: {
    nextSlide() {
      this.currentIndex = (this.currentIndex + 1) % 3; // 3 est le nombre de diapositives
    },
    prevSlide() {
      this.currentIndex = (this.currentIndex - 1 + 3) % 3; // 3 est le nombre de diapositives
    },
    startAutoSlide() {
      this.interval = setInterval(this.nextSlide, 5000); // Change toutes les 5 secondes
    },
    stopAutoSlide() {
      clearInterval(this.interval); // Arrête le changement automatique
    },
  },
  computed: {
    translateX() {
      return `translateX(-${this.currentIndex * 100}%)`; // Déplacement basé sur l'index actuel
    },
  },
  mounted() {
    this.startAutoSlide(); // Démarre le changement automatique lorsque le composant est monté
  },
  beforeDestroy() {
    this.stopAutoSlide(); // Arrête le changement automatique lorsque le composant est détruit
  },
};
</script>

<style scoped>
h1 {
  font-size: 40px;
  margin-bottom: 15px;
}
h2 {
  font-size: 22px;
  padding-top: 15px;
  padding-bottom: 15px;
}
h4 {
  font-weight: bold;
}
.intro-section {
  margin-top: 80px;
}
.carousel-container {
  position: relative;
  width: 90%;
  margin: 0 auto;
  overflow: hidden; /* Cache les débordements */
}

.carousel {
  display: flex;
  transition: transform 0.5s ease-in-out; /* Transition douce lors du changement de diapositive */
}

.carousel-slide {
  min-width: 100%; /* Chaque diapositive occupe 100% de l'espace */
  text-align: center; /* Centrer le contenu */
}

.carousel img {
  border-radius: 10px; /* Coins arrondis pour les images */
  display: block; /* Pour assurer que l'image soit un bloc */
  margin: 0 auto; /* Centrer l'image */
}

.carousel h4 {
  font-size: 1.2em; /* Taille de police pour les titres */
  margin: 10px 0; /* Espacement autour du titre */
}

.arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background-color: rgba(255, 255, 255, 0.8);
  border: none;
  border-radius: 50%;
  padding: 10px;
  cursor: pointer;
  z-index: 10;
}

.left {
  left: 30%; /* Ajuste la position pour être plus proche du centre */
}

.right {
  right: 30%; /* Ajuste la position pour être plus proche du centre */
}

.pnns-button {
  position: absolute;
  bottom: 30px; /* Espace depuis le bas, ajusté pour être plus bas */
  left: 50%; /* Centrer horizontalement */
  transform: translateX(-50%); /* Ajuster pour centrer le bouton */
  padding: 10px 20px; /* Espacement à l'intérieur du bouton */
  background-color: black; /* Couleur de fond */
  color: white; /* Couleur du texte */
  border: none;
  border-radius: 5px;
  text-decoration: none; /* Enlever le soulignement */
  opacity: 0; /* Commence invisible pour l'animation */
  animation: slideIn 3s forwards; /* Animation d'entrée sur 3 secondes */
  transition: transform 0.3s; /* Transition douce pour l'animation */
}

.pnns-button:hover {
 
  background-color: #a9a9a9;
}

@keyframes slideIn {
  0% {
    transform: translateX(-100%); /* Commence à gauche */
    opacity: 0; /* Invisible au début */
  }
  100% {
    transform: translateX(-50%); /* Se déplace vers le centre */
    opacity: 1; /* Devenu visible */
  }
}
</style>
