const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
const intro = document.getElementById("intro");
const count = document.getElementById("count");
const digit = document.getElementById("digit");
const cue = document.getElementById("cue");
const action = document.getElementById("action");
const endcard = document.getElementById("endcard");
const flash = document.getElementById("flash");
const leak = document.getElementById("leak");
const stage = document.getElementById("stage");

const cues = {
  3: "Picture lock in three.",
  2: "Sound rolls in two.",
  1: "Camera. One.",
};

function hideAll() {
  [intro, count, action, endcard].forEach((el) => {
    el.classList.remove("is-on");
    el.setAttribute("aria-hidden", "true");
  });
}

function show(el) {
  hideAll();
  el.classList.add("is-on");
  el.setAttribute("aria-hidden", "false");
}

function bang() {
  flash.classList.remove("on");
  leak.classList.remove("on");
  stage.classList.remove("is-shake");
  void flash.offsetWidth;
  flash.classList.add("on");
  leak.classList.add("on");
  stage.classList.add("is-shake");
}

function beat(n) {
  digit.textContent = String(n);
  cue.textContent = cues[n];
  count.classList.remove("is-on");
  void count.offsetWidth;
  show(count);
}

if (reduce) {
  show(endcard);
} else {
  show(intro);
  setTimeout(() => beat(3), 2200);
  setTimeout(() => beat(2), 3400);
  setTimeout(() => beat(1), 4600);
  setTimeout(() => {
    bang();
    show(action);
  }, 5750);
  setTimeout(() => show(endcard), 7600);
}
