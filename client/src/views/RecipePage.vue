<template>
  <div class="page-container">
    <!-- Catégories alimentaires à gauche -->
    <div class="food-categories left-categories">
      <h2>Catégories Alimentaires</h2>
      <div v-for="(food, category) in leftCategories" :key="category" class="food-category">
        <h3>{{ category }}</h3>
        <div class="food-icons">
          <div v-for="item in food" :key="item.name" class="draggable-container">
            <img :src="require(`@/assets/${item.icon}`)" 
                 @dragstart="startDrag($event, item.icon, category)" 
                 @dragend="dragEnd"
                 class="food-icon" 
                 draggable="true"/>
          </div>
        </div>
      </div>
    </div>

    <!-- Contenu central -->
    <div class="central-content">
      <h1>Ma recette</h1>
      <div class="plate-container">
        <!-- Petite assiette pour l'entrée -->
        <div class="plate-container-item">
          <div class="plate-title">Entrée</div>
          <div class="plate small-plate entry-plate" @drop="drop($event, 'starter')" @dragover="allowDrop($event)">
            <div class="plate-content">
              <img v-for="dish in starterDish" :key="dish" :src="require(`@/assets/${dish}`)" alt="Entrée" class="food-icon" />
            </div>
          </div>
        </div>

        <!-- Grande assiette pour le plat principal -->
        <div class="plate-container-item">
          <div class="plate-title">Plat Principal</div>
          <div class="plate large-plate" @drop="drop($event, 'main')" @dragover="allowDrop($event)">
            <div class="plate-content">
              <img v-for="dish in mainDish" :key="dish" :src="require(`@/assets/${dish}`)" alt="Plat Principal" class="food-icon" />
            </div>
          </div>
        </div>

        <!-- Petite assiette pour le dessert -->
        <div class="plate-container-item">
          <div class="plate-title">Dessert</div>
          <div class="plate small-plate dessert-plate" @drop="drop($event, 'dessert')" @dragover="allowDrop($event)">
            <div class="plate-content">
              <img v-for="dish in dessertDish" :key="dish" :src="require(`@/assets/${dish}`)" alt="Dessert" class="food-icon" />
            </div>
          </div>
        </div>

        <!-- Petite assiette pour la boisson -->
        <div class="plate-container-item">
          <div class="plate-title">Boisson</div>
          <div class="plate small-plate drink-plate" @drop="drop($event, 'drink')" @dragover="allowDrop($event)">
            <div class="plate-content">
              <img v-for="drink in drinkDish" :key="drink" :src="require(`@/assets/${drink}`)" alt="Boisson" class="food-icon" />
            </div>
          </div>
        </div>
      </div>
      <button @click="resetPage" class="reset-button">Réinitialiser la recette</button>
      <button @click="checkRecipe" class="check-button">Vérifier la recette</button>
      <div v-if="healthMessage" class="health-message">{{ healthMessage }}</div>
    </div>

    <!-- Catégories alimentaires à droite -->
    <div class="food-categories right-categories">
      <h2>Catégories Alimentaires</h2>
      <div v-for="(food, category) in rightCategories" :key="category" class="food-category">
        <h3>{{ category }}</h3>
        <div class="food-icons">
          <div v-for="item in food" :key="item.name" class="draggable-container">
            <img :src="require(`@/assets/${item.icon}`)" 
                 @dragstart="startDrag($event, item.icon, category)" 
                 @dragend="dragEnd"
                 class="food-icon" 
                 draggable="true"/>
          </div>
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
      leftCategories: {
        "Légumes et Fruits": [
          { name: "Carotte", icon: "carotte.png" },
          { name: "Tomate", icon: "tomate.png" }
        ],
        "Céréales et Dérivés": [
          { name: "Riz", icon: "riz.png" },
          { name: "Pain", icon: "pain.png" }
        ],
        "Lait et Produits Laitiers": [
          { name: "Lait", icon: "lait.png" },
          { name: "Yaourt", icon: "yaourt.png" }
        ]
      },
      rightCategories: {
        "Viandes, Volailles, Poissons et Produits de la Mer, Œufs": [
          { name: "Boeuf", icon: "boeuf.png" },
          { name: "Saumon", icon: "saumon.png" }
        ],
        "Matières Grasses": [
          { name: "Huile", icon: "huile.png" },
          { name: "Beurre", icon: "beurre.png" }
        ],
        "Sucre et Produits Sucrés": [
          { name: "Sucre", icon: "sucre.png" },
          { name: "Bonbons", icon: "bonbons.png" }
        ],
        "Boissons": [
          { name: "Eau", icon: "eau.png" },
          { name: "Jus", icon: "jus.png" }
        ]
      },
      mainDish: [],
      starterDish: [],
      dessertDish: [],
      drinkDish: [],
      draggedIcon: null,
      draggedCategory: null,
      healthMessage: '',
      healthScore: 100
    };
  },
  methods: {
    startDrag(event, icon, category) {
      event.dataTransfer.setData("text/plain", icon);
      this.draggedIcon = icon;
      this.draggedCategory = category;
    },
    dragEnd(event) {
      this.draggedIcon = null;
      this.draggedCategory = null;
    },
    allowDrop(event) {
      event.preventDefault();
    },
    drop(event, dishType) {
      event.preventDefault();
      const icon = event.dataTransfer.getData("text/plain");
      this.addDish(dishType, icon);
    },
    addDish(dishType, icon) {
      switch (dishType) {
        case 'starter':
          this.starterDish.push(icon);
          break;
        case 'main':
          this.mainDish.push(icon);
          break;
        case 'dessert':
          this.dessertDish.push(icon);
          break;
        case 'drink':
          this.drinkDish.push(icon);
          break;
      }
    },
    resetPage() {
      this.starterDish = [];
      this.mainDish = [];
      this.dessertDish = [];
      this.drinkDish = [];
    },
    checkRecipe() {
      this.healthScore = 100;
      let emptyPlates = 0;

      // Vérification des assiettes vides
      if (this.starterDish.length === 0) {
        emptyPlates += 1;
      }
      if (this.mainDish.length === 0) {
        emptyPlates += 1;
      }
      if (this.dessertDish.length === 0) {
        emptyPlates += 1;
      }
      if (this.drinkDish.length === 0) {
        emptyPlates += 1;
      }

      if (emptyPlates === 4) {
        this.healthMessage = "Vos assiettes sont vides.";
        this.healthScore = 0;
      } else {
        if (this.mainDish.some(dish => this.isFat(dish)) || this.mainDish.some(dish => this.isSugar(dish))) {
          this.healthScore -= 30;
        }
        if (this.starterDish.some(dish => this.isFat(dish)) || this.starterDish.some(dish => this.isSugar(dish))) {
          this.healthScore -= 30;
        }
        if (this.drinkDish.some(drink => !this.isDrink(drink))) {
          this.healthScore -= 30;
        }

        if (this.healthScore === 100) {
          this.healthMessage = `Votre repas est parfaitement sain avec un score de ${this.healthScore}%.`;
        } else if (this.healthScore > 75) {
          this.healthMessage = `Votre repas est sain à ${this.healthScore}%.`;
        } else if (this.healthScore > 50) {
          this.healthMessage = `Votre repas est modérément sain avec un score de ${this.healthScore}%.`;
        } else {
          this.healthMessage = `Attention, votre repas est peu sain avec un score de seulement ${this.healthScore}%.`;
        }
      }
    },
    isFat(dish) {
      // Exemple de logique pour déterminer si un plat est gras
      return dish.includes('huile') || dish.includes('beurre');
    },
    isSugar(dish) {
      // Exemple de logique pour déterminer si un plat est sucré
      return dish.includes('sucre') || dish.includes('bonbons');
    },
    isDrink(drink) {
      // Exemple de logique pour déterminer si un produit est une boisson
      return drink.includes('eau') || drink.includes('jus');
    }
  }
};
</script>

