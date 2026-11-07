// WDD 131 Character Card: a JavaScript object with properties and methods.
const STORAGE_KEY = 'wdd131-mossback-character';

function getSavedCharacter() {
  try {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY)) || {};
  } catch {
    return {};
  }
}

const saved = getSavedCharacter();

const character = {
  name: 'Mossback Guardian',
  class: 'Forest Defender',
  level: Number.isInteger(saved.level) && saved.level > 0 ? saved.level : 1,
  health: Number.isInteger(saved.health) && saved.health >= 0 && saved.health <= 100
    ? saved.health : 100,
  image: 'images/mossback-guardian.svg',

  // The attacked() method takes away 20 health, stopping at zero.
  attacked() {
    this.health = Math.max(0, this.health - 20);
    return this.health === 0;
  },

  // The levelUp() method adds one to the character's level.
  levelUp() {
    if (this.health > 0) {
      this.level += 1;
    }
  }
};

// Show the object's current values whenever the page loads.
function displayCharacter() {
  document.querySelector('#character-name').textContent = character.name;
  document.querySelector('#character-class').textContent = character.class;
  document.querySelector('#character-level').textContent = character.level;
  document.querySelector('#character-image').src = character.image;
  document.querySelector('#health-text').textContent = `${character.health} / 100`;
  document.querySelector('#character-health').value = character.health;

  const isDead = character.health === 0;
  document.querySelector('#attack-button').disabled = isDead;
  document.querySelector('#level-button').disabled = isDead;
  document.querySelector('#status').textContent = isDead
    ? `${character.name} has died. Reset to try again.`
    : (saved.message || 'Ready for adventure.');
}

// Remember the changes and reload so the updated character appears.
function saveAndReload(message) {
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify({
      level: character.level,
      health: character.health,
      message
    }));
  } catch {
    // Storage may be blocked. The buttons will still update the page.
    document.querySelector('#status').textContent = message;
    document.querySelector('#character-level').textContent = character.level;
    document.querySelector('#health-text').textContent = `${character.health} / 100`;
    document.querySelector('#character-health').value = character.health;
    const isDead = character.health === 0;
    document.querySelector('#attack-button').disabled = isDead;
    document.querySelector('#level-button').disabled = isDead;
    return;
  }
  window.location.reload();
}

// The object methods are called by button click event listeners.
document.querySelector('#attack-button').addEventListener('click', () => {
  const died = character.attacked();
  const message = died
    ? `${character.name} has died. Reset to try again.`
    : `${character.name} was attacked and lost 20 health!`;
  saveAndReload(message);
});

document.querySelector('#level-button').addEventListener('click', () => {
  character.levelUp();
  saveAndReload(`${character.name} reached level ${character.level}!`);
});

document.querySelector('#reset-button').addEventListener('click', () => {
  try {
    sessionStorage.removeItem(STORAGE_KEY);
  } catch {
    character.health = 100;
    character.level = 1;
    saved.message = 'Ready for adventure.';
    displayCharacter();
    return;
  }
  window.location.reload();
});

displayCharacter();
