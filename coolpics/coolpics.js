
const menuButton = document.querySelector(".menu");
const nav = document.querySelector("nav");

menuButton.addEventListener("click", () => {
  nav.classList.toggle("show");
});

const gallery = document.querySelector(".gallery");

gallery.addEventListener("click", (event) => {
  const image = event.target.closest("img");

  if (!image) return;

  const modal = document.createElement("dialog");
  modal.classList.add("image-modal");

  const largeImage = document.createElement("img");
  largeImage.src = image.src.replace("-sm", "-full");
  largeImage.alt = image.alt;

  const closeButton = document.createElement("button");
  closeButton.textContent = "X";
  closeButton.classList.add("close-modal");
  closeButton.setAttribute("aria-label", "Close image");

  modal.append(closeButton, largeImage);
  document.body.appendChild(modal);

  modal.showModal();

  closeButton.addEventListener("click", () => {
    modal.close();
  });

  modal.addEventListener("click", (event) => {
    if (event.target === modal) {
      modal.close();
    }
  });

  modal.addEventListener("close", () => {
    modal.remove();
  });
});