<style scoped>
h1 {
  font-size: 40px;
  font-weight: bold;
}
h2{
  font-size: 30px;
  
}
.page-container {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 20px;
  height: 100vh;
}

.food-categories {
  width: 20%;
}

.left-categories, .right-categories {
  text-align: center;
}

.central-content {
  width: 60%;
  text-align: center;
  position: relative;
}

.plate-container {
  display: flex;
  justify-content: center;
  align-items: flex-end;
  position: relative;
  height: 400px;
}

.plate-container-item {
  position: relative;
  margin: 0 15px;
}

.plate-title {
  position: absolute;
  top: -30px; /* Ajuste la position du titre au-dessus de l'assiette */
  left: 50%;
  transform: translateX(-50%);
  font-size: 16px; /* Ajuste la taille de la police */
  font-weight: bold;
  color: #333; /* Couleur du texte */
}

.large-plate,
.entry-plate,
.dessert-plate,
.drink-plate {
  /* Styles pour les assiettes, comme précédemment */
}

.large-plate {
  width: 250px;
  height: 250px;
  background-image: url('../assets/plat.png');
  background-size: 130% 130%;
  background-position: center;
  background-repeat: no-repeat;
  border-radius: 50%;
  border: 2px solid #ccc;
}

.small-plate {
  width: 120px;
  height: 120px;
  background-image: url('../assets/plat.png');
  background-size: 130% 130%;
  background-position: center;
  background-repeat: no-repeat;
  border-radius: 50%;
  border: 2px solid #ccc;
}

.entry-plate {
  bottom: 20px;
  left: 30px;
}

.dessert-plate {
  bottom: 20px;
  right: 150px;
}

.drink-plate {
  bottom: 20px;
  right: 10px;
}

.plate-content {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  flex-wrap: wrap;
}

.food-icon {
  width: 60px;
  height: 60px;
  margin: 2px;
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
  margin: 10px;
  cursor: pointer;
  transition: transform 0.3s;
}

.food-icon:hover {
  transform: scale(1.2);
}

.draggable-container {
  position: relative;
}

.draggable-container .food-icon {
  cursor: move;
}

.reset-button {
  margin-top: 20px;
  padding: 10px 20px;
  font-size: 16px;
  color: #fff; 
  background-color: black; 
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.reset-button:hover {
  background-color: #0056b3; 
}

.check-button {
  margin-top: 20px;
  padding: 10px 20px;
  font-size: 16px;
  color: #fff;
  background-color: green;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.check-button:hover {
  background-color: darkgreen;
}

.health-message {
  margin-top: 20px;
  font-size: 18px;
  color: #333;
}
</style>
