<template>
  <div class="home">
    <!-- Nouveau titre -->
    <h1 class="main-title">Transformer vos habitudes alimentaires en jeu captivant</h1>
    <h2 class="sub-title">Développer un mode de vie plus sain en relevant des défis nutritionnels, tout en vous amusant à choisir vos repas et à répondre aux questionnaires et à suivre votre progrès</h2>

    <!-- Section avec les cartes créatives -->
    <section class="creative-cards style-one">
      <div class="container">
        <div class="row">
          <div class="card-column">
            <div class="card-details slide-in-left-delay-1">
              <div class="card-icons">
                <img class="light-icon" src="../assets/defis.png" alt="icon" />
              </div>
              <h3><a href="/challenges">Défis</a></h3>
              <p>Répondez à des questionnaires pour évaluer <br> et suivre vos habitudes alimentaires. Recevez des conseils personnalisés pour améliorer votre régime.</p>
              <a class="read-more-btn" href="/challenges"><i class="fa-solid fa-angles-right"></i></a>
            </div>
          </div>
          <div class="card-column">
            <div class="card-details slide-in-left-delay-2">
              <div class="card-icons">
                <img class="light-icon" src="../assets/recettes.png" alt="icon" />
              </div>
              <h3><a href="/recipes">Recettes</a></h3>
              <p>Créez et personnalisez vos plats en sélectionnant des ingrédients, puis vérifiez leur valeur nutritionnelle et obtenez un feedback sur vos choix.</p>
              <a class="read-more-btn" href="/recipes"><i class="fa-solid fa-angles-right"></i></a>
            </div>
          </div>
          <div class="card-column">
            <div class="card-details slide-in-left-delay-3">
              <div class="card-icons">
                <img class="light-icon" src="../assets/score.png" alt="icon" />
              </div>
              <h3><a href="/score">Score</a></h3>
              <p>Consultez vos scores et performances basés sur les questionnaires et les feedbacks de recettes. Suivez vos progrès et ajustez vos objectifs alimentaires.</p>
              <a class="read-more-btn" href="/score"><i class="fa-solid fa-angles-right"></i></a>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
document.querySelectorAll('a').forEach(anchor => {
  anchor.addEventListener('click', function(event) {
    window.open(this.href); 
  });
});
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Epilogue:ital,wght@0,100..900;1,100..900&display=swap');

.home {
  text-align: center;
  margin-top: 50px;
}

/* Nouveau titre et sous-titre */
.main-title {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 20px;
  color: #000;
}

.sub-title {
  font-size: 1.25rem;
  font-weight: 400;
  color: #444;
  margin-bottom: 40px;
}

/* Styles pour la section des cartes créatives */
.creative-cards {
  padding: 120px 0;
  position: relative;
}

.creative-cards .container {
  max-width: 1320px;
  width: 100%;
  margin: auto;
}

.creative-cards .container .row {
  display: flex;
  flex-wrap: wrap;
}

.creative-cards .container .row .card-column {
  flex: 0 0 auto;
  width: 33.33333333%;
  text-align: center;
  padding-right: 15px;
  padding-left: 15px;
}

.card-details {
  width: 80%;
  margin: auto;
  position: relative;
  transition: .3s ease-in-out;
}

.card-details:before {
  content: "";
  width: 190px;
  height: 380px;
  background: #f7f6f2;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%) skew(-20deg, 0deg);
  z-index: -1;
  transition: .3s ease-in-out;
}

.card-details:hover:before {
  background-color: #fffab3;
}

.card-icons {
  width: 140px;
  height: 150px;
  position: relative;
  margin: auto;
  display: flex;
  align-items: center;
  justify-content: center;
}

.card-icons:before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  border: 1px solid;
  width: 100%;
  height: 100%;
  transform: skew(-20deg, 0deg);
  background: #fff;
  border-color: #ffee02;
  transition: .3s ease-in-out;
}

.card-details:hover .card-icons:before {
  background-color: #ffee02;
}

.card-icons img {
  position: relative;
  width: 70px;
  height: 70px;
}

.card-details h3 {
  margin-bottom: 15px;
  margin-top: 50px;
  font-weight: 700;
  font-size: 1.75rem;
  line-height: 1.2;
}

.card-details h3 a {
  color: #000;
  text-decoration: none;
}

.card-details p {
  font-size: 16px;
  line-height: 30px;
  color: #444;
  font-weight: 400;
  margin-bottom: 30px;
}

.read-more-btn {
  width: 50px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid;
  border-radius: 100%;
  margin: auto;
  background: #fff;
  transform: translateX(-10px);
  opacity: 0;
  visibility: hidden;
  border-color: #ffee02;
  transition: .3s ease-in-out;
  text-decoration: none;
}

.read-more-btn i {
  color: #000;
  font-size: 12px;
}

.card-details:hover .read-more-btn {
  transform: translateX(0);
  opacity: 1;
  visibility: visible;
}

/* Animation */
@keyframes slideInLeft {
  0% {
    opacity: 0;
    transform: translateX(-100%);
  }
  100% {
    opacity: 1;
    transform: translateX(0);
  }
}

.slide-in-left-delay-1 {
  animation: slideInLeft 1.5s ease-out;
}

.slide-in-left-delay-2 {
  animation: slideInLeft 2.5s ease-out;
}

.slide-in-left-delay-3 {
  animation: slideInLeft 3.5s ease-out;
}

/* Responsive Ipad */
@media (max-width: 992px) {
  .creative-cards .container .row .card-column {
    flex: 0 0 auto;
    width: 50%;
    margin-bottom: 40px;
  }
}

/* Responsive Iphone */
@media (max-width: 480px) {
  .creative-cards .container .row .card-column {
    flex: 0 0 auto;
    width: 100%;
    margin-bottom: 20px;
  }
  .card-details {
    width: 100%;
  }
  .read-more-btn {
    transform: translateX(0px);
    opacity: 1;
    visibility: visible;
  }
}
</style>
