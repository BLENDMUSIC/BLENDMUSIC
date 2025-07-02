function alertePremium() {
    alert("Ce contenu est réservé aux membres Premium. Veuillez vous abonner y accéder.")
}

function toggleMenu() {
    const menu = document.getElementById("menu");
    menu.classList.toggle("show");
}
function toggleAvantages() {
    const list = document.getElementById("premium-list");
    list.classList.toggle("show");
}
function toggleAvantages() {
    const list = document.getElementById("premium-list");
    const list = document.getElementById("toggle-btn");
    list.classList.remove("hidden");
    list.classList.toggle("show");
    if (list.classList.contains("show")) {
        button.textContent = "Masquer les avantages";
    } else {
        button.textContent = "Voir les avantages";
    }
}

function processPayment() {
    const plan = document.getElementById("plan").value;
    const operator = document.getElementById("operator").value;

    if (!plan || !operator) {
        alert ("veuillez sélectionner un abonnement et un mode de paiement.");
        return false;
    }
    alert(
        Abonnement choisi : ${plan.toUpperCase()}\nMéthode de paiement : ${plan.toUpperCase()}\n\Redirection vers paiement...̀
    );
    window.location.href = "merci.html";
    return false;
}
function loginUser() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("Password").value;
    
    if (password === "blend2025") {
        alert("Connexion reussi !");
    } else {
        alert("Mot de passe incorrect.Réessayez.");
    }
    return false;
}