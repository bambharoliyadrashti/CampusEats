// Sample Recipe Data
const recipes = [
  {
    id: 1,
    name: "Protein Smoothie Bowl",
    image: "https://images.unsplash.com/photo-1590301157890-4810ed352733?w=400",
    calories: 350,
    protein: 25,
    carbs: 45,
    fats: 8,
    ingredients: ["Banana", "Protein powder", "Almond milk", "Berries", "Granola"],
    instructions: "1. Blend banana, protein powder, and almond milk.\n2. Pour into bowl.\n3. Add toppings and enjoy!"
  },
  {
    id: 2,
    name: "Chicken Rice Bowl",
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400",
    calories: 520,
    protein: 42,
    carbs: 58,
    fats: 12,
    ingredients: ["Chicken breast", "Brown rice", "Broccoli", "Soy sauce"],
    instructions: "1. Cook rice.\n2. Grill chicken.\n3. Add broccoli and soy sauce.\n4. Mix and serve."
  },
  {
    id: 3,
    name: "Veggie Pasta",
    image: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=400",
    calories: 420,
    protein: 15,
    carbs: 68,
    fats: 10,
    ingredients: ["Whole wheat pasta", "Cherry tomatoes", "Spinach", "Olive oil", "Parmesan"],
    instructions: "1. Cook pasta.\n2. Sauté veggies.\n3. Combine with olive oil and top with cheese."
  }
];

// Render Popular Recipes
function renderRecipes() {
  const grid = document.getElementById('recipeGrid');
  grid.innerHTML = recipes.map(recipe => `
    <div class="recipe-card" onclick="showRecipeModal(${recipe.id})">
      <img src="${recipe.image}" alt="${recipe.name}">
      <div class="recipe-card-content">
        <h3>${recipe.name}</h3>
        <p>Calories: ${recipe.calories} | Protein: ${recipe.protein}g</p>
      </div>
    </div>
  `).join('');
}

// Show Modal
function showRecipeModal(id) {
  const recipe = recipes.find(r => r.id === id);
  document.getElementById('modalRecipeName').textContent = recipe.name;
  document.getElementById('modalRecipeBody').innerHTML = `
    <img src="${recipe.image}" style="width:100%">
    <h3>Nutrition Facts</h3>
    <p>Calories: ${recipe.calories} kcal | Protein: ${recipe.protein}g | Carbs: ${recipe.carbs}g | Fats: ${recipe.fats}g</p>
    <h3>Ingredients</h3>
    <ul>${recipe.ingredients.map(i => `<li>${i}</li>`).join('')}</ul>
    <h3>Instructions</h3>
    <p style="white-space: pre-line;">${recipe.instructions}</p>
  `;
  document.getElementById('recipeModal').classList.add('active');
}

// Close Modal
function closeModal() {
  document.getElementById('recipeModal').classList.remove('active');
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', renderRecipes);
