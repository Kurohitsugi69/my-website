// Letter content: English & Japanese
const letterLinesEn = [
  "Beloved Nagi Chan,",
  "",
  "I just wanted to leave a small note.",
  "You can read it whenever you feel comfortable, and you don't have to reply.",
  "",
  "I've been carrying this for a while.",
  "I just didn't want to say it when everything felt heavy for both of us,",
  "or when I couldn't say it in the way I felt you deserved.",
  "",
  "My quietness wasn't distance.",
  "It was me waiting for a better moment.",
  "I do want to say this —",
  "just not in the middle of everything you're going through right now.",
  "",
  "Here's what I truly mean.",
  "",
  "I care about you",
  "more than I let myself show.",
  "You matter to me",
  "in ways I don't usually put into words.",
  "",
  "Whatever is happening around you,",
  "I'm still on your side.",
  "",
  "When life settles a little",
  "and when I'm steadier too,",
  "I'll say this in the way it should be said.",
  "",
  "Love you,",
  "— Shin"
];

const letterLinesJp = [
  "愛しいナギチャンへ",
  "",
  "ちょっとだけ伝えたいことがあって、このメッセージを書きました。",
  "落ち着いたときに読んでくれたら嬉しいです。返事はしなくても大丈夫です。",
  "",
  "この気持ちは前からずっと心の中にありました。",
  "ただ、お互いしんどいタイミングで言いたくなかったし、",
  "ナギが本当はもっとよい形で聞いていいことだとも思っていました。",
  "",
  "僕が静かにしていたのは、離れたかったからじゃないよ。",
  "もう少し良いタイミングを待っていただけです。",
  "本当はちゃんと伝えたい。",
  "ただ、今みたいにナギがたくさん抱えているときではない方がいいと思いました。",
  "",
  "だから、今の僕の本音をシンプルに書くね。",
  "",
  "僕はナギのことが大事です。",
  "言葉にしている以上に、ずっと。",
  "うまく言葉にしない部分まで含めて、",
  "ナギは僕にとって特別な存在です。",
  "",
  "どんなことが起きていても、",
  "僕はずっとナギの味方でいます。",
  "",
  "もう少しお互いの状況が落ち着いて、",
  "僕自身もちゃんと整ったときに、",
  "この気持ちをふさわしい形で伝えたいと思っています。",
  "",
  "心から愛してる。",
  "― シン"
];

const envelope = document.getElementById("envelope");
const envelopeWrapper = document.getElementById("envelopeWrapper");
const letterWrapper = document.getElementById("letterWrapper");
const letter = document.getElementById("letter");
const hint = document.getElementById("hint");
const letterContent = document.getElementById("letterContent");
const langToggle = document.getElementById("langToggle");
const langEnSpan = document.getElementById("langEn");
const langJpSpan = document.getElementById("langJp");
const innerLetter = document.querySelector(".inner-letter");
const bgAudio = document.getElementById("bgAudio");
const muteBtn = document.getElementById("muteBtn");
const muteIcon = document.getElementById("muteIcon");
const albumAudio = document.getElementById("albumAudio");
const playPauseBtn = document.getElementById("playPauseBtn");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const progressBar = document.getElementById("progressBar");
const trackName = document.getElementById("trackName");
const trackTime = document.getElementById("trackTime");
const shuffleBtn = document.getElementById("shuffleBtn");
const repeatBtn = document.getElementById("repeatBtn");
const playlistToggleBtn = document.getElementById("playlistToggleBtn");
const playlist = document.getElementById("playlist");
const playlistItems = document.getElementById("playlistItems");
const toggleIcon = document.getElementById("toggleIcon");
const progressTooltip = document.getElementById("progressTooltip");

let state = "closed"; // 'closed' → 'envelope-open' → 'letter-taken' → 'letter-open'
let currentLang = "jp";
let isAudioMuted = false;
let currentTrack = 1;
let repeatMode = 0; // 0: off, 1: repeat all, 2: repeat one
let isShuffle = false;
let bgAudioWasMuted = false;
let shuffleOrder = [];

let albumTracks = [
  { name: "Intro (End of the World)", src: "assets/audio/album/Intro (End Of The World).mp3" },
  { name: "Bye", src: "assets/audio/album/Bye.mp3" },
  { name: "Don't Wanna Break Up Again", src: "assets/audio/album/Don't Wanna Break Up Again.mp3" },
  { name: "Saturn Returns Interlude", src: "assets/audio/album/Saturn Returns Interlude.mp3" },
  { name: "Eternal Sunshine", src: "assets/audio/album/Eternal Sunshine.mp3" },
  { name: "Supernatural", src: "assets/audio/album/Supernatural.mp3" },
  { name: "True Story", src: "assets/audio/album/True Story.mp3" },
  { name: "The Boy Is Mine", src: "assets/audio/album/The Boy Is Mine.mp3" },
  { name: "Yes, And?", src: "assets/audio/album/Yes, And?.mp3" },
  { name: "We Can't Be Friends (Wait for Your Love)", src: "assets/audio/album/We Can't Be Friends (Wait for Your Love).mp3" },
  { name: "I Wish I Hated You", src: "assets/audio/album/I Wish I Hated You.mp3" },
  { name: "Imperfect for You", src: "assets/audio/album/Imperfect for You.mp3" },
  { name: "Ordinary Things", src: "assets/audio/album/Ordinary Things.mp3" }
];
let animationTimeouts = [];

