const savedProfile = JSON.parse(localStorage.getItem("hamfit_profile_preview") || "null");
const trainingPlace = savedProfile?.training_place || "gym";
const placeLabel = document.getElementById("trainingPlaceLabel");
if (placeLabel) placeLabel.textContent = trainingPlace === "home" ? "خانه" : "باشگاه";
const placeNotice = document.getElementById("placeNotice");
if (placeNotice) placeNotice.textContent = trainingPlace === "home"
  ? "نسخه تمرین خانگی فعاله؛ حرکت‌ها با وزن بدن یا وسایل ساده قابل اجرا هستن."
  : "نسخه باشگاهی فعاله؛ تمرکز روی اجرای حرکت‌ها با دستگاه‌ها و وزنه‌های باشگاهه.";
if (trainingPlace === "home") {
  const rowTitle = document.querySelector('[data-exercise="2"] .exercise-content h3');
  const rowSubtitle = document.querySelector('[data-exercise="2"] .exercise-content .exercise-title p');
  const rowTip = document.querySelector('[data-exercise="2"] .exercise-tip');
  if (rowTitle) rowTitle.textContent = "پارویی با کوله‌پشتی یا دمبل";
  if (rowSubtitle) rowSubtitle.textContent = "Backpack / Dumbbell Row";
  if (rowTip) rowTip.textContent = "یک کوله‌پشتی با وزن قابل‌کنترل بردار؛ کمر خنثی و آرنج رو به سمت لگن حرکت بده.";
}

// Switch the exercise list to genuinely different home or gym equipment options.
const exerciseVariants = trainingPlace === "home" ? [
  ["اسکوات با وزن بدن", "Bodyweight Squat", "پاها کمی بیشتر از عرض شانه باز؛ زانوها هم‌جهت پنجه‌ها حرکت کنن."],
  ["شنا سوئدی", "Push-up", "بدن رو در یک خط نگه دار و آرنج‌ها رو با کنترل خم کن."],
  ["پارویی با کوله‌پشتی یا دمبل", "Backpack / Dumbbell Row", "یک کوله‌پشتی با وزن قابل‌کنترل بردار؛ کمر خنثی و آرنج رو به سمت لگن حرکت بده."],
  ["پل باسن روی زمین", "Floor Glute Bridge", "با فشار پاشنه‌ها لگن رو بالا بیار و بالای حرکت مکث کن."],
  ["پلانک", "Plank", "شکم رو منقبض نگه دار و اجازه نده لگن بیفته یا بیش از حد بالا بره."]
] : [
  ["پرس پا دستگاه", "Leg Press", "کف پاها رو به اندازه عرض شانه روی صفحه بذار؛ زانوها رو قفل نکن و دامنه کنترل‌شده داشته باش."],
  ["پرس سینه دستگاه", "Machine Chest Press", "دسته‌ها هم‌سطح میانه سینه باشن؛ کتف‌ها رو ثابت نگه دار و حرکت رو کنترل کن."],
  ["لت پول‌داون دستگاه", "Lat Pulldown", "میله رو به سمت بالای سینه بکش؛ از تاب دادن تنه و کشیدن پشت گردن خودداری کن."],
  ["هیپ تراست دستگاه", "Machine Hip Thrust", "چانه کمی جمع، دنده‌ها پایین و در بالای حرکت باسن رو منقبض کن."],
  ["کرانچ سیم‌کش", "Cable Crunch", "با جمع کردن دنده‌ها به سمت لگن شکم رو منقبض کن؛ حرکت رو با دست‌ها نکش."]
];
document.querySelectorAll(".exercise-card").forEach((card, index) => {
  const variant = exerciseVariants[index];
  if (!variant) return;
  const title = card.querySelector(".exercise-title h3");
  const subtitle = card.querySelector(".exercise-title p");
  const tip = card.querySelector(".exercise-tip");
  if (title) title.textContent = variant[0];
  if (subtitle) subtitle.textContent = variant[1];
  if (tip) tip.textContent = variant[2];
});
const cards = [...document.querySelectorAll(".exercise-card")];
const checks = cards.map(card => card.querySelector('input[type="checkbox"]'));
const progressLabel = document.getElementById("progressLabel");
const progress = document.getElementById("sessionProgress");
const sideProgress = document.getElementById("sideProgress");
const bigProgress = document.getElementById("bigProgress");
const completionCaption = document.getElementById("completionCaption");
const finishButton = document.getElementById("finishWorkout");
const persianDigits = value => String(value).replace(/\d/g, d => "۰۱۲۳۴۵۶۷۸۹"[Number(d)]);

