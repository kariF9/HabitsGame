<template>
  <div class="nutri-score-calculator">
    <h1>Calculateur de Nutri-Score</h1>

    <input
      type="text"
      v-model="productName"
      placeholder="Entrez le nom du produit"
      class="input"
      @input="filterProducts"
    />
    <button @click="calculateNutriScore" class="button">Calculer</button>

    <ul v-if="filteredProducts.length > 0" class="suggestions">
      <li
        v-for="(product, index) in filteredProducts"
        :key="index"
        @click="selectProduct(product)"
        class="suggestion-item"
      >
        {{ product.nom_produit }}
      </li>
    </ul>

    <div v-if="productDetails" class="result">
      <h3>Informations sur le produit</h3>
      <table>
        <tr>
          <td><strong>Nom:</strong></td>
          <td>{{ productDetails.nom_produit }}</td>
        </tr>
        <tr>
          <td><strong>Nutri-Score:</strong></td>
          <td :class="nutriScoreClass">{{ productDetails.nutri_score }}</td>
        </tr>
        <tr>
          <td><strong>Énergie:</strong></td>
          <td :class="highlightClass(productDetails.energie, 1000)">{{ productDetails.energie }}</td>
        </tr>
        <tr>
          <td><strong>Graisse:</strong></td>
          <td :class="highlightClass(productDetails.graisse, 30)">{{ productDetails.graisse }}</td>
        </tr>
        <tr>
          <td><strong>Graisse saturée:</strong></td>
          <td :class="highlightClass(productDetails.graisse_saturee, 10)">{{ productDetails.graisse_saturee }}</td>
        </tr>
        <tr>
          <td><strong>Glucides:</strong></td>
          <td>{{ productDetails.glucides }}</td>
        </tr>
        <tr>
          <td><strong>Sucres:</strong></td>
          <td :class="highlightClass(productDetails.sucres, 20)">{{ productDetails.sucres }}</td>
        </tr>
        <tr>
          <td><strong>Fibres:</strong></td>
          <td>{{ productDetails.fibres }}</td>
        </tr>
        <tr>
          <td><strong>Protéines:</strong></td>
          <td>{{ productDetails.proteines }}</td>
        </tr>
        <tr>
          <td><strong>Sel:</strong></td>
          <td :class="highlightClass(productDetails.sel, 2.5)">{{ productDetails.sel }}</td>
        </tr>
      </table>

      <!-- Nouveau bouton pour rechercher un autre aliment -->
      <button @click="resetSearch" class="button reset-button">Rechercher un autre aliment</button>
    </div>

    <div v-if="errorMessage" class="error">
      <p>{{ errorMessage }}</p>
    </div>
  </div>
</template>

<script>
import foodData from '@/assets/food_data.json'; // Importer le fichier JSON

export default {
  data() {
    return {
      productName: '',
      productDetails: null,
      errorMessage: '',
      products: foodData, // Utiliser le fichier JSON pour les produits
      filteredProducts: [] // Pour stocker les produits filtrés
    };
  },
  methods: {
    filterProducts() {
      // Filtrer les produits en fonction de l'entrée utilisateur
      const query = this.productName.trim().toLowerCase();
      if (query.length < 2) {
        this.filteredProducts = [];
        return;
      }
      this.filteredProducts = this.products.filter(product =>
        product.nom_produit.toLowerCase().includes(query)
      );
    },
    selectProduct(product) {
      // Sélectionner un produit dans les suggestions
      this.productName = product.nom_produit;
      this.filteredProducts = [];
    },
    calculateNutriScore() {
      // Reset previous details and errors
      this.productDetails = null;
      this.errorMessage = '';

      // Vérification que l'utilisateur a entré un nom de produit
      if (!this.productName || this.productName.trim() === '') {
        this.errorMessage = "Veuillez entrer un nom de produit.";
        return;
      }

      // Recherche du produit dans la base de données (fichier JSON)
      const product = this.products.find(p => p.nom_produit.toLowerCase() === this.productName.trim().toLowerCase());

      // Vérifiez si le produit a été trouvé
      if (!product) {
        this.errorMessage = "Produit non trouvé dans la base de données.";
      } else {
        this.productDetails = product;
      }
    },
    resetSearch() {
      this.productName = '';
      this.productDetails = null;
      this.errorMessage = '';
      this.filteredProducts = []; // Réinitialiser les suggestions
    },
    highlightClass(value, threshold) {
      // Si la valeur est supérieure à un seuil, la mettre en gras et avec un fond spécial
      return value > threshold ? 'highlight' : '';
    }
  },
  computed: {
    nutriScoreClass() {
      if (!this.productDetails) return '';

      // Appliquer une classe CSS spécifique selon le Nutri-Score
      const score = this.productDetails.nutri_score.toLowerCase();
      return {
        'nutri-a': score === 'a',
        'nutri-b': score === 'b',
        'nutri-c': score === 'c',
        'nutri-d': score === 'd',
        'nutri-e': score === 'e',
      };
    }
  }
};
</script>

<style scoped>
.nutri-score-calculator {
  max-width: 600px;
  margin: auto;
  text-align: center;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 10px;
  background-color: #f9f9f9;
  margin-top: 60px;
}

h1 {
  font-size: 32px;
  color: #333;
}

.input {
  padding: 10px;
  width: 80%;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
}

.button {
  padding: 12px 24px;
  background-color: #888;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 18px;
  cursor: pointer;
  margin-top: 10px;
}

.button:hover {
  background-color: #666;
}

.reset-button {
  margin-top: 20px;
}

.result {
  margin-top: 20px;
}

table {
  width: 100%;
  margin: auto;
  border-collapse: collapse;
}

table td {
  padding: 8px;
  border: 1px solid #ddd;
}

.error {
  color: red;
  margin-top: 10px;
}

.suggestions {
  list-style-type: none;
  padding: 0;
  margin-top: 10px;
}

.suggestion-item {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  cursor: pointer;
  background-color: #f9f9f9;
}

.suggestion-item:hover {
  background-color: #e0e0e0;
}

/* Classes pour les Nutri-Scores */
.nutri-a {
  background-color: #006400;
  color: white;
  font-weight: bold;
}

.nutri-b {
  background-color: #8BC34A;
  color: white;
  font-weight: bold;
}

.nutri-c {
  background-color: #FFEB3B;
  color: black;
  font-weight: bold;
}

.nutri-d {
  background-color: #FF9800;
  color: white;
  font-weight: bold;
}

.nutri-e {
  background-color: #F44336;
  color: white;
  font-weight: bold;
}

/* Mise en gras et surlignage pour les valeurs importantes */
.highlight {
  font-weight: bold;
  background-color: #ffdd57;
}
</style>
