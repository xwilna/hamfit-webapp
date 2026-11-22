const form = document.getElementById("registerForm");
const fields = {
  fullName: document.getElementById("fullName"),
  email: document.getElementById("email"),
  phone: document.getElementById("phone"),
  password: document.getElementById("password"),
  confirmPassword: document.getElementById("confirmPassword"),
  terms: document.getElementById("terms")
};
const errors = {
  fullName: document.getElementById("nameError"),
  email: document.getElementById("emailError"),
  phone: document.getElementById("phoneError"),
  password: document.getElementById("passwordError"),
  confirmPassword: document.getElementById("confirmError"),
  terms: document.getElementById("termsError")
};
const message = document.getElementById("formMessage");

document.querySelectorAll(".password-toggle").forEach((button) => {
  button.addEventListener("click", () => {
    const input = button.parentElement.querySelector("input");
    const show = input.type === "password";
    input.type = show ? "text" : "password";
    button.setAttribute("aria-label", show ? "مخفی کردن رمز عبور" : "نمایش رمز عبور");
  });
});

function setError(key, text) {
  errors[key].textContent = text;
  const input = key === "terms" ? fields.terms : fields[key];
  if (input && input.closest(".input-wrap")) {
    input.closest(".input-wrap").classList.toggle("invalid", Boolean(text));
  }
}

function validate() {
  let valid = true;
  const name = fields.fullName.value.trim();
  const email = fields.email.value.trim();
  const phone = fields.phone.value.trim();
  const password = fields.password.value;
  const confirm = fields.confirmPassword.value;

  const checks = {
    fullName: name.length >= 3 ? "" : "نام و نام خانوادگی رو کامل وارد کن.",
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? "" : "یک ایمیل معتبر وارد کن.",
    phone: /^\+?[0-9۰-۹٠-٩\s()-]{8,18}$/.test(phone) ? "" : "شماره تلفن معتبر وارد کن.",
    password: password.length >= 8 ? "" : "رمز عبور باید حداقل ۸ کاراکتر باشه.",
    confirmPassword: confirm && confirm === password ? "" : "تکرار رمز عبور با رمز اصلی مطابقت نداره.",
    terms: fields.terms.checked ? "" : "برای ادامه، موافقت با قوانین لازمه."
  };

  Object.entries(checks).forEach(([key, error]) => {
    setError(key, error);
    if (error) valid = false;
  });
  return valid;
}

Object.entries(fields).forEach(([key, input]) => {
  if (key === "terms") {
    input.addEventListener("change", () => setError(key, ""));
    return;
  }
  input.addEventListener("input", () => {
    setError(key, "");
    if (key === "password" && fields.confirmPassword.value) setError("confirmPassword", "");
  });
});

form.addEventListener("submit", (event) => {
  event.preventDefault();
  message.textContent = "";
  if (!validate()) return;

  // نسخه آزمایشی فرانت‌اند: حساب فقط در مرورگر همین دستگاه ذخیره می‌شود.
  const account = {
    full_name: fields.fullName.value.trim(),
    email: fields.email.value.trim().toLowerCase(),
    phone: fields.phone.value.trim().replace(/[\s()-]/g, ""),
    password: fields.password.value
  };
  localStorage.setItem("hamfit_demo_account", JSON.stringify(account));
  localStorage.setItem("hamfit_demo_user", JSON.stringify({
    full_name: account.full_name,
    email: account.email,
    phone: account.phone
  }));
  localStorage.setItem("hamfit_demo_logged_in", "true");
  message.textContent = "حساب آزمایشی ساخته شد؛ در حال رفتن به تکمیل پروفایل…";
  window.location.href = "profile.html";
});