function updateWorkoutProgress() {
  const completed = checks.filter(check => check.checked).length;
  const percent = Math.round(completed / checks.length * 100);
  progressLabel.textContent = `${persianDigits(completed)} از ${persianDigits(checks.length)} حرکت`;
  progress.style.width = `${percent}%`;
  sideProgress.style.width = `${percent}%`;
  bigProgress.textContent = `${persianDigits(percent)}٪`;
  completionCaption.textContent = completed ? `${persianDigits(completed)} حرکت انجام شده` : "هنوز حرکتی ثبت نشده";
  cards.forEach((card, index) => card.classList.toggle("is-done", checks[index].checked));
  finishButton.disabled = completed !== checks.length;
}
checks.forEach(check => check.addEventListener("change", updateWorkoutProgress));

document.querySelectorAll(".detail-toggle").forEach(button => {
  button.addEventListener("click", () => {
    const card = button.closest(".exercise-card");
    card.classList.toggle("tip-open");
    button.querySelector("span").textContent = card.classList.contains("tip-open") ? "⌃" : "⌄";
  });
});

finishButton.addEventListener("click", () => {
  document.getElementById("finishMessage").textContent = "آفرین! جلسه در پیش‌نمایش تکمیل شد 💪";
  finishButton.textContent = "تمرین تکمیل شد ✓";
  finishButton.disabled = true;
  sessionStorage.setItem("hamfit_workout_preview_completed", "true");
});

// Rest timer
let duration = 60;
let remaining = duration;
let interval = null;
const timerDisplay = document.getElementById("timerDisplay");
const startButton = document.getElementById("timerStart");
function renderTimer() {
  const min = Math.floor(remaining / 60);
  const sec = remaining % 60;
  timerDisplay.textContent = `${persianDigits(String(min).padStart(2, "0"))}:${persianDigits(String(sec).padStart(2, "0"))}`;
}
function stopTimer() {
  if (interval) clearInterval(interval);
  interval = null;
  startButton.textContent = "شروع";
}
startButton.addEventListener("click", () => {
  if (interval) {
    stopTimer();
    return;
  }
  if (remaining <= 0) remaining = duration;
  startButton.textContent = "توقف";
  interval = setInterval(() => {
    remaining -= 1;
    renderTimer();
    if (remaining <= 0) {
      stopTimer();
      startButton.textContent = "دوباره";
      timerDisplay.textContent = "پایان!";
    }
  }, 1000);
});
document.getElementById("timerReset").addEventListener("click", () => {
  stopTimer();
  remaining = duration;
  renderTimer();
});
document.querySelectorAll(".timer-presets button").forEach(button => {
  button.addEventListener("click", () => {
    stopTimer();
    document.querySelectorAll(".timer-presets button").forEach(item => item.classList.remove("active"));
    button.classList.add("active");
    duration = Number(button.dataset.seconds);
    remaining = duration;
    renderTimer();
  });
});
renderTimer();
updateWorkoutProgress();

document.querySelectorAll(".muscle-anatomy").forEach(panel => {
  const targets = (panel.dataset.highlight || "").split(/\\s+/).filter(Boolean);
  panel.querySelectorAll(".zone").forEach(zone => {
    const muscle = [...zone.classList].find(name => name !== "zone");
    if (targets.includes(muscle)) zone.classList.add("is-active");
  });
});
