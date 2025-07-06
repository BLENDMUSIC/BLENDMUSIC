import { auth, db } from './firebase.js';
import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { collection, getDocs, doc, updateDoc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const usersBody = document.getElementById('usersBody');

// Vérifier que l'utilisateur connecté est admin (optionnel, ici on laisse accès libre pour test)
onAuthStateChanged(auth, async (user) => {
  if (user) {
    // Charge la liste des utilisateurs
    await loadUsers();
  } else {
    window.location.href = 'connexion.html';
  }
});

async function loadUsers() {
  usersBody.innerHTML = '';
  try {
    const querySnapshot = await getDocs(collection(db, "users"));
    querySnapshot.forEach((docSnap) => {
      const data = docSnap.data();
      const userId = docSnap.id;

      const tr = document.createElement('tr');

      // Email
      const tdEmail = document.createElement('td');
      tdEmail.textContent = data.email || 'Non défini';
      tr.appendChild(tdEmail);

      // Rôle
      const tdRole = document.createElement('td');
      tdRole.textContent = data.role || 'simple';
      tr.appendChild(tdRole);

      // Changer rôle (select)
      const tdChange = document.createElement('td');
      const select = document.createElement('select');
      const roles = ['simple', 'premium'];
      roles.forEach(role => {
        const option = document.createElement('option');
        option.value = role;
        option.textContent = role.charAt(0).toUpperCase() + role.slice(1);
        if (role === data.role) option.selected = true;
        select.appendChild(option);
      });

      select.addEventListener('change', async () => {
        try {
          await updateDoc(doc(db, "users", userId), { role: select.value });
          alert(`Rôle mis à jour pour ${data.email} : ${select.value}`);
          tdRole.textContent = select.value;
        } catch (error) {
          alert("Erreur lors de la mise à jour du rôle : " + error.message);
        }
      });

      tdChange.appendChild(select);
      tr.appendChild(tdChange);

      usersBody.appendChild(tr);
    });
  } catch (error) {
    alert("Erreur lors du chargement des utilisateurs : " + error.message);
  }
}
const emailForm = document.getElementById('emailForm');

emailForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const subject = document.getElementById('subject').value.trim();
  const message = document.getElementById('message').value.trim();

  if (!subject || !message) {
    alert("Veuillez remplir le sujet et le message.");
    return;
  }

  try {
    // Récupérer les emails premium
    const premiumEmails = [];
    const querySnapshot = await getDocs(collection(db, "users"));
    querySnapshot.forEach((docSnap) => {
      const data = docSnap.data();
      if (data.role === "premium") {
        premiumEmails.push(data.email);
      }
    });

    if (premiumEmails.length === 0) {
      alert("Aucun abonné premium trouvé.");
      return;
    }

    // Ici tu devrais appeler ton backend ou API d'emailing pour envoyer les emails
    // On simule juste l'envoi avec un alert pour l'exemple

    alert(`Notification envoyée aux ${premiumEmails.length} abonnés premium !\nSujet: ${subject}\nMessage: ${message}`);

    // Réinitialiser le formulaire
    emailForm.reset();

  } catch (error) {
    alert("Erreur lors de l'envoi : " + error.message);
  }
});

