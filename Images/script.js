// Alerte pour les contenus Premium
function alertePremium() {
    alert("Ce contenu est réservé aux membres Premium. Veuillez vous abonner pour y accéder.");
  }
  
  // Toggle menu mobile
  function toggleMenu() {
    const menu = document.getElementById("menu");
    menu.classList.toggle("show");
  }
  
  // Toggle liste des avantages Premium
  function toggleAvantages() {
    const list = document.getElementById("premium-list");
    const button = document.getElementById("toggle-btn");
  
    list.classList.toggle("show");
  
    if (list.classList.contains("show")) {
      button.textContent = "Masquer les avantages";
    } else {
      button.textContent = "Voir les avantages";
    }
  }
  
  // Traitement fictif du paiement
  function processPayment() {
    const plan = document.getElementById("plan").value;
    const operator = document.getElementById("operator").value;
  
    if (!plan || !operator) {
      alert("Veuillez sélectionner un type d'abonnement et un mode de paiement.");
      return false;
    }
  
    alert("Merci pour votre abonnement. Redirection vers l’espace Premium...");
    window.location.href = "merci.html";
    return false;
  }
  
  // Connexion fictive sans Firebase (à améliorer)
  function loginUser() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
  
    if (password === "blend2025") {
      alert("Connexion réussie !");
    } else {
      alert("Mot de passe incorrect. Réessayez.");
    }
  
    return false;
  }
  document.addEventListener('DOMContentLoaded', () => {
    const section = document.querySelector('#artist-of-the-month');
  
    function revealSection() {
      const top = section.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;
  
      if (top < windowHeight - 100) { // 100px avant la visibilité
        section.classList.add('visible');
        window.removeEventListener('scroll', revealSection);
      }
    }
  
    window.addEventListener('scroll', revealSection);
    revealSection(); // appel initial au cas où déjà visible
  });
  document.addEventListener('DOMContentLoaded', () => {
    const fadeIns = document.querySelectorAll('.fade-in');
  
    function handleScroll() {
      fadeIns.forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight - 100) {
          el.classList.add('visible');
        }
      });
    }
  
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Appel initial
  });
  function toggleMenu() {
    const menu = document.getElementById("menu");
    menu.classList.toggle("active");
  
    const toggle = document.querySelector(".menu-toggle");
    toggle.classList.toggle("active");
  }

  const newsletterForm = document.getElementById("newsletterForm");
const newsletterEmail = document.getElementById("newsletterEmail");
const newsletterMessage = document.getElementById("newsletterMessage");

newsletterForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const email = newsletterEmail.value.trim();

  // Validation basique email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    newsletterMessage.style.color = "red";
    newsletterMessage.textContent = "Veuillez entrer une adresse e-mail valide.";
    return;
  }

  // Ici, tu peux ajouter l’envoi à ta base Firebase ou autre service
  // Pour l’instant on simule l’inscription réussie
  newsletterMessage.style.color = "green";
  newsletterMessage.textContent = "Merci pour votre inscription à la newsletter !";

  // Réinitialiser le formulaire
  newsletterForm.reset();
});

// firebase.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-storage.js";

// Configuration Firebase (mets ici ta config)
const firebaseConfig = {
  apiKey: "AIzaSyCyMs7KY2GQiJaZHBUN9Cj1_EUmGU70hmM",
  authDomain: "blendmusic-1ff23.firebaseapp.com",
  projectId: "blendmusic-1ff23",
  storageBucket: "blendmusic-1ff23.appspot.com",
  messagingSenderId: "241116572153",
  appId: "1:241116572153:web:e257e73911c954fa477528"
};

// Initialisation de l'application Firebase
const app = initializeApp(firebaseConfig);

// Initialisation des services Firebase
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

import { createUserWithEmailAndPassword, sendEmailVerification } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { auth } from './firebase.js';

export async function inscrire(email, password) {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    await sendEmailVerification(userCredential.user);
    alert("Compte créé ! Vérifie ton email.");
  } catch (error) {
    alert(error.message);
  }
}

import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { auth } from './firebase.js';

export async function connecter(email, password) {
  try {
    await signInWithEmailAndPassword(auth, email, password);
    alert("Connexion réussie !");
    window.location.href = "dashboard.html";
  } catch (error) {
    alert(error.message);
  }
}

import { db } from './firebase.js';
import { collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

export async function ajouterTemoignage(nom, message, note) {
  try {
    await addDoc(collection(db, "temoignages"), {
      nom: nom,
      message: message,
      note: note,
      date: serverTimestamp()
    });
    alert("Merci pour votre avis !");
  } catch (error) {
    console.error("Erreur :", error.message);
  }
}

import { db } from './firebase.js';
import { collection, getDocs, orderBy, query } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

export async function chargerTemoignages(callback) {
  const q = query(collection(db, "temoignages"), orderBy("date", "desc"));
  const snapshot = await getDocs(q);

  snapshot.forEach(doc => {
    callback(doc.data());
  });
}

import { ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-storage.js";
import { storage } from './firebase.js';

export async function uploaderMusique(fichier, nom) {
  try {
    const fichierRef = ref(storage, `musiques/${nom}`);
    await uploadBytes(fichierRef, fichier);
    const url = await getDownloadURL(fichierRef);
    alert("Musique téléchargée !");
    return url;
  } catch (error) {
    console.error("Erreur d'upload :", error.message);
  }
}

<script>
  document.addEventListener("DOMContentLoaded", () => {
    const popup = document.getElementById("welcomePopup");
    const closeBtn = document.getElementById("closePopup");

    // Affiche la pop-up une seule fois (par session ou localStorage)
    if (!localStorage.getItem("popupShown")) {
      popup.style.display = "flex";
      localStorage.setItem("popupShown", "true");
    }

    closeBtn.addEventListener("click", () => {
      popup.style.display = "none";
    });
  });
</script>
