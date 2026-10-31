const form = document.querySelector('#ticket-form');
const ticketType = document.querySelector('#ticket-type');
const extraField = document.querySelector('#extra-field');
const codeLabel = document.querySelector('#code-label');
const codeInput = document.querySelector('#ticket-code');
const dateInput = document.querySelector('#event-date');
const errors = document.querySelector('#errors');
const ticketResult = document.querySelector('#ticket-result');

// Get a date string in local time (YYYY-MM-DD).
function dateString(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function setMinimumDate() {
  const tomorrow = new Date();
  tomorrow.setHours(0, 0, 0, 0);
  tomorrow.setDate(tomorrow.getDate() + 1);
  dateInput.min = dateString(tomorrow);
}

setMinimumDate();

// Change the extra field when Student or Guest is selected.
ticketType.addEventListener('change', () => {
  const type = ticketType.value;
  extraField.hidden = type === '';
  codeInput.value = '';
  codeInput.required = type !== '';

  if (type === 'student') {
    codeLabel.textContent = 'Student I#';
    codeInput.inputMode = 'numeric';
    codeInput.pattern = '[0-9]{9}';
    codeInput.minLength = 9;
    codeInput.maxLength = 9;
  } else if (type === 'guest') {
    codeLabel.textContent = 'Access Code';
    codeInput.inputMode = 'text';
    codeInput.pattern = 'EVENT131';
    codeInput.minLength = 8;
    codeInput.maxLength = 8;
  } else {
    codeInput.removeAttribute('pattern');
    codeInput.removeAttribute('minlength');
    codeInput.removeAttribute('maxlength');
  }
});

form.addEventListener('submit', (event) => {
  event.preventDefault();
  setMinimumDate();
  errors.replaceChildren();
  ticketResult.hidden = true;

  const firstName = document.querySelector('#first-name').value.trim();
  const lastName = document.querySelector('#last-name').value.trim();
  const email = document.querySelector('#email');
  const type = ticketType.value;
  const date = dateInput.value;
  const code = codeInput.value.trim();
  const problems = [];

  if (!firstName) problems.push('Please enter your first name.');
  if (!lastName) problems.push('Please enter your last name.');
  if (!email.value.trim() || !email.validity.valid) {
    problems.push('Please enter a valid email address.');
  }
  if (!type) problems.push('Please choose Student or Guest.');
  if (!date || date < dateInput.min) {
    problems.push('Please choose an event date after today.');
  }
  if (type === 'student' && !/^\d{9}$/.test(code)) {
    problems.push('Student I# must be 9 digits.');
  }
  if (type === 'guest' && code !== 'EVENT131') {
    problems.push('Access Code must be EVENT131.');
  }

  if (problems.length > 0) {
    problems.forEach((problem) => {
      const message = document.createElement('p');
      message.textContent = problem;
      errors.appendChild(message);
    });
    return;
  }

  document.querySelector('#ticket-name').textContent = `${firstName} ${lastName}`;
  document.querySelector('#ticket-kind').textContent = type;
  document.querySelector('#ticket-date').textContent = date;
  ticketResult.hidden = false;

  form.reset();
  extraField.hidden = true;
  codeInput.required = false;
});
