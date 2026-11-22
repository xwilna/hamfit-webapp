// Demo-only route guard. Replace with Django session/token checks when API is ready.
(function () {
  const protectedPages = ["profile.html", "dashboard.html", "workout.html"];
  const currentPage = location.pathname.split("/").pop() || "index.html";
  if (protectedPages.includes(currentPage) && localStorage.getItem("hamfit_demo_logged_in") !== "true") {
    location.replace("login.html");
    return;
  }
  document.querySelectorAll("[data-hamfit-logout]").forEach((button) => {
    button.addEventListener("click", () => {
      localStorage.removeItem("hamfit_demo_logged_in");
      localStorage.removeItem("hamfit_demo_user");
      location.href = "index.html";
    });
  });
})();
