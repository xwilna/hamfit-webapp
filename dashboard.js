const goalLabels = {
  muscle_gain: ["عضله‌سازی", "تمرکز روی افزایش تدریجی قدرت و حجم عضلات."],
  fat_loss: ["کاهش چربی", "تمرکز روی فعالیت منظم و حفظ توده عضلانی."],
  fitness: ["تناسب اندام", "ترکیبی از قدرت، تحرک و آمادگی جسمانی."],
  strength: ["افزایش قدرت", "تمرکز روی پیشرفت اصولی در حرکات قدرتی."]
};
const levelLabels = { beginner: "مبتدی", intermediate: "متوسط", advanced: "پیشرفته" };
const profile = (() => {
  try { return JSON.parse(localStorage.getItem("hamfit_profile_preview") || "null"); }
  catch { return null; }
})();

const signedInUser = (() => {
  try { return JSON.parse(localStorage.getItem("hamfit_demo_user") || "null"); }
  catch { return null; }
})();
if (signedInUser?.full_name) document.getElementById("userName").textContent = signedInUser.full_name.split(" ")[0];

if (profile) {
  document.getElementById("ageValue").textContent = profile.age ? `${profile.age} سال` : "—";
  document.getElementById("heightValue").textContent = profile.height_cm ?? "—";
  document.getElementById("weightValue").textContent = profile.weight_kg ?? "—";
  document.getElementById("daysValue").textContent = profile.training_days ?? "۴";
  document.getElementById("levelValue").textContent = levelLabels[profile.training_level] || "مبتدی";
  document.getElementById("bodyValue").textContent = `${profile.height_cm ?? "—"} / ${profile.weight_kg ?? "—"}`; 
  const bmiValue = document.getElementById("bmiValue");
  const bmiStatus = document.getElementById("bmiStatus");
  const bmiNote = document.getElementById("bmiNote");
  if (bmiValue && profile.height_cm > 0 && profile.weight_kg > 0) {
    const bmi = profile.weight_kg / Math.pow(profile.height_cm / 100, 2);
    bmiValue.textContent = bmi.toFixed(1);
    let status = "محدوده معمول";
    if (profile.age < 18) {
      status = "نیازمند ارزیابی سنی";
      bmiNote.textContent = "برای افراد زیر ۱۸ سال، تفسیر BMI باید با نمودارهای رشد وابسته به سن و جنس انجام بشه؛ دسته‌بندی بزرگسالان مناسب نیست.";
    } else {
      if (bmi < 18.5) status = "کمبود وزن";
      else if (bmi < 25) status = "محدوده معمول";
      else if (bmi < 30) status = "اضافه وزن";
      else status = "چاقی";
    }
    bmiStatus.textContent = status;
  }
  const goal = goalLabels[profile.goal] || goalLabels.fitness;
  document.getElementById("goalValue").textContent = goal[0];
  document.getElementById("goalLarge").textContent = goal[0];
  document.getElementById("goalDescription").textContent = goal[1];
}

const days = Number(profile?.training_days || 4);
const weekButtons = [...document.querySelectorAll(".week-day")];
// A simple preview schedule: spread the selected number of sessions across the week.
const plannedIndexes = days === 2 ? [0, 3] : days === 3 ? [0, 2, 4] : days === 4 ? [0, 2, 4, 6] : days === 5 ? [0, 1, 3, 4, 6] : [0, 1, 2, 3, 4, 5];
plannedIndexes.forEach(index => weekButtons[index]?.classList.add("planned"));

let completed = new Set();
const progressText = document.getElementById("progressText");
const progressBar = document.getElementById("progressBar");
function updateProgress() {
  const percent = Math.round((completed.size / plannedIndexes.length) * 100);
  progressText.textContent = `${percent}٪`;
  progressBar.style.width = `${percent}%`;
}
weekButtons.forEach((button, index) => {
  button.addEventListener("click", () => {
    if (!plannedIndexes.includes(index)) return;
    if (completed.has(index)) {
      completed.delete(index);
      button.classList.remove("completed");
    } else {
      completed.add(index);
      button.classList.add("completed");
    }
    updateProgress();
  });
});

const completeButton = document.getElementById("completeWorkout");
completeButton.addEventListener("click", () => {
  const nextIndex = plannedIndexes.find(index => !completed.has(index));
  if (nextIndex === undefined) {
    document.getElementById("workoutStatus").textContent = "همه روزهای انتخابی این هفته علامت خوردن!";
    return;
  }
  completed.add(nextIndex);
  weekButtons[nextIndex].classList.add("completed");
  updateProgress();
  document.getElementById("workoutStatus").textContent = "تمرین در پیش‌نمایش ثبت شد ✓";
  completeButton.textContent = "✓ تمرین ثبت شد";
  completeButton.disabled = true;
});
