const profileForm = document.getElementById("profileForm");
const dayButtons = document.querySelectorAll(".day-option");
const daysInput = document.getElementById("trainingDays");
const profileMessage = document.getElementById("profileMessage");

dayButtons.forEach((button) => {
  button.addEventListener("click", () => {
    dayButtons.forEach((item) => item.classList.remove("selected"));
    button.classList.add("selected");
    daysInput.value = button.dataset.days;
  });
});

function setFieldError(id, message) {
  document.getElementById(id + "Error").textContent = message;
}

profileForm.querySelectorAll('input[type="number"]').forEach((input) => {
  input.addEventListener("input", () => setFieldError(input.id, ""));
});

profileForm.addEventListener("change", (event) => {
  if (event.target.name === "goal") setFieldError("goal", "");
});

profileForm.addEventListener("submit", (event) => {
  event.preventDefault();
  profileMessage.textContent = "";

  const age = Number(document.getElementById("age").value);
  const height = Number(document.getElementById("height").value);
  const weight = Number(document.getElementById("weight").value);
  const goal = profileForm.querySelector('input[name="goal"]:checked');
  const level = profileForm.querySelector('input[name="level"]:checked');
  let valid = true;

  const checks = [
    ["age", age >= 13 && age <= 100, "سن باید بین ۱۳ تا ۱۰۰ سال باشه."],
    ["height", height >= 100 && height <= 230, "قد باید بین ۱۰۰ تا ۲۳۰ سانتی‌متر باشه."],
    ["weight", weight >= 30 && weight <= 300, "وزن باید بین ۳۰ تا ۳۰۰ کیلوگرم باشه."]
  ];
  checks.forEach(([id, ok, error]) => {
    setFieldError(id, ok ? "" : error);
    if (!ok) valid = false;
  });

  setFieldError("goal", goal ? "" : "لطفاً هدفت رو انتخاب کن.");
  if (!goal) valid = false;
  if (!valid) return;

  const profileData = {
    age,
    height_cm: height,
    weight_kg: weight,
    gender: profileForm.querySelector('input[name="gender"]:checked')?.value || null,
    goal: goal.value,
    training_level: level.value,
    training_days: Number(daysInput.value),
    training_place: profileForm.querySelector('input[name="training_place"]:checked')?.value || "gym",
    training_place: profileForm.querySelector('input[name="training_place"]:checked')?.value || "gym"
  };

  // فقط برای پیش‌نمایش فرانت‌اند؛ ذخیره دائمی و ارسال به Django بعداً اضافه می‌شود.
  localStorage.setItem("hamfit_profile_preview", JSON.stringify(profileData));
  console.info("Profile preview saved:", profileData);
  profileMessage.textContent = "پروفایلت ذخیره شد؛ در حال ورود به داشبورد…";
  window.location.href = "dashboard.html";
});
