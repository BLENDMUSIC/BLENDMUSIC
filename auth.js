import { auth } from './firebase.js';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendEmailVerification,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js"; // ✅ bon lien

// Fonction d'inscription
export function handleInscription(event) {
  event.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      sendEmailVerification(userCredential.user)
        .then(() => {
          alert("Vérifiez votre e-mail pour confirmer votre inscription !");
          window.location.href = "connexion.html";
        });
    })
    .catch((error) => {
      alert("Erreur : " + error.message);
    });
}

// Fonction de connexion
export function handleConnexion(event) {
  event.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      if (userCredential.user.emailVerified) {
        alert("Connexion réussie !");
        window.location.href = "premium.html";
      } else {
        alert("Veuillez d'abord vérifier votre adresse e-mail.");
      }
    })
    .catch((error) => {
      alert("Erreur : " + error.message);
    });
}
