// ✅ Common Firebase Utility Functions
import {
  getAuth,
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/12.5.0/firebase-auth.js";

import {
  getDatabase,
  ref,
  get,
  set,
  push,
  child
} from "https://www.gstatic.com/firebasejs/12.5.0/firebase-database.js";

// ✅ Get Firebase from window (initialized in firebase-config.js)
const auth = window.firebaseAuth || getAuth();
const database = window.firebaseDatabase || getDatabase();

// ✅ Authentication Check
export async function checkAuth() {
  return new Promise((resolve) => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        window.currentUser = user;
        console.log("✅ User authenticated:", user.email);
        resolve(true);
      } else {
        alert("Please log in first!");
        window.location.href = "index.html";
        resolve(false);
      }
    });
  });
}

// ✅ Get Current User ID
export async function getCurrentUserId() {
  return new Promise((resolve) => {
    onAuthStateChanged(auth, (user) => {
      resolve(user ? user.uid : null);
    });
  });
}

// ✅ Get Profile Data from Realtime Database
export async function getProfile() {
  const userId = await getCurrentUserId();
  if (!userId) return null;

  try {
    const dbRef = ref(database);
    const snapshot = await get(child(dbRef, `users/${userId}/profile`));

    if (snapshot.exists()) {
      const profileData = snapshot.val();
      console.log("✅ Profile fetched:", profileData);
      return profileData;
    } else {
      console.warn("⚠️ No profile found for this user.");
      return null;
    }
  } catch (error) {
    console.error("❌ Error fetching profile:", error);
    return null;
  }
}

// ✅ Save Profile Data to Database
export async function saveProfileData(profile) {
  const userId = await getCurrentUserId();
  if (!userId) {
    console.error("❌ No authenticated user found.");
    alert("You must be logged in to save your profile.");
    return;
  }

  try {
    const profileRef = ref(database, `users/${userId}/profile`);
    await set(profileRef, profile);
    console.log("✅ Profile saved successfully for user:", userId);
    return true;
  } catch (error) {
    console.error("❌ Firebase save error:", error);
    throw error;
  }
}

// ✅ Get Meals for Current User
export async function getMeals() {
  const userId = await getCurrentUserId();
  if (!userId) return [];

  try {
    const dbRef = ref(database);
    const snapshot = await get(child(dbRef, `users/${userId}/meals`));
    if (snapshot.exists()) {
      const mealsData = snapshot.val();
      console.log("✅ Meals fetched:", mealsData);
      // Convert object to array
      const mealsArray = Object.keys(mealsData).map(key => ({
        id: key,
        ...mealsData[key]
      }));
      return mealsArray;
    } else {
      console.warn("⚠️ No meals found for this user.");
      return [];
    }
  } catch (error) {
    console.error("❌ Error fetching meals:", error);
    return [];
  }
}

// ✅ Save Meal for Current User (🔥 Added Function)
export async function saveMeal(meal) {
  const userId = await getCurrentUserId();
  if (!userId) {
    alert("You must be logged in to add a meal.");
    return false;
  }

  try {
    const mealsRef = ref(database, `users/${userId}/meals`);
    const newMealRef = push(mealsRef); // ✅ creates a new unique meal entry
    await set(newMealRef, meal);
    console.log("✅ Meal saved successfully:", meal);
    return true;
  } catch (error) {
    console.error("❌ Error saving meal:", error);
    alert("Failed to save meal. Try again.");
    return false;
  }
}

// ✅ Logout Function
export function logout() {
  signOut(auth)
    .then(() => {
      alert("Logged out successfully!");
      window.location.href = "index.html";
    })
    .catch((error) => {
      console.error("Logout error:", error);
      alert("Failed to log out. Try again.");
    });
}

// ✅ Highlight Active Navigation Link
export function setActiveNav(currentPage) {
  document.querySelectorAll(".nav-links a").forEach((link) => {
    if (link.getAttribute("href") === currentPage) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });
}

// ✅ Wait for Firebase Initialization
document.addEventListener("DOMContentLoaded", function () {
  const checkFirebase = setInterval(() => {
    if (window.firebaseAuth && window.firebaseDatabase) {
      clearInterval(checkFirebase);
      console.log("✅ common.js: Firebase initialized and ready.");
    }
  }, 100);
});

// ✅ Make important functions accessible globally for HTML or inline calls
window.logout = logout;
window.saveProfileData = saveProfileData;
window.checkAuth = checkAuth;
window.getProfile = getProfile;
window.getMeals = getMeals;
window.saveMeal = saveMeal;
window.setActiveNav = setActiveNav;
window.getCurrentUserId = getCurrentUserId;
