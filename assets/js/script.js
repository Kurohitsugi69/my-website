// Letter content: English & Japanese
const letterLinesEn = [
  "Hi Nagi Chan,",
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

let state = "closed"; // 'closed' → 'envelope-open' → 'letter-taken' → 'letter-open'
let currentLang = "en";
let isAudioMuted = false;
let animationTimeouts = [];

function clearAnimation() {
  animationTimeouts.forEach((id) => clearTimeout(id));
  animationTimeouts = [];
}

function renderLetter() {
  clearAnimation();
  letterContent.innerHTML = "";

  const lines = currentLang === "en" ? letterLinesEn : letterLinesJp;
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
  if (currentLang === "en") {
    currentLang = "jp";
    langEnSpan.classList.remove("active");
    langJpSpan.classList.add("active");
  } else {
    currentLang = "en";
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
    muteIcon.textContent = "🔇";
  } else {
    bgAudio.muted = false;
    muteIcon.textContent = "🔊";
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
