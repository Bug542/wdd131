// Constants and Variables
const PI = 3.14;
let radius = 3;

console.log(PI);
console.log(radius);

radius = 4;
console.log(radius);


// Type Coercion
const one = 1;
const two = '2';

console.log(one + two);
console.log(one + Number(two));


// Global and Block Scope
let course = "CSE131";

if (true) {
    let student = "John";

    console.log(course);
    console.log(student);
}

console.log(course);
console.log(student);