// firebase.js

// Import des SDK nécessaires
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// Configuration de ton projet Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCyMs7KY2GQiJaZHBUN9Cj1_EUmGU70hmM",
  authDomain: "blendmusic-1ff23.firebaseapp.com",
  projectId: "blendmusic-1ff23",
  storageBucket: "blendmusic-1ff23.appspot.com",
  messagingSenderId: "241116572153",
  appId: "1:241116572153:web:e257e73911c954fa477528"
};

// Initialisation de Firebase
const app = initializeApp(firebaseConfig);

// Initialisation de l'authentification
export const auth = getAuth(app);

// Initialisation de la base de données Firestore
export const db = getFirestore(app);
