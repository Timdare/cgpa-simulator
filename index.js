/* GET DOM ELEMENTS */
const courseTableBodyEl = document.querySelector(".courses-table tbody");
const addCourseBtnEl = document.querySelector(".add-course-btn");
const deleteCourseBtnEl = document.querySelectorAll(".delete-course-btn");
const courseUnitEls = document.getElementsByClassName("unit");
const gradeEls = document.getElementsByClassName("grade");
const calcGPAbtns = Array.from(document.getElementsByClassName("calc-GPA-btn"));
const semesterGPAEl = document.querySelector(".semester-gpa-value");
const GPAResultErrorEl = document.querySelector(".GPA-result-error");
const currentCGPAEl = document.getElementById("current-CGPA");
/* END GET DOM ELEMENTS */

let sumCreditPoint = 0; //CREDIT POINT IS THE MULTIPLICATION OF GRADE AND UNIT OF EACH COURSE
let unitSum = 0;

checkIfTableEmpty();

calcGPAbtns.forEach((calcGPAbtn) => {
  calcGPAbtn.addEventListener("click", () => {
    sumCreditPoint = 0;
    unitSum = 0;
    for (let i = 0; i < courseUnitEls.length; i++) {
      sumCreditPoint += courseUnitEls[i].value * gradeEls[i].value;
      unitSum += Number(courseUnitEls[i].value);
    }
    if (unitSum <= 0) {
      GPAResultErrorEl.style.display = "block";
      return;
    } else {
      GPAResultErrorEl.style.display = "none";
      let gpa = (sumCreditPoint / unitSum).toFixed(2);
      semesterGPAEl.innerText = gpa;
      currentCGPAEl.innerText = gpa;
    }
  });
});

addCourseBtnEl.addEventListener("click", () => {
  const emptyMessageEl = document.querySelector(".empty-message");
  if (emptyMessageEl) emptyMessageEl.closest("tr").remove();
  const nearestCalcBtn = courseTableBodyEl
    .closest(".semester-card")
    .querySelector(".calc-GPA-btn");
  nearestCalcBtn.disabled = false;
  courseTableBodyEl.insertAdjacentHTML(
    "beforeend",
    `<tr>
                                    <td><input type="text" placeholder="E.g CSC 303" class="course-code" name="course-code"></td>
                                    <td><input type="number" min="0" id="unit" class="unit" value="0" placeholder=">=0"></td>
                                    <td>
                                        <select class="grade">
                                            <option value="5" selected>A (5.0)</option>
                                            <option value="4">B (4.0)</option>
                                            <option value="3">C (3.0)</option>
                                            <option value="2">D (2.0)</option>
                                            <option value="1">E (1.0)</option>
                                            <option value="0">F (0.0)</option>
                                        </select>
                                    </td>
                                    <td>
                                        <span class="fa-solid fa-xmark delete-course-btn" title="Delete course"></span>
                                    </td>
                                </tr>`,
  );
});

courseTableBodyEl.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete-course-btn")) {
    e.target.closest("tr").remove();
  }
  checkIfTableEmpty();
});

function checkIfTableEmpty() {
  let nearestCalcBtn = courseTableBodyEl
    .closest(".semester-card")
    .querySelector(".calc-GPA-btn");
  if (courseTableBodyEl.rows.length === 0) {
    const row = courseTableBodyEl.insertRow();
    const cell = row.insertCell();
    cell.colSpan = 3;
    cell.textContent =
      "No courses added yet. Click add course to add a course.";
    cell.classList.add("empty-message");
    nearestCalcBtn.disabled = true;
  }
}
