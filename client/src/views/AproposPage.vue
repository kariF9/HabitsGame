<template>
  <div class="container">
    <picture>
      <img src="../assets/Apropos.jpg" alt="background">
    </picture>
    <figure>
      <h1>Bienvenue sur HabitsGame</h1>
      <figcaption>
        HabitsGame est une application innovante conçue pour la collecte et l'analyse des habitudes alimentaires. Elle permet aux utilisateurs de suivre et d'évaluer leur alimentation quotidienne, offrant une vue détaillée de leurs choix alimentaires. Grâce à une interface intuitive, HabitsGame facilite la saisie des repas et des collations, et fournit des recommandations personnalisées pour encourager des habitudes alimentaires plus saines. Avec des fonctionnalités motivantes telles que des objectifs, des défis et des récompenses, cette application aide les utilisateurs à adopter un mode de vie équilibré et à atteindre leurs objectifs de santé.
      </figcaption>
    </figure>
  </div>
</template>

<script>
export default {
  name: 'AproposPage',
}
</script>

<style scoped>
/* Global Reset */
*:not(head, script, svg, svg *),
*:not(head, script, svg, svg *)::before,
*:not(head, script, svg, svg *)::after {
  all: unset;
  box-sizing: border-box;
}

body,
html {
  overflow: hidden;
}

body {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  margin: 0;
  background: black;
  color: white;
}

/* Container to ensure relative positioning */
.container {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 87.8vh;
  overflow: hidden;
  margin: 0;
}

/* Picture element for background image */
picture {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: 0; /* Ensure the image is behind the text */
}

picture img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* Figure styling with animations */
figure {
  position: absolute;
  width: 100%;
  max-width: 700px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  padding: 30px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 1; /* Ensure the text is above the image */
  -webkit-animation: c 10s linear infinite;
          animation: c 10s linear infinite;
}

@-webkit-keyframes c {
  from {
    backdrop-filter: blur(2vmin) hue-rotate(0deg);
    -webkit-backdrop-filter: blur(2vmin) hue-rotate(0deg);
  }
  to {
    backdrop-filter: blur(2vmin) hue-rotate(360deg);
    -webkit-backdrop-filter: blur(2vmin) hue-rotate(360deg);
  }
}

@keyframes c {
  from {
    backdrop-filter: blur(2vmin) hue-rotate(0deg);
    -webkit-backdrop-filter: blur(2vmin) hue-rotate(0deg);
  }
  to {
    backdrop-filter: blur(2vmin) hue-rotate(360deg);
    -webkit-backdrop-filter: blur(2vmin) hue-rotate(360deg);
  }
}

/* Heading and caption styles */
h1 {
  font-family: "Major Mono Display", monospace;
  font-size: 40px;
  line-height: 1.5;
  color: white;
  margin-bottom: 20px;
}

figcaption {
  font-family: "Figtree", sans-serif;
  font-size: 18px;
  font-weight: 400;
  line-height: 2;
  padding-left: 30px;
  border-left: 1px solid white;
  color: #bbb;
}

/* Responsive styles */
@media (max-width: 780px) {
  figure {
    max-width: 90%;
  }
}

@media (max-width: 600px) {
  h1 {
    font-size: 32px;
  }
  figcaption {
    font-size: 16px;
  }
}

/* Animation for background effects */
picture::before {
  position: absolute;
  top: 0;
  left: 0;
  width: 25%;
  height: 25%;
  background-color: transparent;
  content: "";
  -webkit-animation: a 20s ease infinite;
          animation: a 20s ease infinite;
}

