const tracks = [
    {
      title: "Amina",
      style: "Assiko",
      file: "audios/amina.mp3",
      cover: "Images/cover1.jpg"
    },
    {
      title: "Déception",
      style: "Mangambeu",
      file: "audios/deception.mp3",
      cover: "Images/cover2.jpg"
    },
    {
      title: "Et s’il fallait",
      style: "Bikutsi",
      file: "audios/etsilfallait.mp3",
      cover: "Images/cover3.jpg"
    }
  ];
  
  let current = 0;
  const audio = document.getElementById("audio");
  const title = document.getElementById("track-title");
  const style = document.getElementById("track-style");
  const cover = document.getElementById("cover");
  const progress = document.getElementById("progress");
  
  const playBtn = document.getElementById("play");
  const nextBtn = document.getElementById("next");
  const prevBtn = document.getElementById("prev");
  
  function loadTrack(index) {
    const track = tracks[index];
    audio.src = track.file;
    title.textContent = track.title;
    style.textContent = track.style;
    cover.src = track.cover;
    progress.value = 0;
    progress.max = 0;
  }
  
  function playTrack() {
    audio.play();
    playBtn.textContent = "⏸️";
  }
  
  function pauseTrack() {
    audio.pause();
    playBtn.textContent = "▶️";
  }
  
  // Bouton play/pause
  playBtn.addEventListener("click", () => {
    if (audio.paused) {
      playTrack();
    } else {
      pauseTrack();
    }
  });
  
  // Bouton suivant
  nextBtn.addEventListener("click", () => {
    current = (current + 1) % tracks.length;
    loadTrack(current);
    playTrack();
  });
  
  // Bouton précédent
  prevBtn.addEventListener("click", () => {
    current = (current - 1 + tracks.length) % tracks.length;
    loadTrack(current);
    playTrack();
  });
  
  // Fin du morceau : passe au suivant
  audio.addEventListener("ended", () => {
    current = (current + 1) % tracks.length;
    loadTrack(current);
    playTrack();
  });
  
  // Mise à jour de la barre de progression
  audio.addEventListener("timeupdate", () => {
    progress.value = audio.currentTime;
    progress.max = audio.duration || 0;
  });
  
  // Seek dans la barre de progression
  progress.addEventListener("input", () => {
    audio.currentTime = progress.value;
  });
  
  // Synchronise bouton play/pause si lecture stoppée par d'autres moyens
  audio.addEventListener("pause", () => {
    playBtn.textContent = "▶️";
  });
  
  audio.addEventListener("play", () => {
    playBtn.textContent = "⏸️";
  });
  
  // Chargement initial
  document.addEventListener("DOMContentLoaded", () => {
    loadTrack(current);
  });
  
  // Dark mode toggle
const darkModeToggle = document.getElementById("darkModeToggle");

darkModeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");

  if(document.body.classList.contains("dark-mode")){
    darkModeToggle.textContent = "☀️ Mode clair";
  } else {
    darkModeToggle.textContent = "🌙 Mode sombre";
  }
});
