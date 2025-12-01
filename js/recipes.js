// Import common functions
import { checkAuth, setActiveNav } from './common.js';

// Popular Recipes data - Many recipe suggestions for users
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
        instructions: "1. Blend banana, protein powder, and almond milk until smooth.\n2. Pour into a bowl.\n3. Top with berries and granola.\n4. Enjoy immediately!"
    },
    {
        id: 2,
        name: "Chicken Rice Bowl",
        image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400",
        calories: 520,
        protein: 42,
        carbs: 58,
        fats: 12,
        ingredients: ["Chicken breast", "Brown rice", "Broccoli", "Soy sauce", "Garlic"],
        instructions: "1. Cook brown rice according to package.\n2. Season and grill chicken breast.\n3. Steam broccoli.\n4. Combine all in a bowl with soy sauce and garlic."
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
        instructions: "1. Cook pasta al dente.\n2. Sauté tomatoes and spinach in olive oil.\n3. Toss pasta with vegetables.\n4. Top with parmesan cheese."
    },
    {
        id: 4,
        name: "Greek Yogurt Parfait",
        image: "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400",
        calories: 280,
        protein: 20,
        carbs: 35,
        fats: 6,
        ingredients: ["Greek yogurt", "Honey", "Mixed berries", "Granola", "Almonds"],
        instructions: "1. Layer Greek yogurt in a glass.\n2. Add honey and berries.\n3. Top with granola and sliced almonds.\n4. Serve chilled."
    },
    {
        id: 5,
        name: "Avocado Toast",
        image: "https://images.unsplash.com/photo-1541519227354-08fa5d50c44d?w=400",
        calories: 320,
        protein: 12,
        carbs: 35,
        fats: 16,
        ingredients: ["Whole grain bread", "Avocado", "Eggs", "Cherry tomatoes", "Salt & pepper"],
        instructions: "1. Toast bread until golden.\n2. Mash avocado with salt and pepper.\n3. Fry eggs to your liking.\n4. Assemble toast with avocado, egg, and tomatoes."
    },
    {
        id: 6,
        name: "Quinoa Salad",
        image: "https://images.unsplash.com/photo-1505253716362-afaea1d3d1af?w=400",
        calories: 380,
        protein: 14,
        carbs: 52,
        fats: 14,
        ingredients: ["Quinoa", "Cucumber", "Chickpeas", "Feta cheese", "Lemon dressing"],
        instructions: "1. Cook quinoa and let cool.\n2. Dice cucumber and mix with chickpeas.\n3. Combine quinoa with vegetables.\n4. Add feta and lemon dressing."
    },
    {
        id: 7,
        name: "Overnight Oats",
        image: "https://images.unsplash.com/photo-1570197788417-0e82375c9371?w=400",
        calories: 310,
        protein: 12,
        carbs: 55,
        fats: 6,
        ingredients: ["Rolled oats", "Milk", "Chia seeds", "Banana", "Maple syrup"],
        instructions: "1. Mix oats, milk, and chia seeds in a jar.\n2. Add sliced banana and maple syrup.\n3. Refrigerate overnight.\n4. Enjoy cold in the morning!"
    },
    {
        id: 8,
        name: "Turkey Wrap",
        image: "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=400",
        calories: 380,
        protein: 28,
        carbs: 42,
        fats: 12,
        ingredients: ["Whole wheat tortilla", "Turkey slices", "Lettuce", "Tomato", "Hummus"],
        instructions: "1. Spread hummus on tortilla.\n2. Layer turkey, lettuce, and tomato.\n3. Roll tightly and slice in half.\n4. Serve immediately."
    },
    {
        id: 9,
        name: "Salmon Bowl",
        image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400",
        calories: 480,
        protein: 35,
        carbs: 45,
        fats: 18,
        ingredients: ["Salmon fillet", "Brown rice", "Avocado", "Edamame", "Sesame seeds"],
        instructions: "1. Cook brown rice.\n2. Pan-sear salmon until cooked.\n3. Arrange rice, salmon, avocado, and edamame.\n4. Sprinkle with sesame seeds."
    },
    {
        id: 10,
        name: "Black Bean Burrito",
        image: "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=400",
        calories: 420,
        protein: 18,
        carbs: 65,
        fats: 10,
        ingredients: ["Tortilla", "Black beans", "Rice", "Cheese", "Salsa", "Sour cream"],
        instructions: "1. Warm tortilla.\n2. Add rice, beans, and cheese.\n3. Top with salsa and sour cream.\n4. Roll and enjoy!"
    },
    {
        id: 11,
        name: "Mediterranean Bowl",
        image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400",
        calories: 450,
        protein: 20,
        carbs: 55,
        fats: 16,
        ingredients: ["Quinoa", "Chickpeas", "Cucumber", "Feta", "Olives", "Tzatziki"],
        instructions: "1. Cook quinoa and let cool.\n2. Arrange quinoa base.\n3. Top with chickpeas, cucumber, feta, and olives.\n4. Drizzle with tzatziki."
    },
    {
        id: 12,
        name: "Stir Fry Noodles",
        image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=400",
        calories: 380,
        protein: 16,
        carbs: 58,
        fats: 10,
        ingredients: ["Noodles", "Mixed vegetables", "Soy sauce", "Ginger", "Garlic"],
        instructions: "1. Cook noodles according to package.\n2. Stir-fry vegetables with ginger and garlic.\n3. Add noodles and soy sauce.\n4. Toss and serve hot."
    },
    {
        id: 13,
        name: "Energy Balls",
        image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=400",
        calories: 180,
        protein: 5,
        carbs: 22,
        fats: 8,
        ingredients: ["Dates", "Almonds", "Cocoa powder", "Coconut", "Vanilla"],
        instructions: "1. Blend dates and almonds until smooth.\n2. Add cocoa, coconut, and vanilla.\n3. Form into balls.\n4. Refrigerate for 30 minutes."
    },
    {
        id: 14,
        name: "Tuna Salad Sandwich",
        image: "https://images.unsplash.com/photo-1539252554453-80ab65ce3586?w=400",
        calories: 340,
        protein: 24,
        carbs: 38,
        fats: 10,
        ingredients: ["Whole grain bread", "Tuna", "Mayo", "Celery", "Lettuce"],
        instructions: "1. Mix tuna with mayo and celery.\n2. Toast bread.\n3. Spread tuna mixture on bread.\n4. Add lettuce and serve."
    },
    {
        id: 15,
        name: "Veggie Stir Fry",
        image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=400",
        calories: 220,
        protein: 8,
        carbs: 32,
        fats: 8,
        ingredients: ["Mixed vegetables", "Soy sauce", "Ginger", "Garlic", "Sesame oil"],
        instructions: "1. Heat sesame oil in a pan.\n2. Add ginger and garlic.\n3. Stir-fry vegetables until crisp.\n4. Season with soy sauce."
    }
];

