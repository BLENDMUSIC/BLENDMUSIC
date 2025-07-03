// abonnement.js

import { doc, setDoc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import { auth, db } from './firebase.js'; // ✅ on récupère db ici

export async function enregistrerAbonnement(plan) {
  const user = auth.currentUser;

  if (!user) {
    alert("Vous devez être connecté pour vous abonner.");
    return;
  }

  const abonnementRef = doc(db, "abonnements", user.uid);

  try {
    await setDoc(abonnementRef, {
      plan: plan,
      dateDebut: new Date().toISOString(),
      actif: true
    });

    alert("Abonnement enregistré avec succès !");
    window.location.href = "merci.html";
  } catch (error) {
    alert("Erreur d’enregistrement : " + error.message);
  }
}

