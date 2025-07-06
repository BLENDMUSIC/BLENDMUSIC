// carousel.js
document.addEventListener('DOMContentLoaded', () => {
    const slides = document.querySelectorAll('.carousel .slide');
    const prevBtn = document.querySelector('.carousel .prev');
    const nextBtn = document.querySelector('.carousel .next');
    const dots = document.querySelectorAll('.carousel .dot');
  
    let currentIndex = 0;
  
    function showSlide(index) {
      if (index < 0) index = slides.length - 1;
      if (index >= slides.length) index = 0;
  
      slides.forEach((slide, i) => {
        slide.classList.toggle('active', i === index);
        dots[i].classList.toggle('active', i === index);
        dots[i].setAttribute('aria-selected', i === index ? 'true' : 'false');
        dots[i].tabIndex = i === index ? 0 : -1;
      });
  
      currentIndex = index;
    }
  
    prevBtn.addEventListener('click', () => {
      showSlide(currentIndex - 1);
    });
  
    nextBtn.addEventListener('click', () => {
      showSlide(currentIndex + 1);
    });
  
    dots.forEach((dot, i) => {
      dot.addEventListener('click', () => {
        showSlide(i);
      });
    });
  
    // Auto slide toutes les 5 secondes
    setInterval(() => {
      showSlide(currentIndex + 1);
    }, 5000);
  });
  