@-webkit-keyframes a {
  0% {
    width: 25%;
    height: 25%;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    backdrop-filter: blur(2vmin) hue-rotate(0deg);
    -webkit-backdrop-filter: blur(2vmin) hue-rotate(0deg);
  }
  12.49% {
    left: 0;
  }
  12.5% {
    width: 100%;
    left: unset;
    backdrop-filter: blur(0vmin) hue-rotate(150deg);
    -webkit-backdrop-filter: blur(0vmin) hue-rotate(150deg);
  }
  25% {
    width: 25%;
    height: 25%;
    backdrop-filter: blur(2vmin) hue-rotate(300deg);
    -webkit-backdrop-filter: blur(2vmin) hue-rotate(300deg);
  }
  37.49% {
    top: 0;
    bottom: 0;
  }
  37.5% {
    top: unset;
    height: 100%;
    backdrop-filter: blur(0vmin) hue-rotate(150deg);
    -webkit-backdrop-filter: blur(0vmin) hue-rotate(150deg);
  }
  50% {
    width: 25%;
    height: 25%;
    backdrop-filter: blur(2vmin) hue-rotate(0deg);
    -webkit-backdrop-filter: blur(2vmin) hue-rotate(0deg);
  }
  62.49% {
    left: unset;
    right: 0;
  }
  62.5% {
    right: unset;
    width: 100%;
    height: 100%;
    backdrop-filter: blur(0vmin) hue-rotate(150deg);
    -webkit-backdrop-filter: blur(0vmin) hue-rotate(150deg);
  }
  74.9% {
    top: unset;
    bottom: 0;
  }
  75% {
    width: 25%;
    height: 25%;
    backdrop-filter: blur(2vmin) hue-rotate(300deg);
    -webkit-backdrop-filter: blur(2vmin) hue-rotate(300deg);
  }
  87.49% {
    top: unset;
    bottom: 0;
  }
  87.5% {
    height: 100%;
    top: 0;
    backdrop-filter: blur(0vmin) hue-rotate(150deg);
    -webkit-backdrop-filter: blur(0vmin) hue-rotate(150deg);
  }
  100% {
    width: 25%;
    height: 25%;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    backdrop-filter: blur(2vmin) hue-rotate(0deg);
    -webkit-backdrop-filter: blur(2vmin) hue-rotate(0deg);
  }
}

@keyframes a {
  0% {
    width: 25%;
    height: 25%;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    backdrop-filter: blur(2vmin) hue-rotate(0deg);
    -webkit-backdrop-filter: blur(2vmin) hue-rotate(0deg);
  }
  12.49% {
    left: 0;
  }
  12.5% {
    width: 100%;
    left: unset;
    backdrop-filter: blur(0vmin) hue-rotate(150deg);
    -webkit-backdrop-filter: blur(0vmin) hue-rotate(150deg);
  }
  25% {
    width: 25%;
    height: 25%;
    backdrop-filter: blur(2vmin) hue-rotate(300deg);
    -webkit-backdrop-filter: blur(2vmin) hue-rotate(300deg);
  }
  37.49% {
    top: 0;
    bottom: 0;
  }
  37.5% {
    top: unset;
    height: 100%;
    backdrop-filter: blur(0vmin) hue-rotate(150deg);
    -webkit-backdrop-filter: blur(0vmin) hue-rotate(150deg);
  }
  50% {
    width: 25%;
    height: 25%;
    backdrop-filter: blur(2vmin) hue-rotate(0deg);
    -webkit-backdrop-filter: blur(2vmin) hue-rotate(0deg);
  }
  62.49% {
    left: unset;
    right: 0;
  }
  62.5% {
    right: unset;
    width: 100%;
    height: 100%;
    backdrop-filter: blur(0vmin) hue-rotate(150deg);
    -webkit-backdrop-filter: blur(0vmin) hue-rotate(150deg);
  }
  74.9% {
    top: unset;
    bottom: 0;
  }
  75% {
    width: 25%;
    height: 25%;
    backdrop-filter: blur(2vmin) hue-rotate(300deg);
    -webkit-backdrop-filter: blur(2vmin) hue-rotate(300deg);
  }
  87.49% {
    top: unset;
    bottom: 0;
  }
  87.5% {
    height: 100%;
    top: 0;
    backdrop-filter: blur(0vmin) hue-rotate(150deg);
    -webkit-backdrop-filter: blur(0vmin) hue-rotate(150deg);
  }
  100% {
    width: 25%;
    height: 25%;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    backdrop-filter: blur(2vmin) hue-rotate(0deg);
    -webkit-backdrop-filter: blur(2vmin) hue-rotate(0deg);
  }
}
</style>
