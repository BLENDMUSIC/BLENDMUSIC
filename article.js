import { db } from "./firebase.js";
import {
  collection,
  getDocs,
  query,
  where
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// Récupère le slug dans l'URL
const params = new URLSearchParams(window.location.search);
const slug = params.get("slug");

// Sélectionne la section où afficher l'article
const container = document.getElementById("article-container");

// Vérifie qu'on a bien un slug
if (!slug) {
  container.innerHTML = "<p>Article introuvable.</p>";
} else {
  // Recherche dans Firestore
  const q = query(collection(db, "articles"), where("slug", "==", slug));
  const snapshot = await getDocs(q);

  if (snapshot.empty) {
    container.innerHTML = "<p>Article non trouvé.</p>";
  } else {
    const article = snapshot.docs[0].data();

    container.innerHTML = `
      <div class="article-detail">
        <h2>${article.titre}</h2>
        <p class="meta"><strong>${article.auteur}</strong> – ${new Date(article.date.seconds * 1000).toLocaleDateString()}</p>
        <img src="${article.imageURL}" alt="${article.titre}" class="article-img-large">
        <div class="contenu">${article.contenu}</div>
      </div>
    `;
  }
}
