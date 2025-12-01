// Firebase Auth + Realtime Database
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/12.5.0/firebase-auth.js";

import {
  ref,
  set
} from "https://www.gstatic.com/firebasejs/12.5.0/firebase-database.js";

// Utility for showing errors
function showError(id, message) {
  const el = document.getElementById(id);
  if (el) el.textContent = message;
}

// ✅ Register New User
window.handleRegister = async (event) => {
  event.preventDefault();

  const name = document.getElementById("registerName").value.trim();
  const email = document.getElementById("registerEmail").value.trim();
  const password = document.getElementById("registerPassword").value;
  const confirmPassword = document.getElementById("registerConfirmPassword").value;

  if (!name || !email || !password || !confirmPassword) {
    showError("registerConfirmPasswordError", "All fields are required");
    return;
  }
  if (password !== confirmPassword) {
    showError("registerConfirmPasswordError", "Passwords do not match");
    return;
  }

  try {
    const auth = window.firebaseAuth;
    const db = window.firebaseDatabase;

    // Create user in Firebase Authentication
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Save user data in Firebase Realtime Database
    const profileRef = ref(db, "users/" + user.uid + "/profile");
    await set(profileRef, {
      uid: user.uid,
      name: name,
      email: email,
      age: '',
      gender: '',
      height: '',
      weight: '',
      goalCalories: '2000',
      goalProtein: '100',
      goalCarbs: '230',
      goalFats: '60',
      registeredAt: new Date().toISOString()
    });

    alert("✅ Registration successful!");
    window.location.href = "dashboard.html";
  } catch (error) {
    console.error("❌ Registration Error:", error);
    if (error.code === "auth/email-already-in-use") {
      showError("registerEmailError", "Email is already in use");
    } else {
      alert("Registration failed: " + error.message);
    }
  }
};

// ✅ Login Existing User
window.handleLogin = async (event) => {
  event.preventDefault();

  const email = document.getElementById("loginEmail").value.trim();
  const password = document.getElementById("loginPassword").value;

  try {
    const auth = window.firebaseAuth;
    await signInWithEmailAndPassword(auth, email, password);

    alert("✅ Login successful!");
    window.location.href = "dashboard.html";
  } catch (error) {
    console.error("❌ Login Error:", error);
    if (error.code === "auth/user-not-found") {
      showError("loginEmailError", "No account found for this email");
    } else if (error.code === "auth/wrong-password") {
      showError("loginPasswordError", "Incorrect password");
    } else {
      alert("Login failed: " + error.message);
    }
  }
};
