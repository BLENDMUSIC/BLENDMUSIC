document.addEventListener('DOMContentLoaded', () => {
    fetch('carousel.html')
      .then(res => {
        if (!res.ok) throw new Error('Erreur de chargement du carousel');
        return res.text();
      })
      .then(html => {
        document.getElementById('carousel-container').innerHTML = html;
        // Charge le script du carrousel si besoin (si carousel.html ne l'inclut pas)
        const script = document.createElement('script');
        script.src = 'carousel.js';
        document.body.appendChild(script);
      })
      .catch(err => console.error(err));
  });
  