function clearAnimation() {
  animationTimeouts.forEach((id) => clearTimeout(id));
  animationTimeouts = [];
}

function renderLetter() {
  clearAnimation();
  letterContent.innerHTML = "";

  const lines = currentLang === "jp" ? letterLinesJp : letterLinesEn;
  let index = 0;

  const showNext = () => {
    if (index >= lines.length) return;
    const p = document.createElement("p");
    p.className = "line";
    p.textContent = lines[index];
    letterContent.appendChild(p);

    // force reflow, then show
    requestAnimationFrame(() => {
      p.classList.add("visible");
    });

    index++;
    const timeoutId = setTimeout(showNext, 650);
    animationTimeouts.push(timeoutId);
  };

  showNext();
}

envelopeWrapper.addEventListener("click", () => {
  if (state !== "closed") return;
  envelope.classList.add("opened");
  state = "envelope-open";
  hint.textContent = "Click the letter to take it out.";
});

innerLetter.addEventListener("click", (e) => {
  e.stopPropagation();
  if (state === "envelope-open") {
    innerLetter.classList.add("taken");
    state = "letter-taken";
    setTimeout(() => {
      letterWrapper.classList.add("visible");
      hint.textContent = "Click the letter to open it.";
    }, 600);
  }
});

letter.addEventListener("click", (e) => {
  e.stopPropagation();
  if (state === "letter-taken") {
    state = "letter-open";
    hint.textContent = "";
    renderLetter();
  }
});

langToggle.addEventListener("click", (e) => {
  e.stopPropagation();
  if (currentLang === "jp") {
    currentLang = "en";
    langEnSpan.classList.remove("active");
    langJpSpan.classList.add("active");
  } else {
    currentLang = "jp";
    langJpSpan.classList.remove("active");
    langEnSpan.classList.add("active");
  }
  renderLetter();
});

muteBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  isAudioMuted = !isAudioMuted;
  if (isAudioMuted) {
    bgAudio.muted = true;
    muteIcon.src = "assets/img/mute.png";
    muteIcon.alt = "Mute";
  } else {
    bgAudio.muted = false;
    muteIcon.src = "assets/img/unmute.png";
    muteIcon.alt = "Unmute";
  }
});

// Autoplay audio on page load
window.addEventListener("load", () => {
  bgAudio.play().catch(err => console.log("Audio autoplay blocked by browser"));
});

// Also try to play on first user interaction
document.addEventListener("click", () => {
  if (bgAudio.paused) {
    bgAudio.play().catch(err => console.log("Audio play failed:", err));
  }
}, { once: true });

