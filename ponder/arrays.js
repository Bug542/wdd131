
 // WDD 131: Array Methods Practice

// Convert a letter grade into grade points.
function convert(grade) {
  let points;
  switch (grade) {
    case 'A':
      points = 4;
      break;
    case 'B':
      points = 3;
      break;
    case 'C':
      points = 2;
      break;
    case 'D':
      points = 1;
      break;
    case 'F':
      points = 0;
      break;
    default:
      throw new Error('Not a valid grade');
  }
  return points;
}

// map() creates a new array. reduce() adds all the numbers.
const grades = ['A', 'B', 'C', 'A', 'F'];
const gradePoints = grades.map(convert);
const totalPoints = gradePoints.reduce((total, points) => total + points, 0);
const averagePoints = (totalPoints / gradePoints.length).toFixed(2);

document.querySelector('#grades').innerHTML = `
  <h2>Grades</h2>
  <p>Letter grades: ${grades.join(', ')}</p>
  <p>Grade points: ${gradePoints.join(', ')}</p>
  <p>Average grade points: ${averagePoints}</p>
`;

// filter() selects words, map() transforms words, and indexOf() finds one.
const words = ['watermelon', 'peach', 'apple', 'tomato', 'grape'];
const longWords = words.filter((word) => word.length > 5);
const upperCaseWords = words.map((word) => word.toUpperCase());
const appleIndex = words.indexOf('apple');

document.querySelector('#words').innerHTML = `
  <h2>Words</h2>
  <p>Original words: ${words.join(', ')}</p>
  <p>More than five letters: ${longWords.join(', ')}</p>
  <p>Uppercase words: ${upperCaseWords.join(', ')}</p>
  <p>Index of apple: ${appleIndex}</p>
`;

// forEach() goes through each student. Template literals create HTML.
const students = [
  { last: 'Andrus', first: 'Aaron' },
  { last: 'Masa', first: 'Manny' },
  { last: 'Tanda', first: 'Tamanda' }
];

let studentItems = '';
students.forEach((student) => {
  studentItems += `<li>${student.first} ${student.last}</li>`;
  console.log(`Student: ${student.first} ${student.last}`);
});

document.querySelector('#students').innerHTML = `
  <h2>Students</h2>
  <ul>${studentItems}</ul>
`;

console.log('Grade points:', gradePoints);
console.log('Total points:', totalPoints);
console.log('Words with more than five letters:', longWords);
console.log('Uppercase words:', upperCaseWords);
console.log('Index of apple:', appleIndex);