// Recipe Functions
function renderRecipes() {
    const grid = document.getElementById('recipeGrid');
    if (!grid) {
        console.error('Recipe grid not found');
        return;
    }
    grid.innerHTML = recipes.map(recipe => `
        <div class="recipe-card" onclick="window.showRecipeModal(${recipe.id})">
            <img src="${recipe.image}" alt="${recipe.name}" onerror="this.src='https://via.placeholder.com/400x200?text=Recipe+Image'">
            <div class="recipe-card-content">
                <h3>${recipe.name}</h3>
                <p>Calories: ${recipe.calories} | Protein: ${recipe.protein}g</p>
            </div>
        </div>
    `).join('');
}

window.showRecipeModal = function(id) {
    const recipe = recipes.find(r => r.id === id);
    if (!recipe) {
        console.error('Recipe not found:', id);
        return;
    }
    document.getElementById('modalRecipeName').textContent = recipe.name;
    document.getElementById('modalRecipeBody').innerHTML = `
        <img src="${recipe.image}" style="width:100%; border-radius:10px; margin-bottom:1rem;" onerror="this.src='https://via.placeholder.com/800x400?text=Recipe+Image'">
        <h3>Nutrition Facts</h3>
        <p>Calories: ${recipe.calories} kcal | Protein: ${recipe.protein}g | Carbs: ${recipe.carbs}g | Fats: ${recipe.fats}g</p>
        <h3 style="margin-top:1rem;">Ingredients</h3>
        <ul>${recipe.ingredients.map(i => `<li>${i}</li>`).join('')}</ul>
        <h3 style="margin-top:1rem;">Instructions</h3>
        <p style="white-space: pre-line;">${recipe.instructions}</p>
    `;
    document.getElementById('recipeModal').classList.add('active');
}

