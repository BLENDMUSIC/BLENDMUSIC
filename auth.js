// auth.js
import { auth } from './firebase.js';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

// Gestion de l'inscription avec confirmation du mot de passe
const signupForm = document.getElementById('signupForm');
if (signupForm) {
  signupForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = signupForm.email.value;
    const password = signupForm.password.value;
    const confirmPassword = signupForm.confirmPassword.value;

    if (password !== confirmPassword) {
      alert("Les mots de passe ne correspondent pas !");
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert("Inscription réussie ! Vous pouvez maintenant vous connecter.");
      window.location.href = 'connexion.html';
    } catch (error) {
      alert("Erreur lors de l'inscription : " + error.message);
    }
  });
}

// Gestion de la connexion
const loginForm = document.getElementById('loginForm');
if (loginForm) {
  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = loginForm.email.value;
    const password = loginForm.password.value;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert("Connexion réussie !");
      window.location.href = 'index.html'; // ou autre page d'accueil
    } catch (error) {
      alert("Erreur lors de la connexion : " + error.message);
    }
  });
}
