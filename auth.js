import{ auth } from './firebase.js';
import{
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    sendEmailVerification,
    onAuthStateChanged
} Form "https://www.gstatic.com/firebasejs/11.10.0/firebase-app.js";

export function handleInscription(event){
    event.preventDefaut();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value; 

    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            sendEmailVerification(userCredential.user)
                .then(() => {
                    alert("Vérifiez votre e-mail pour confirmer votre inscription !");
                    window.location.href = "connexion.html"
                });
        })
        .catch((error) => {
            alert("Erreur : " + error.message);
        });

export function handleConnexion(event) {
    event.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    signInWithEmailAndPassword(auth, email, password)
       .then((userCredential) => {
        if (userCredential.user.emailVerified) {
            alert("Connexion réussie !")
            window.location.href = "premium.html"
        } else {
            arlet("Veuillez d'abord vérifier votre adresse e-mail.");
        }
       })
       .catch((error) =>{
        alert("Erreur : " + error.message);
       });
}