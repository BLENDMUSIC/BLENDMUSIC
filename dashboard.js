import { auth, db } from './firebase.js';
import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const userEmailSpan = document.getElementById('userEmail');
const logoutBtn = document.getElementById('logoutBtn');
const premiumSection = document.getElementById('premiumSection');

onAuthStateChanged(auth, async (user) => {
  if (user) {
    try {
      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        userEmailSpan.textContent = `${user.email} (${data.role === "premium" ? "Abonné Premium" : "Utilisateur Simple"})`;

        if (data.role === "premium") {
          premiumSection.style.display = 'block';
        } else {
          premiumSection.style.display = 'none';
        }
      } else {
        userEmailSpan.textContent = `${user.email} (Rôle non défini)`;
        premiumSection.style.display = 'none';
      }
    } catch (error) {
      alert("Erreur lors de la récupération des données utilisateur : " + error.message);
      userEmailSpan.textContent = user.email;
      premiumSection.style.display = 'none';
    }
  } else {
    window.location.href = 'connexion.html';
  }
});

logoutBtn.addEventListener('click', () => {
  signOut(auth)
    .then(() => {
      alert('Déconnexion réussie.');
      window.location.href = 'connexion.html';
    })
    .catch((error) => {
      alert('Erreur lors de la déconnexion : ' + error.message);
    });
});
