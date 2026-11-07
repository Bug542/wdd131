// WDD 131 - Week 8: JavaScript Objects
const aCourse = {
  code: "CSE121b",
  name: "Javascript Language",
  logo: "images/js-logo.png",
  sections: [
    { sectionNum: 1, roomNum: "STC 353", enrolled: 26, days: "TTh", instructor: "Bro T" },
    { sectionNum: 2, roomNum: "STC 347", enrolled: 28, days: "TTh", instructor: "Sis A" }
  ],
  enrollStudent: function (sectionNum) {
    // "this" refers to the aCourse object.
    const sectionIndex = this.sections.findIndex(
      (section) => section.sectionNum === sectionNum
    );

    if (sectionIndex >= 0) {
      this.sections[sectionIndex].enrolled++;
      renderSections(this.sections);
      return true;
    }
    return false;
  }
};

// Turn each section object into a table row.
function sectionTemplate(section) {
  return `<tr>
    <td>${section.sectionNum}</td>
    <td>${section.roomNum}</td>
    <td>${section.enrolled}</td>
    <td>${section.days}</td>
    <td>${section.instructor}</td>
  </tr>`;
}

// Render all sections using map() and join().
function renderSections(sections) {
  const html = sections.map(sectionTemplate);
  document.querySelector("#sections").innerHTML = html.join("");
}

// Display course information and the initial table.
document.querySelector("#courseName").textContent = aCourse.name;
document.querySelector("#courseCode").textContent = aCourse.code;
renderSections(aCourse.sections);

// Enroll a student when the button is clicked.
document.querySelector("#enrollStudent").addEventListener("click", function () {
  const input = document.querySelector("#sectionNumber");
  const message = document.querySelector("#message");
  const sectionNum = Number(input.value);

  if (input.value.trim() === "" || !Number.isInteger(sectionNum)) {
    message.textContent = "Enter a valid section number.";
    return;
  }

  if (aCourse.enrollStudent(sectionNum)) {
    message.textContent = `Student enrolled in section ${sectionNum}!`;
  } else {
    message.textContent = "Section not found. Try section 1 or 2.";
  }
});
