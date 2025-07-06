// avis.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, serverTimestamp, query, orderBy } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// 🔧 Configuration Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCyMs7KY2GQiJaZHBUN9Cj1_EUmGU70hmM",
  authDomain: "blendmusic-1ff23.firebaseapp.com",
  projectId: "blendmusic-1ff23",
  storageBucket: "blendmusic-1ff23.appspot.com",
  messagingSenderId: "241116572153",
  appId: "1:241116572153:web:e257e73911c954fa477528"
};

// 🚀 Initialisation
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const avisRef = collection(db, "avis");

// ⭐ Gestion des étoiles
const starsDiv = document.getElementById("rating-stars");
let currentRating = 0;
starsDiv.innerHTML = [...Array(5)].map((_, i) => `<span data-index="${i + 1}">★</span>`).join('');

starsDiv.addEventListener("click", e => {
  if (e.target.dataset.index) {
    currentRating = parseInt(e.target.dataset.index);
    highlightStars(currentRating);
  }
});

function highlightStars(count) {
  const stars = starsDiv.querySelectorAll("span");
  stars.forEach((star, i) => {
    star.classList.toggle("filled", i < count);
  });
}

// 📤 Envoi du formulaire
const form = document.getElementById("reviewForm");
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const message = document.getElementById("message").value.trim();

  if (!currentRating || !name || !message) return alert("Tous les champs sont obligatoires !");

  try {
    await addDoc(avisRef, {
      name,
      rating: currentRating,
      message,
      createdAt: serverTimestamp(),
    });
    form.reset();
    currentRating = 0;
    highlightStars(0);
    loadReviews();
  } catch (error) {
    console.error("Erreur Firestore :", error);
  }
});

// 📥 Chargement des témoignages
async function loadReviews() {
  const container = document.getElementById("reviews-container");
  container.innerHTML = "Chargement...";

  const q = query(avisRef, orderBy("createdAt", "desc"));
  const querySnapshot = await getDocs(q);

  container.innerHTML = "";
  querySnapshot.forEach(doc => {
    const data = doc.data();
    const div = document.createElement("div");
    div.className = "review fade-in";
    div.innerHTML = `
      <div class="stars">${"★".repeat(data.rating)}${"☆".repeat(5 - data.rating)}</div>
      <p><strong>${data.name}</strong></p>
      <p>${data.message}</p>
    `;
    container.appendChild(div);
  });
}

// Au chargement
document.addEventListener("DOMContentLoaded", loadReviews);