// Music player controls
function formatTime(seconds) {
  if (isNaN(seconds)) return "0:00";
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, "0")}`;
}

function loadTrack(trackIndex) {
  if (trackIndex < 1 || trackIndex > albumTracks.length) return;
  currentTrack = trackIndex;
  const track = albumTracks[currentTrack - 1];
  trackName.textContent = track.name;
  albumAudio.src = track.src;
  albumAudio.load();
  updatePlaylistUI();
}

function updatePlaylistUI() {
  document.querySelectorAll(".playlist-item").forEach(item => {
    item.classList.remove("playing");
  });
  const playingItem = document.querySelector(`[data-track="${currentTrack}"]`);
  if (playingItem) {
    playingItem.classList.add("playing");
  }
}

function renderPlaylist() {
  playlistItems.innerHTML = "";
  const displayOrder = isShuffle ? shuffleOrder : Array.from({ length: albumTracks.length }, (_, i) => i + 1);
  
  displayOrder.forEach((trackIndex, index) => {
    const track = albumTracks[trackIndex - 1];
    const item = document.createElement("div");
    item.className = "playlist-item";
    item.dataset.track = trackIndex;
    if (trackIndex === currentTrack) {
      item.classList.add("playing");
    }
    
    item.innerHTML = `
      <span class="playlist-item-number">${index + 1}.</span>
      <span class="playlist-item-name">${track.name}</span>
    `;
    
    item.addEventListener("click", () => {
      loadTrack(trackIndex);
      if (bgAudioWasMuted === false && !isAudioMuted) {
        bgAudio.muted = true;
        muteIcon.src = "assets/img/mute.png";
        muteIcon.alt = "Mute";
        isAudioMuted = true;
      }
      albumAudio.play();
      playPauseBtn.textContent = "⏸";
    });
    
    playlistItems.appendChild(item);
  });
}

function initializeShuffle() {
  shuffleOrder = Array.from({ length: albumTracks.length }, (_, i) => i + 1);
  for (let i = shuffleOrder.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffleOrder[i], shuffleOrder[j]] = [shuffleOrder[j], shuffleOrder[i]];
  }
}

function getNextTrack() {
  if (isShuffle) {
    const currentIndex = shuffleOrder.indexOf(currentTrack);
    if (currentIndex < shuffleOrder.length - 1) {
      return shuffleOrder[currentIndex + 1];
    } else if (repeatMode === 1) {
      return shuffleOrder[0];
    }
    return null;
  } else {
    if (currentTrack < albumTracks.length) {
      return currentTrack + 1;
    } else if (repeatMode === 1) {
      return 1;
    }
    return null;
  }
}

function getPreviousTrack() {
  if (isShuffle) {
    const currentIndex = shuffleOrder.indexOf(currentTrack);
    if (currentIndex > 0) {
      return shuffleOrder[currentIndex - 1];
    }
    return null;
  } else {
    if (currentTrack > 1) {
      return currentTrack - 1;
    }
    return null;
  }
}

playPauseBtn.addEventListener("click", () => {
  if (albumAudio.paused) {
    // Save bg audio state before muting
    if (!isAudioMuted) {
      bgAudioWasMuted = !bgAudio.muted;
      bgAudio.muted = true;
      muteIcon.src = "assets/img/mute.png";
      muteIcon.alt = "Mute";
      isAudioMuted = true;
    }
    albumAudio.play();
    playPauseBtn.textContent = "⏸";
  } else {
    albumAudio.pause();
    playPauseBtn.textContent = "▶";
  }
});

prevBtn.addEventListener("click", () => {
  const prevTrack = getPreviousTrack();
  if (prevTrack) {
    loadTrack(prevTrack);
    if (bgAudioWasMuted === false && !isAudioMuted) {
      bgAudio.muted = true;
      muteIcon.src = "assets/img/mute.png";
      muteIcon.alt = "Mute";
      isAudioMuted = true;
    }
    albumAudio.play();
    playPauseBtn.textContent = "⏸";
  }
});

nextBtn.addEventListener("click", () => {
  const nextTrack = getNextTrack();
  if (nextTrack) {
    loadTrack(nextTrack);
    if (bgAudioWasMuted === false && !isAudioMuted) {
      bgAudio.muted = true;
      muteIcon.src = "assets/img/mute.png";
      muteIcon.alt = "Mute";
      isAudioMuted = true;
    }
    albumAudio.play();
    playPauseBtn.textContent = "⏸";
  }
});

shuffleBtn.addEventListener("click", () => {
  isShuffle = !isShuffle;
  if (isShuffle) {
    initializeShuffle();
    shuffleBtn.classList.add("active");
  } else {
    shuffleBtn.classList.remove("active");
  }
  renderPlaylist();
});

repeatBtn.addEventListener("click", () => {
  repeatMode = (repeatMode + 1) % 3; // 0 → 1 → 2 → 0
  repeatBtn.classList.remove("active", "active-repeat-one");
  
  if (repeatMode === 1) {
    repeatBtn.classList.add("active");
    repeatBtn.title = "Repeat All";
  } else if (repeatMode === 2) {
    repeatBtn.classList.add("active", "active-repeat-one");
    repeatBtn.title = "Repeat One";
  } else {
    repeatBtn.title = "Repeat";
  }
});

albumAudio.addEventListener("timeupdate", () => {
  progressBar.value = (albumAudio.currentTime / albumAudio.duration) * 100 || 0;
  trackTime.textContent = `${formatTime(albumAudio.currentTime)} / ${formatTime(albumAudio.duration)}`;
});

albumAudio.addEventListener("ended", () => {
  if (repeatMode === 2) {
    // Repeat one track
    albumAudio.currentTime = 0;
    albumAudio.play();
  } else {
    const nextTrack = getNextTrack();
    if (nextTrack) {
      loadTrack(nextTrack);
      // Keep bg audio muted
      if (bgAudioWasMuted === false && !isAudioMuted) {
        bgAudio.muted = true;
        muteIcon.src = "assets/img/mute.png";
        muteIcon.alt = "Mute";
        isAudioMuted = true;
      }
      albumAudio.play();
    } else {
      playPauseBtn.textContent = "▶";
    }
  }
});

progressBar.addEventListener("change", () => {
  albumAudio.currentTime = (progressBar.value / 100) * albumAudio.duration;
});

progressBar.addEventListener("mousemove", (e) => {
  const rect = progressBar.getBoundingClientRect();
  const percent = (e.clientX - rect.left) / rect.width;
  const time = percent * albumAudio.duration;
  
  progressTooltip.textContent = formatTime(time);
  progressTooltip.style.left = (percent * 100) + "%";
  progressTooltip.style.transform = "translateX(-50%)";
  progressTooltip.classList.add("visible");
});

progressBar.addEventListener("mouseleave", () => {
  progressTooltip.classList.remove("visible");
});

playlistToggleBtn.addEventListener("click", () => {
  playlist.classList.toggle("show");
  playlistToggleBtn.classList.toggle("active");
});

// Load first track and render playlist
loadTrack(1);
renderPlaylist();
