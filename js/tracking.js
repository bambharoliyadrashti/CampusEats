import { getMeals, saveMeal, checkAuth } from "./common.js";

let nutritionChart;

// 🔹 Update tracking stats
async function updateTrackingData() {
    const meals = await getMeals();
    const today = new Date().toDateString();

    const todayMeals = meals.filter(m => new Date(m.date).toDateString() === today);

    let totalCal = 0, totalPro = 0, totalCarb = 0, totalFat = 0;
    todayMeals.forEach(m => {
        totalCal += parseFloat(m.calories || 0);
        totalPro += parseFloat(m.protein || 0);
        totalCarb += parseFloat(m.carbs || 0);
        totalFat += parseFloat(m.fats || 0);
    });

    document.getElementById("totalCalories").textContent = totalCal.toFixed(0);
    document.getElementById("totalProtein").textContent = totalPro.toFixed(1);
    document.getElementById("totalCarbs").textContent = totalCarb.toFixed(1);
    document.getElementById("totalFats").textContent = totalFat.toFixed(1);

    drawChart(meals);
}

// 🔹 Add meal
window.addMeal = async function () {
    const name = document.getElementById("mealName").value;
    const calories = document.getElementById("mealCalories").value;
    const protein = document.getElementById("mealProtein").value;
    const carbs = document.getElementById("mealCarbs").value;
    const fats = document.getElementById("mealFats").value;

    if (!name || !calories) {
        return alert("Please fill in meal name and calories");
    }

    const meal = {
        name,
        calories: parseFloat(calories),
        protein: parseFloat(protein) || 0,
        carbs: parseFloat(carbs) || 0,
        fats: parseFloat(fats) || 0,
        date: new Date().toISOString(),
    };

    await saveMeal(meal);
    document.querySelectorAll(".meal-form input").forEach(inp => inp.value = "");
    await updateTrackingData();
    alert("Meal added successfully!");
};

// 🔹 Draw weekly chart using Chart.js (bar chart)
function drawChart(meals) {
    const ctx = document.getElementById("nutritionChart").getContext("2d");

    const days = [];
    const caloriesData = [];
    const proteinData = [];
    const carbsData = [];

    for (let i = 6; i >= 0; i--) {
        const d = new Date();
        d.setDate(d.getDate() - i);
        const dayLabel = d.toLocaleDateString("en-US", { weekday: "short" });
        days.push(dayLabel);

        const mealsForDay = meals.filter(m => new Date(m.date).toDateString() === d.toDateString());
        const totalCalories = mealsForDay.reduce((sum, m) => sum + (parseFloat(m.calories) || 0), 0);
        const totalProtein = mealsForDay.reduce((sum, m) => sum + (parseFloat(m.protein) || 0), 0);
        const totalCarbs = mealsForDay.reduce((sum, m) => sum + (parseFloat(m.carbs) || 0), 0);

        caloriesData.push(totalCalories);
        proteinData.push(totalProtein);
        carbsData.push(totalCarbs);
    }

    if (nutritionChart) nutritionChart.destroy();

    nutritionChart = new Chart(ctx, {
        type: "bar",
        data: {
            labels: days,
            datasets: [
                {
                    label: "Calories (kcal)",
                    data: caloriesData,
                    backgroundColor: "rgba(255, 107, 107, 0.7)",
                    borderColor: "#ff6b6b",
                    borderWidth: 1,
                },
                {
                    label: "Protein (g)",
                    data: proteinData,
                    backgroundColor: "rgba(78, 205, 196, 0.7)",
                    borderColor: "#4ecdc4",
                    borderWidth: 1,
                },
                {
                    label: "Carbs (g)",
                    data: carbsData,
                    backgroundColor: "rgba(69, 183, 209, 0.7)",
                    borderColor: "#45b7d1",
                    borderWidth: 1,
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    title: { display: true, text: "Amount" }
                },
                x: {
                    title: { display: true, text: "Days" }
                }
            },
            plugins: {
                legend: { display: true, position: "top" },
                tooltip: { enabled: true }
            }
        }
    });
}

// 🔹 Initialize page
document.addEventListener("DOMContentLoaded", async () => {
    const checkFirebase = setInterval(async () => {
        if (window.firebaseAuth && window.firebaseDatabase) {
            clearInterval(checkFirebase);
            const isAuthenticated = await checkAuth();
            if (!isAuthenticated) return;
            await updateTrackingData();
        }
    }, 200);
});
