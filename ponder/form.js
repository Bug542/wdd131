const form = document.querySelector("#fsyForm");
const travelRange = document.querySelector("#travelRange");
const notesContainer = document.querySelector("#notesContainer");
const notes = document.querySelector("#notes");
const output = document.querySelector("#output");
const campusBoxes = document.querySelectorAll('input[name="campus"]');

// Show the notes field only when the person selects multiple campuses.
function updateNotesField() {
  const showNotes = travelRange.value === "many";
  notesContainer.hidden = !showNotes;
  notes.required = showNotes;

  if (!showNotes) {
    notes.value = "";
  }
}

travelRange.addEventListener("change", updateNotesField);
updateNotesField();

// Compare dates at local midnight so the person must choose after today.
function isPastDate(value) {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const chosen = new Date(value + "T00:00:00");
  return chosen <= today;
}

function getSelectedCampuses() {
  return Array.from(campusBoxes)
    .filter(box => box.checked)
    .map(box => box.value);
}

function showError(message) {
  output.classList.add("error");
  output.textContent = message;
}

form.addEventListener("submit", function (event) {
  event.preventDefault();
  output.textContent = "";
  output.classList.remove("error");

  const firstName = document.querySelector("#firstName").value.trim();
  const lastName = document.querySelector("#lastName").value.trim();
  const email = document.querySelector("#email").value.trim();
  const type = travelRange.value;
  const availableDate = document.querySelector("#availableDate").value;
  const selectedCampuses = getSelectedCampuses();
  const note = notes.value.trim();

  if (!firstName || !lastName || !email) {
    showError("Please fill out your name and email.");
    return;
  }

  if (selectedCampuses.length === 0) {
    showError("Please select at least one campus.");
    return;
  }

  if (type === "one" && selectedCampuses.length !== 1) {
    showError("Please select exactly one campus.");
    return;
  }

  if (type === "many" && selectedCampuses.length < 2) {
    showError("Please select at least two campuses.");
    return;
  }

  if (type === "many" && !note) {
    showError("Please add a travel note.");
    return;
  }

  if (isPastDate(availableDate)) {
    showError("Please choose a later date.");
    return;
  }

  // Build the confirmation using textContent so user input is shown as text.
  const heading = document.createElement("h2");
  heading.textContent = "Preference Submitted";
  output.appendChild(heading);

  const details = [
    firstName + " " + lastName,
    "Email: " + email,
    "Availability: " + availableDate,
    "Campuses: " + selectedCampuses.join(", "),
    "Preference Level: " + type
  ];

  if (note) {
    details.push("Travel Notes: " + note);
  }

  details.forEach(detail => {
    const paragraph = document.createElement("p");
    paragraph.textContent = detail;
    output.appendChild(paragraph);
  });

  form.reset();
  updateNotesField();
});
