<template>
  <div class="page-container">
    <!-- Catégories alimentaires à gauche -->
    <div class="food-categories left-categories">
      <h2>Catégories Alimentaires</h2>
      <div v-for="(food, category) in foodCategories" :key="category" class="food-category">
        <h3>{{ category }}</h3>
        <div class="food-icons">
          <img v-for="item in food" :key="item.name" :src="item.icon" @click="selectDish(item.icon, category)" class="food-icon" />
        </div>
      </div>
    </div>

    <!-- Contenu central -->
    <div class="central-content">
      <h1>Page de Recettes</h1>
      <div class="plate-container">
        <!-- Grande assiette pour le repas principal -->
        <div class="plate large-plate" ref="mainPlate">
          <div class="plate-content">
            <img v-if="mainDish" :src="mainDish" alt="Main Dish" class="food-icon" />
          </div>
        </div>

        <!-- Petite assiette pour l'entrée -->
        <div class="plate small-plate" ref="starterPlate">
          <div class="plate-content">
            <img v-if="starterDish" :src="starterDish" alt="Starter Dish" class="food-icon" />
          </div>
        </div>

        <!-- Petite assiette pour le dessert -->
        <div class="plate small-plate" ref="dessertPlate">
          <div class="plate-content">
            <img v-if="dessertDish" :src="dessertDish" alt="Dessert Dish" class="food-icon" />
          </div>
        </div>

        <!-- Icône de boisson -->
        <div class="plate drink-plate" ref="drinkPlate">
          <div class="plate-content">
            <img :src="require('@/assets/verre.png')" alt="Drink" class="drink-icon" />
          </div>
        </div>
      </div>
    </div>

    <!-- Catégories alimentaires à droite -->
    <div class="food-categories right-categories">
      <h2>Catégories Alimentaires</h2>
      <div v-for="(food, category) in foodCategories" :key="category" class="food-category">
        <h3>{{ category }}</h3>
        <div class="food-icons">
          <img v-for="item in food" :key="item.name" :src="item.icon" @click="selectDish(item.icon, category)" class="food-icon" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RecipePage',
  data() {
    return {
      foodCategories: {
        "Entrées": [
          { name: "Salade", icon: "path/to/salad-icon.png" },
          { name: "Soupe", icon: "path/to/soup-icon.png" }
        ],
        "Plats Principaux": [
          { name: "Steak", icon: "path/to/steak-icon.png" },
          { name: "Pâtes", icon: "path/to/pasta-icon.png" }
        ],
        "Desserts": [
          { name: "Gâteau", icon: "path/to/cake-icon.png" },
          { name: "Glace", icon: "path/to/ice-cream-icon.png" }
        ],
        "Boissons": [
          { name: "Eau", icon: "path/to/water-icon.png", color: "blue" },
          { name: "Jus", icon: "path/to/juice-icon.png", color: "orange" }
        ]
      },
      mainDish: null,
      starterDish: null,
      dessertDish: null,
      drinkIcon: "path/to/empty-glass-icon.png",
    };
  },
  methods: {
    selectDish(icon, category) {
      if (category === "Entrées") {
        this.starterDish = icon;
      } else if (category === "Plats Principaux") {
        this.mainDish = icon;
      } else if (category === "Desserts") {
        this.dessertDish = icon;
      } else if (category === "Boissons") {
        this.drinkIcon = icon;
        // Changer la couleur de l'icône de boisson
        this.$refs.drinkPlate.style.backgroundColor = this.foodCategories[category].find(item => item.icon === icon).color;
      }
    },
  },
};
</script>

<style scoped>
.page-container {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 20px;
  height: 100vh; /* Ajustez la hauteur selon vos besoins */
}

.food-categories {
  width: 20%; /* Ajustez la largeur en fonction de vos besoins */
}

.left-categories {
  text-align: left;
}

.right-categories {
  text-align: right;
}

.central-content {
  width: 60%; /* Ajustez la largeur en fonction de vos besoins */
  text-align: center;
}

.plate-container {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  margin-bottom: 20px;
}

.plate {
  border: 3px solid #ccc;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.large-plate {
  width: 300px;
  height: 300px;
  background-image: url('../assets/plat.png'); /* Vérifiez ce chemin */
  background-size: 131% 131%; /* S'assure que l'image couvre toute la zone */
  background-position: center; /* Centre l'image dans l'élément */
  background-repeat: no-repeat; /* Évite que l'image se répète */
  border-radius: 50%; /* Assure que l'élément est circulaire */
  border: 2px solid #ccc; /* Ajoute une bordure pour visualiser l'élément */
}

.small-plate {
  width: 150px;
  height: 150px;
  background-image: url('../assets/plat.png'); /* Vérifiez ce chemin */
  background-size: 131% 131%; /* S'assure que l'image couvre toute la zone */
  background-position: center; /* Centre l'image dans l'élément */
  background-repeat: no-repeat; /* Évite que l'image se répète */
  border-radius: 50%; /* Assure que l'élément est circulaire */
  border: 2px solid #ccc; /* Ajoute une bordure pour visualiser l'élément */
}

.drink-plate {
  width: 150px;
  height: 150px;
}

.plate-content {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
}

.drink-icon {
  width: 100px; /* Ajustez la largeur selon vos besoins */
  height: auto;
}

.food-icon {
  width: 80%;
  height: auto;
}

.food-categories h2 {
  margin-bottom: 20px;
}

.food-category {
  margin-bottom: 20px;
}

.food-icons {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}

.food-icon {
  width: 50px;
  height: 50px;
  margin: 5px;
  cursor: pointer;
  transition: transform 0.3s;
}

.food-icon:hover {
  transform: scale(1.1);
}
</style>

