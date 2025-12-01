import { getProfile, saveProfileData, getMeals, getCurrentUserId, checkAuth, setActiveNav } from "./common.js";

// ✅ Create Loader Only After DOM Is Ready
document.addEventListener("DOMContentLoaded", () => {
    // Create loader overlay
    const loader = document.createElement("div");
    loader.id = "loaderOverlay";
    loader.innerHTML = `
        <div class="loader"></div>
        <p>Saving your profile...</p>
    `;
    loader.style.display = "none";
    document.body.appendChild(loader);

    // Add loader styles (inline to override other CSS)
    const style = document.createElement("style");
    style.innerHTML = `
    #loaderOverlay {
        position: fixed !important;
        top: 0; left: 0;
        width: 100vw; height: 100vh;
        background: rgba(255, 255, 255, 0.85);
        display: none;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        z-index: 99999 !important;
        backdrop-filter: blur(3px);
        font-family: 'Arial', sans-serif;
    }
    .loader {
        border: 6px solid #f3f3f3;
        border-top: 6px solid #3498db;
        border-radius: 50%;
        width: 60px;
        height: 60px;
        animation: spin 1s linear infinite;
    }
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
    #loaderOverlay p {
        margin-top: 12px;
        font-size: 16px;
        color: #333;
    }`;
    document.head.appendChild(style);

    // Expose loader globally
    window.loaderOverlay = loader;
});

// ✅ Load Profile
async function loadProfile() {
    try {
        const profile = await getProfile();
        const meals = await getMeals();

        if (!profile) {
            const userId = await getCurrentUserId();
            if (userId) {
                const defaultProfile = {
                    name: '',
                    email: window.currentUser?.email || '',
                    age: '',
                    gender: '',
                    height: '',
                    weight: '',
                    goalCalories: '2000',
                    goalProtein: '100',
                    goalCarbs: '230',
                    goalFats: '60'
                };
                await saveProfileData(defaultProfile);
                return loadProfile();
            }
            return;
        }

        // Fill form values
        document.getElementById('userName').value = profile.name || '';
        document.getElementById('userEmail').value = profile.email || window.currentUser?.email || '';
        document.getElementById('userAge').value = profile.age || '';
        document.getElementById('userGender').value = profile.gender || '';
        document.getElementById('userHeight').value = profile.height || '';
        document.getElementById('userWeight').value = profile.weight || '';
        document.getElementById('goalCalories').value = profile.goalCalories || '';
        document.getElementById('goalProtein').value = profile.goalProtein || '';
        document.getElementById('goalCarbs').value = profile.goalCarbs || '';
        document.getElementById('goalFats').value = profile.goalFats || '';

        // Display profile info
        document.getElementById('displayName').textContent = profile.name || 'College Student';
        document.getElementById('displayEmail').textContent = profile.email || window.currentUser?.email || 'student@university.edu';

        // Avatar initials
        const initials = profile.name
            ? profile.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
            : 'CS';
        document.getElementById('profileAvatar').textContent = initials;

        // Stats
        const mealsTracked = meals.length;
        document.getElementById('mealsTrackedBadge').textContent = `${mealsTracked} Meals Tracked`;
        document.getElementById('profileMealsTracked').textContent = mealsTracked;

        const dayStreak = calculateDayStreak(meals);
        document.getElementById('profileDayStreak').textContent = dayStreak;

        const goalAchievement = calculateGoalAchievement(meals, profile);
        document.getElementById('profileGoalAchievement').textContent = `${goalAchievement}%`;

    } catch (error) {
        console.error('❌ Error loading profile:', error);
    }
}

// ✅ Day Streak
function calculateDayStreak(meals) {
    if (meals.length === 0) return 0;
    const sortedDates = meals.map(m => new Date(m.date).toDateString())
        .filter((date, i, self) => self.indexOf(date) === i)
        .sort((a, b) => new Date(b) - new Date(a));

    let streak = 0;
    for (let i = 0; i < sortedDates.length; i++) {
        const expectedDate = new Date();
        expectedDate.setDate(expectedDate.getDate() - i);
        if (sortedDates[i] === expectedDate.toDateString()) streak++;
        else break;
    }
    return streak;
}

// ✅ Goal Achievement %
function calculateGoalAchievement(meals, profile) {
    if (meals.length === 0) return 0;
    const last7Days = [];
    for (let i = 6; i >= 0; i--) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        last7Days.push(date.toDateString());
    }

    const goalCalories = parseFloat(profile.goalCalories) || 2000;
    let totalGoalMet = 0;

    last7Days.forEach(day => {
        const dayMeals = meals.filter(m => new Date(m.date).toDateString() === day);
        const dayCalories = dayMeals.reduce((sum, m) => sum + parseFloat(m.calories || 0), 0);
        if (dayCalories >= goalCalories * 0.8 && dayCalories <= goalCalories * 1.2) {
            totalGoalMet++;
        }
    });

    return Math.round((totalGoalMet / 7) * 100);
}

// ✅ Edit Mode
function toggleEditMode() {
    alert('Edit mode enabled! Modify your information and click "Save Changes".');
}

// ✅ Save Profile with Loader
async function saveProfile() {
    try {
        if (window.loaderOverlay) window.loaderOverlay.style.display = "flex"; // show loader
        const profile = {
            name: document.getElementById('userName').value,
            email: document.getElementById('userEmail').value,
            age: document.getElementById('userAge').value,
            gender: document.getElementById('userGender').value,
            height: document.getElementById('userHeight').value,
            weight: document.getElementById('userWeight').value,
            goalCalories: document.getElementById('goalCalories').value,
            goalProtein: document.getElementById('goalProtein').value,
            goalCarbs: document.getElementById('goalCarbs').value,
            goalFats: document.getElementById('goalFats').value
        };

        console.log("Saving profile:", profile);
        await saveProfileData(profile);
        await loadProfile();
        alert('✅ Profile saved successfully!');
    } catch (error) {
        console.error('❌ Error saving profile:', error);
        alert('❌ Failed to save profile. Please try again.');
    } finally {
        if (window.loaderOverlay) window.loaderOverlay.style.display = "none"; // hide loader
    }
}

// ✅ Cancel
async function cancelProfile() {
    if (confirm('Are you sure you want to cancel? All unsaved changes will be lost.')) {
        await loadProfile();
    }
}

// ✅ Initialize Firebase Auth + Profile
document.addEventListener('DOMContentLoaded', async () => {
    const checkFirebase = setInterval(async () => {
        if (window.firebaseAuth && window.firebaseDatabase) {
            clearInterval(checkFirebase);
            const isAuthenticated = await checkAuth();
            if (!isAuthenticated) return;
            setActiveNav('profile.html');
            await loadProfile();
        }
    }, 100);
});

window.toggleEditMode = toggleEditMode;
window.saveProfile = saveProfile;
window.cancelProfile = cancelProfile;
