// Firebase Configuration and Initialization

import { initializeApp } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-auth.js";
import { getDatabase, ref, get, set, child, update } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-database.js";

// ✅ Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBQ_8502Pbo4AOwYbkGzzEgT7toAycf_EA",
  authDomain: "campus-eats-e51d0.firebaseapp.com",
  projectId: "campus-eats-e51d0",
  storageBucket: "campus-eats-e51d0.firebasestorage.app",
  messagingSenderId: "986198349683",
  appId: "1:986198349683:web:94d20272074eca63d35706",
  databaseURL: "https://campus-eats-e51d0-default-rtdb.firebaseio.com/"
};

// ✅ Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);

// ✅ Make Firebase globally available
window.firebaseApp = app;
window.firebaseAuth = auth;
window.firebaseDatabase = database;

// Export Firebase functions globally (used in common.js)
window.firebaseRef = ref;
window.firebaseSet = set;
window.firebaseGet = get;
window.firebaseChild = child;
window.firebaseUpdate = update;
window.firebaseOnAuthStateChanged = onAuthStateChanged;
window.firebaseSignOut = signOut;

console.log("✅ Firebase connected successfully!");
