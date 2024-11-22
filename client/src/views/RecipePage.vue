<template>
  <div class="page-container">
    <!-- Catégories alimentaires à gauche -->
    <div class="food-categories left-categories">
      
      <div v-for="(food, category) in leftCategories" :key="category" class="food-category">
        <div class="category-title":style="getCategoryStyle(category)">{{ category }}</div>
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
      <h1>compose ton repas</h1>
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

        <!-- Verre pour la boisson -->
        <div class="plate-container-item">
          <div class="plate-title">Boisson</div>
          <div class="drink-glass" :style="{ backgroundColor: getDrinkColor() }" @drop="drop($event, 'drink')" @dragover="allowDrop($event)">
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
      
      <div v-for="(food, category) in rightCategories" :key="category" class="food-category">
        <div class="category-title":style="getCategoryStyle(category)">{{ category }}</div>
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
          { name: "Tomate", icon: "tomate.png" },
          { name: "Banane", icon: "banane.png"},
          { name: "Avocado", icon: "avocado.png"},
          { name: "Pomme", icon: "pomme.png"}
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
      getCategoryStyle(category) {
        const styles = {
          "Légumes et Fruits": { backgroundColor: 'green' },
          "Céréales et Dérivés": { backgroundColor: 'orange' },
          "Lait et Produits Laitiers": { backgroundColor: 'blue' },
          "Viandes, Volailles, Poissons et Produits de la Mer, Œufs": { backgroundColor: 'red' },
          "Matières Grasses": { backgroundColor: 'yellow' },
          "Sucre et Produits Sucrés": { backgroundColor: 'pink' },
          "Boissons": { backgroundColor: 'gray' },
        };
        return styles[category] || {};
      },
      mainDish: [],
      starterDish: [],
      dessertDish: [],
      drinkDish: [],
      draggedIcon: null,
      draggedCategory: null,
      healthMessage: '',
      healthScore: 100,
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
      
      // Ajout de l'élément à la zone cible
      this.addDish(dishType, icon);
      
      // Suppression de l'icône de sa catégorie d'origine
      this.removeIconFromCategory(icon);
    },
    removeIconFromCategory(icon) {
      // Parcourir les catégories de gauche
      Object.keys(this.leftCategories).forEach(category => {
        const index = this.leftCategories[category].findIndex(item => item.icon === icon);
        if (index !== -1) {
          this.leftCategories[category].splice(index, 1);
        }
      });

      // Parcourir les catégories de droite
      Object.keys(this.rightCategories).forEach(category => {
        const index = this.rightCategories[category].findIndex(item => item.icon === icon);
        if (index !== -1) {
          this.rightCategories[category].splice(index, 1);
        }
      });
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
      // Réinitialisation des catégories à leur état initial
      this.leftCategories = {
        "Légumes et Fruits": [
          { name: "Carotte", icon: "carotte.png" },
          { name: "Tomate", icon: "tomate.png" },
          { name: "Banane", icon: "banane.png"},
          { name: "Avocado", icon: "avocado.png"},
          { name: "Pomme", icon: "pomme.png"}
        ],
        "Céréales et Dérivés": [
          { name: "Riz", icon: "riz.png" },
          { name: "Pain", icon: "pain.png" }
        ],
        "Lait et Produits Laitiers": [
          { name: "Lait", icon: "lait.png" },
          { name: "Yaourt", icon: "yaourt.png" }
        ]
      };
      
      this.rightCategories = {
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
      };
      
      this.starterDish = [];
      this.mainDish = [];
      this.dessertDish = [];
      this.drinkDish = [];
      this.healthMessage = '';
      this.healthScore = 100;
    },
    checkRecipe() {
      this.healthScore = 100;
      let emptyPlates = 0;
      let deductions = [];

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
      } else {
        if (this.drinkDish.length > 0 && (this.starterDish.includes('eau') || this.mainDish.includes('eau'))) {
          this.healthScore -= 50;
          deductions.push(50);
          this.healthMessage += "Les boissons doivent être placées dans la section appropriée.\n";
        }

        if (this.starterDish.some(dish => this.isSugar(dish)) || this.mainDish.some(dish => this.isSugar(dish))) {
          this.healthScore -= 40;
          deductions.push(40);
          this.healthMessage += "Les produits sucrés doivent être placés dans le dessert.\n";
        }

        if (this.starterDish.some(dish => this.isFat(dish))) {
          this.healthScore -= 60;
          deductions.push(60);
          this.healthMessage += "Les matières grasses doivent être évitées dans l'entrée ou le plat principal.\n";
        } else if (this.dessertDish.some(dish => this.isFat(dish))) {
          this.healthScore -= 30;
          deductions.push(30);
          this.healthMessage += "Attention à la quantité de matières grasses dans le dessert.\n";
        }

        if (this.starterDish.some(dish => this.isMeat(dish)) || this.drinkDish.some(dish => this.isMeat(dish))) {
          this.healthScore -= 70;
          deductions.push(70);
          this.healthMessage += "La viande doit être placée dans le plat principal.\n";
        } else if (this.dessertDish.some(dish => this.isMeat(dish))) {
          this.healthScore -= 40;
          deductions.push(40);
          this.healthMessage += "La viande ne doit pas être placée dans le dessert.\n";
        }

        if (this.mainDish.some(dish => this.isDairy(dish))) {
          this.healthScore -= 60;
          deductions.push(60);
          this.healthMessage += "Les produits laitiers doivent être évités dans le plat principal.\n";
        }

        if (this.dessertDish.some(dish => this.isCereal(dish))) {
          this.healthScore -= 65;
          deductions.push(65);
          this.healthMessage += "Les céréales ne doivent pas être placées dans le dessert.\n";
        }

        if (this.mainDish.some(dish => this.isFruit(dish))) {
          this.healthScore -= 90;
          deductions.push(90);
          this.healthMessage += "Les fruits doivent être placés dans le dessert ou l'entrée.\n";
        }

        if (deductions.length > 0) {
          const totalDeductions = deductions.reduce((a, b) => a + b, 0);
          const averageDeduction = totalDeductions / deductions.length;
          this.healthScore = Math.max(this.healthScore - averageDeduction, 0);
        }

        this.healthScore = Math.max(this.healthScore, 1);

        if (this.healthScore === 100) {
          this.healthMessage = `Votre repas est parfaitement sain avec un score de ${this.healthScore}%.`;
        } else if (this.healthScore > 75) {
          this.healthMessage = `Votre repas est sain à ${this.healthScore}%.`;
        } else if (this.healthScore > 50) {
          this.healthMessage = `Votre repas est modérément sain avec un score de ${this.healthScore}%.`;
        } else {
          this.healthMessage = `Attention, votre repas est peu sain avec un score de ${this.healthScore}%.`;
        }
      }
    },
    isFat(dish) {
      return dish.includes('huile') || dish.includes('beurre');
    },
    isSugar(dish) {
      return dish.includes('sucre') || dish.includes('bonbons');
    },
    isDrink(drink) {
      return drink.includes('eau') || drink.includes('jus');
    },
    isMeat(dish) {
      return dish.includes('boeuf') || dish.includes('saumon');
    },
    isDairy(dish) {
      return dish.includes('lait') || dish.includes('yaourt');
    },
    isCereal(dish) {
      return dish.includes('riz') || dish.includes('pain');
    },
    isFruit(dish) {
      return dish.includes('carotte') || dish.includes('tomate');
    },
    getDrinkColor() {
      if (this.drinkDish.length > 0) {
        const lastDrink = this.drinkDish[this.drinkDish.length - 1];
        if (lastDrink.includes('eau')) return 'blue';
        if (lastDrink.includes('jus')) return 'orange';
      }
      return 'transparent';
    }
  }
}
</script>

<style scoped>
h1 {
  font-size: 40px;
  font-weight: bold;
}
h2 {
  font-size: 30px;
}
.page-container {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 20px;
  height: 80vh;
}

.food-categories {
  width: 20%;
}

.left-categories, .right-categories {
  text-align: center;
}

.food-category {
  margin-bottom: 20px;
  border: 2px solid #ccc; /* Bordure pour la catégorie */
  border-radius: 10px;
  padding: 10px;
  position: relative;
}

.category-title {
  border: 2px double #666; /* Double bordure pour le titre */
  padding: 5px;
  font-weight: bold;
  margin-bottom: 10px; /* Espace entre le titre et le contenu */
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

.drink-glass {
  width: 120px;
  height: 200px;
  background-image: url('../assets/glass.png') ;
  background-position: center;
  background-repeat: no-repeat;
  border-radius: 10px;
  position: relative;
  margin: 0 auto;
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
  width: 50px;
  height: 50px;
  margin: 2px;
}

.food-categories h2 {
  margin-bottom: 20px;
}

.food-icons {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  max-height: 100px; /* Ajuste la hauteur max selon tes besoins */
  overflow-y: auto; /* Ajoute le défilement vertical */
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