window.closeModal = function() {
    document.getElementById('recipeModal').classList.remove('active');
}

// Function to find matching recipes based on ingredients
function findMatchingRecipes(ingredients) {
    const ingArray = ingredients.toLowerCase().split(',').map(i => i.trim());
    const matchingRecipes = [];
    
    recipes.forEach(recipe => {
        let matchCount = 0;
        const recipeIngredients = recipe.ingredients.map(ing => ing.toLowerCase());
        
        ingArray.forEach(userIng => {
            recipeIngredients.forEach(recipeIng => {
                if (recipeIng.includes(userIng) || userIng.includes(recipeIng.split(' ')[0])) {
                    matchCount++;
                }
            });
        });
        
        if (matchCount > 0) {
            matchingRecipes.push({ recipe, matchCount });
        }
    });
    
    // Sort by match count and return top 6
    return matchingRecipes
        .sort((a, b) => b.matchCount - a.matchCount)
        .slice(0, 6)
        .map(item => item.recipe);
}

// Function to render matching recipes
function renderMatchingRecipes(matchingRecipes, containerId) {
    const container = document.getElementById(containerId);
    if (!container) {
        console.error('Container not found:', containerId);
        return;
    }
    
    if (matchingRecipes.length === 0) {
        container.innerHTML = '<p style="text-align: center; color: #666; padding: 2rem;">No matching recipes found. Try different ingredients!</p>';
        return;
    }
    
    container.innerHTML = `
        <div class="matching-recipes-header">
            <h3>Popular Recipes Matching Your Ingredients</h3>
            <p>Here are some popular recipes that use similar ingredients:</p>
        </div>
        <div class="matching-recipes-grid">
            ${matchingRecipes.map(recipe => `
                <div class="recipe-card" onclick="window.showRecipeModal(${recipe.id})">
                    <img src="${recipe.image}" alt="${recipe.name}" onerror="this.src='https://via.placeholder.com/400x200?text=Recipe+Image'">
                    <div class="recipe-card-content">
                        <h3>${recipe.name}</h3>
                        <p>Calories: ${recipe.calories} | Protein: ${recipe.protein}g</p>
                    </div>
                </div>
            `).join('')}
        </div>
    `;
}

