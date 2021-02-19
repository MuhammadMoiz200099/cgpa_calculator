window.onload = function() {
    setTimeout(() => {
        document.getElementById('loader').style.display = 'none';
        document.getElementById('preview').style.display = 'block';
    }, 3100);
    generateColumns();
}

finalGPAResult = null;

// gpa table

const gpaTable = document.getElementById('gpa-table');
const gradePoints = {
    'A': 4,
    'A-': 3.7,
    'B+': 3.3,
    'B': 3.0,
    'B-': 2.7,
    'C+': 2.3,
    'C': 2.0,
    'C-': 1.7,
    'D+': 1.3,
    'D': 1.0,
    'F': 0,
}

let gpaTableRow = []

function generateColumns() {
    for (var i = 0; i < 5; i++) {
        gpaTableRow.push(
            `
                <tr>
                    <td>
                        <div class="input-group mb-3">
                            <input type="number" max="3" min="0" class="form-control" id="input-${i}" placeholder="credit hours">
                        </div>
                    </td>
                    <td>
                        <select class="form-select" id="select-${i}">
                            <option selected value="A">A</option>
                            <option value="A-">A-</option>
                            <option value="B+">B+</option>
                            <option value="B">B</option>
                            <option value="B-">B-</option>
                            <option value="C+">C+</option>
                            <option value="C">C</option>
                            <option value="C-">C-</option>
                            <option value="D+">D+</option>
                            <option value="D">D</option>
                            <option value="F">F</option>
                        </select>
                    </td>
                </tr>
            `
        )
    }
    setFinalResult();
    generateGPAList();
}

function generateGPAList() {
    document.getElementById('gpa-table').innerHTML = '';
    let gpaStr = "";
    gpaTableRow.forEach((gpa) => {
        gpaStr += gpa;
    });
    document.getElementById('gpa-table').innerHTML = gpaStr;
}

function removeColumn() {
    gpaTableRow.pop();
    generateGPAList();
}

function addColumn() {
    gpaTableRow.push(
        `
            <tr>
                <td>
                    <div class="input-group mb-3">
                        <input type="number" max="3" min="0" class="form-control" id="input-${gpaTableRow.length}" placeholder="credit hours">
                    </div>
                </td>
                <td>
                    <select class="form-select" id="select-${gpaTableRow.length}">
                        <option selected value="A">A</option>
                        <option value="A-">A-</option>
                        <option value="B+">B+</option>
                        <option value="B">B</option>
                        <option value="B-">B-</option>
                        <option value="C+">C+</option>
                        <option value="C">C</option>
                        <option value="C-">C-</option>
                        <option value="D+">D+</option>
                        <option value="D">D</option>
                        <option value="F">F</option>
                    </select>
                </td>
            </tr>
        `
    )
    generateGPAList();
}

function generateResult() {
    if (!document.getElementById(`input-0`).value) {
        alert('Please complete the form');
        return;
    }
    inputs = [];
    selects = [];
    let falseConditions = false;
    gpaTableRow.forEach((_, i) => {
        const select = document.getElementById(`select-${i}`).value;
        const inputValue = document.getElementById(`input-${i}`).value;
        if (inputValue <= 0 || inputValue > 3) {
            alert('Credit hours cannot be less than 1 or greater than 3 ');
            falseConditions = true;
            return;
        }
        const selectValue = gradePoints[select];
        inputs.push(inputValue);
        selects.push(selectValue);
    });
    if (falseConditions) {
        alert('Please fill the forms with right values');
        generateGPAList();
        return;
    }
    let gradePointsCount = 0;
    selects.forEach((value, i) => {
        gradePointsCount += (value * inputs[i])
    });
    const totalGradePoints = inputs.reduce((a, b) => Number(a) + Number(b))
    const gpa = gradePointsCount / totalGradePoints;
    finalGPAResult = Math.ceil(gpa * 100) / 100;
    setFinalResult();
}

function reset() {
    generateGPAList();
    finalGPAResult = null;
    setFinalResult();
}

function setFinalResult() {
    document.getElementById('final-result').innerHTML = finalGPAResult;
}