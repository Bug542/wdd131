
const menuButton = document.querySelector(".menu-btn");
const nav = document.querySelector("nav");

menuButton.addEventListener("click", function () {
  nav.classList.toggle("show");
  menuButton.classList.toggle("change");

  menuButton.setAttribute(
    "aria-expanded",
    String(nav.classList.contains("show"))
  );
});
