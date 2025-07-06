// auth.js
import { auth, db } from './firebase.js';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { doc, setDoc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// Gestion de l'inscription avec création profil utilisateur dans Firestore
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
      // Créer l'utilisateur Firebase Auth
      await createUserWithEmailAndPassword(auth, email, password);

      // Créer le profil utilisateur dans Firestore avec rôle par défaut
      await setDoc(doc(db, "users", auth.currentUser.uid), {
        email: email,
        role: "simple", // rôle par défaut
        createdAt: new Date()
      });

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
      window.location.href = 'dashboard.html'; // redirection vers dashboard
    } catch (error) {
      alert("Erreur lors de la connexion : " + error.message);
    }
  });
}
import { auth, db, storage } from './firebase.js';
