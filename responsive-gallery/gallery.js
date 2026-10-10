const gallery = document.querySelector('.gallery');
const viewer = document.querySelector('.viewer');
const viewerImage = viewer.querySelector('img');
const closeButton = viewer.querySelector('.close-viewer');

function openImage(image) {
  viewerImage.src = image.dataset.full;
  viewerImage.alt = image.alt;
  viewer.showModal();
}

gallery.addEventListener('click', (event) => {
  if (event.target.matches('img')) openImage(event.target);
});

gallery.addEventListener('keydown', (event) => {
  if ((event.key === 'Enter' || event.key === ' ') && event.target.matches('img')) {
    event.preventDefault();
    openImage(event.target);
  }
});

closeButton.addEventListener('click', () => viewer.close());
viewer.addEventListener('click', (event) => {
  if (event.target === viewer) viewer.close();
});
viewer.addEventListener('close', () => {
  viewerImage.removeAttribute('src');
});