// AI Recipe Generator - Enhanced with more intelligent suggestions
window.generateRecipe = async function() {
    const ingredients = document.getElementById('ingredientsInput').value;
    const resultDiv = document.getElementById('aiResult');
    const matchingRecipesDiv = document.getElementById('matchingRecipes');
    
    if (!ingredients || ingredients.trim() === '') {
        alert('Please enter some ingredients!');
        return;
    }

    resultDiv.style.display = 'block';
    resultDiv.innerHTML = '<div class="loading">🤖 AI is generating your perfect recipe...</div>';
    
    // Show matching recipes section
    if (matchingRecipesDiv) {
        matchingRecipesDiv.style.display = 'block';
        matchingRecipesDiv.innerHTML = '<div class="loading">🔍 Finding matching recipes...</div>';
    }

    setTimeout(() => {
        const ingArray = ingredients.toLowerCase().split(',').map(i => i.trim());
        let recipe = '';
        let recipeName = '';
        let instructions = '';
        let nutrition = '';
        
        // More intelligent recipe matching based on ingredients
        if (ingArray.some(i => i.includes('chicken') || i.includes('poultry'))) {
            recipeName = 'Grilled Chicken Power Bowl';
            instructions = `1. Season chicken breast with salt, pepper, and your favorite herbs\n2. Grill or pan-sear for 6-7 minutes per side until cooked through\n3. Prepare a base with ${ingArray.filter(i => !i.includes('chicken')).join(', ') || 'your favorite vegetables'}\n4. Arrange chicken over the base\n5. Drizzle with olive oil or your preferred dressing\n6. Serve hot and enjoy!`;
            nutrition = 'Estimated Nutrition: 400-450 calories | 35-40g protein | 30-35g carbs | 12-15g fats';
        } else if (ingArray.some(i => i.includes('egg') || i.includes('eggs'))) {
            recipeName = 'Protein-Packed Veggie Omelette';
            instructions = `1. Beat 2-3 eggs with a pinch of salt and pepper\n2. Heat a non-stick pan with a little oil or butter\n3. Sauté ${ingArray.filter(i => !i.includes('egg')).join(', ') || 'your favorite vegetables'} until tender\n4. Pour beaten eggs over the vegetables\n5. Cook on medium heat until bottom is set\n6. Flip or fold and cook for another minute\n7. Serve hot with toast if available`;
            nutrition = 'Estimated Nutrition: 250-300 calories | 18-22g protein | 8-12g carbs | 15-18g fats';
        } else if (ingArray.some(i => i.includes('rice') || i.includes('brown rice'))) {
            recipeName = 'Flavorful Fried Rice Bowl';
            instructions = `1. Cook rice according to package and let it cool (day-old rice works best)\n2. Heat oil in a large pan or wok\n3. Stir-fry ${ingArray.filter(i => !i.includes('rice')).join(', ') || 'your favorite vegetables'} until crisp-tender\n4. Add cooled rice and break up any clumps\n5. Season with soy sauce, salt, and pepper\n6. Mix well and cook for 2-3 minutes\n7. Serve hot with optional garnishes`;
            nutrition = 'Estimated Nutrition: 380-420 calories | 12-15g protein | 65-70g carbs | 8-10g fats';
        } else if (ingArray.some(i => i.includes('pasta') || i.includes('noodle'))) {
            recipeName = 'Quick Veggie Pasta';
            instructions = `1. Cook pasta according to package directions until al dente\n2. While pasta cooks, sauté ${ingArray.filter(i => !i.includes('pasta') && !i.includes('noodle')).join(', ') || 'your favorite vegetables'} in olive oil\n3. Drain pasta, reserving some pasta water\n4. Toss pasta with vegetables and pasta water\n5. Season with salt, pepper, and herbs\n6. Top with cheese if available\n7. Serve immediately`;
            nutrition = 'Estimated Nutrition: 420-480 calories | 15-18g protein | 65-75g carbs | 10-12g fats';
        } else if (ingArray.some(i => i.includes('bean') || i.includes('chickpea') || i.includes('lentil'))) {
            recipeName = 'Hearty Bean & Veggie Bowl';
            instructions = `1. Rinse and drain beans/chickpeas if using canned\n2. Prepare a base with ${ingArray.join(', ')}\n3. Mix beans with vegetables\n4. Add olive oil, lemon juice, salt, and pepper\n5. Toss everything together\n6. Let it marinate for 10 minutes for better flavor\n7. Serve as a salad or wrap in a tortilla`;
            nutrition = 'Estimated Nutrition: 320-380 calories | 15-20g protein | 45-55g carbs | 10-12g fats';
        } else if (ingArray.some(i => i.includes('oat') || i.includes('cereal'))) {
            recipeName = 'Nutritious Oatmeal Bowl';
            instructions = `1. Cook oats with water or milk according to package\n2. Add ${ingArray.filter(i => !i.includes('oat') && !i.includes('cereal')).join(', ') || 'your favorite fruits'} while cooking\n3. Sweeten with honey, maple syrup, or fruits\n4. Top with nuts, seeds, or fresh fruits\n5. Serve warm and enjoy`;
            nutrition = 'Estimated Nutrition: 280-320 calories | 10-12g protein | 50-55g carbs | 6-8g fats';
        } else if (ingArray.some(i => i.includes('bread') || i.includes('toast'))) {
            recipeName = 'Healthy Open-Faced Sandwich';
            instructions = `1. Toast bread until golden brown\n2. Prepare toppings: ${ingArray.filter(i => !i.includes('bread') && !i.includes('toast')).join(', ') || 'your favorite toppings'}\n3. Layer ingredients on toast\n4. Drizzle with olive oil or spread with avocado\n5. Season with salt, pepper, and herbs\n6. Serve immediately`;
            nutrition = 'Estimated Nutrition: 250-300 calories | 10-15g protein | 35-40g carbs | 8-12g fats';
        } else if (ingArray.some(i => i.includes('yogurt') || i.includes('milk'))) {
            recipeName = 'Creamy Smoothie Bowl';
            instructions = `1. Blend yogurt/milk with ${ingArray.filter(i => !i.includes('yogurt') && !i.includes('milk')).join(', ') || 'your favorite fruits'}\n2. Pour into a bowl\n3. Top with granola, nuts, or fresh fruits\n4. Drizzle with honey if desired\n5. Enjoy immediately or chill for 30 minutes`;
            nutrition = 'Estimated Nutrition: 300-350 calories | 15-20g protein | 45-50g carbs | 6-10g fats';
        } else {
            recipeName = 'Fresh & Healthy Salad Bowl';
            instructions = `1. Wash and chop all vegetables: ${ingArray.join(', ')}\n2. Mix everything in a large bowl\n3. Create a simple dressing with olive oil, lemon juice, salt, and pepper\n4. Toss salad with dressing\n5. Let it sit for 5 minutes to allow flavors to meld\n6. Serve fresh and enjoy!`;
            nutrition = 'Estimated Nutrition: 180-220 calories | 6-10g protein | 20-25g carbs | 8-12g fats';
        }
        
        recipe = `<div class="ai-recipe-result">
            <h3 style="color: #009933; margin-bottom: 1rem;">${recipeName}</h3>
            <p style="color: #666; margin-bottom: 1rem;"><strong>Based on your ingredients:</strong> ${ingredients}</p>
            <h4 style="color: #333; margin-top: 1.5rem; margin-bottom: 0.5rem;">📝 Instructions:</h4>
            <p style="white-space: pre-line; line-height: 1.8; color: #555;">${instructions}</p>
            <div style="background: #f0f8f4; padding: 1rem; border-radius: 8px; margin-top: 1.5rem;">
                <p style="color: #009933; font-weight: 600; margin: 0;">${nutrition}</p>
            </div>
            <p style="margin-top: 1rem; color: #666; font-style: italic;">💡 Tip: Feel free to adjust quantities and add your favorite seasonings!</p>
        </div>`;
        
        resultDiv.innerHTML = recipe;
        
        // Find and display matching popular recipes
        const matchingRecipes = findMatchingRecipes(ingredients);
        console.log('Matching recipes found:', matchingRecipes.length);
        if (matchingRecipesDiv) {
            renderMatchingRecipes(matchingRecipes, 'matchingRecipes');
        } else {
            console.error('Matching recipes div not found');
        }
    }, 1500);
}

// Initialize
document.addEventListener('DOMContentLoaded', async function() {
    // Wait for Firebase to initialize
    const checkFirebase = setInterval(async () => {
        if (window.firebaseAuth && window.firebaseDatabase) {
            clearInterval(checkFirebase);
            
            // Check authentication
            const isAuthenticated = await checkAuth();
            if (!isAuthenticated) {
                return;
            }
            
            setActiveNav('recipes.html');
            renderRecipes();
            
            // Add event listener for generate button as backup
            const generateBtn = document.querySelector('button[onclick*="generateRecipe"]');
            if (generateBtn) {
                generateBtn.addEventListener('click', function() {
                    window.generateRecipe();
                });
            }
            
            // Add Enter key support for input
            const ingredientsInput = document.getElementById('ingredientsInput');
            if (ingredientsInput) {
                ingredientsInput.addEventListener('keypress', function(e) {
                    if (e.key === 'Enter') {
                        window.generateRecipe();
                    }
                });
            }
            
            // Close modal when clicking outside
            window.onclick = function(event) {
                const modal = document.getElementById('recipeModal');
                if (event.target == modal) {
                    window.closeModal();
                }
            }
        }
    }, 100);
});

