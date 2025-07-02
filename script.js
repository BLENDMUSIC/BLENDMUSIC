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
  