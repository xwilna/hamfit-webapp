const loginForm = document.getElementById("loginForm");
const identityInput = document.getElementById("loginIdentity");
const passwordInput = document.getElementById("loginPassword");
const loginMessage = document.getElementById("loginMessage");

document.querySelector(".password-toggle").addEventListener("click", () => {
  const visible = passwordInput.type === "password";
  passwordInput.type = visible ? "text" : "password";
  document.querySelector(".password-toggle").setAttribute("aria-label", visible ? "مخفی کردن رمز عبور" : "نمایش رمز عبور");
});

document.getElementById("forgotPassword").addEventListener("click", (event) => {
  event.preventDefault();
  loginMessage.textContent = "بازیابی رمز عبور بعد از اتصال بک‌اند Django فعال می‌شه.";
});

function enter(user) {
  localStorage.setItem("hamfit_demo_user", JSON.stringify({ full_name: user.full_name, email: user.email, phone: user.phone || "" }));
  localStorage.setItem("hamfit_demo_logged_in", "true");
  window.location.href = localStorage.getItem("hamfit_profile_preview") ? "dashboard.html" : "profile.html";
}

loginForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const identity = identityInput.value.trim().toLowerCase();
  const normalizedIdentity = identity.replace(/[\s()-]/g, "").replace(/[۰-۹٠-٩]/g, digit => String("۰۱۲۳۴۵۶۷۸۹".indexOf(digit) >= 0 ? "۰۱۲۳۴۵۶۷۸۹".indexOf(digit) : "٠١٢٣٤٥٦٧٨٩".indexOf(digit)));
  const password = passwordInput.value;
  const account = JSON.parse(localStorage.getItem("hamfit_demo_account") || "null");
  document.getElementById("loginEmailError").textContent = "";
  document.getElementById("loginPasswordError").textContent = "";
  loginMessage.textContent = "";
  if (!identity || (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(identity) && !/^\+?[0-9۰-۹٠-٩]{8,16}$/.test(normalizedIdentity))) {
    document.getElementById("loginEmailError").textContent = "ایمیل یا شماره تلفن معتبر وارد کن.";
    return;
  }
  if (!password) {
    document.getElementById("loginPasswordError").textContent = "رمز عبورت رو وارد کن.";
    return;
  }
  if (!account || (account.email !== identity && (account.phone || "").toLowerCase() !== normalizedIdentity) || account.password !== password) {
    loginMessage.textContent = "حسابی با این مشخصات پیدا نشد؛ ایمیل یا شماره و رمز عبورت رو بررسی کن یا اول ثبت‌نام کن.";
    return;
  }
  enter(account);
});

