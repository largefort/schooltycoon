let funds = 1000;
let teachers = 0;
let students = 0;
let classrooms = 0;
let studentGenerationRate = 1;
let teacherCost = 500;
let classroomCost = 1000;

const fundsElement = document.getElementById('funds');
const teachersElement = document.getElementById('teachers');
const studentsElement = document.getElementById('students');
const classroomsElement = document.getElementById('classrooms');
const hireTeacherButton = document.getElementById('hire-teacher');
const buildClassroomButton = document.getElementById('build-classroom');
const classroomContainer = document.getElementById('classroom-container');
const mathCanvas = document.getElementById('math-canvas');
const ctx = mathCanvas.getContext('2d');

// Load game state from local storage
function loadGame() {
    const savedFunds = localStorage.getItem('funds');
    const savedTeachers = localStorage.getItem('teachers');
    const savedStudents = localStorage.getItem('students');
    const savedClassrooms = localStorage.getItem('classrooms');
    const savedStudentGenerationRate = localStorage.getItem('studentGenerationRate');
    
    if (savedFunds !== null) funds = parseInt(savedFunds);
    if (savedTeachers !== null) teachers = parseInt(savedTeachers);
    if (savedStudents !== null) students = parseInt(savedStudents);
    if (savedClassrooms !== null) classrooms = parseInt(savedClassrooms);
    if (savedStudentGenerationRate !== null) studentGenerationRate = parseInt(savedStudentGenerationRate);
    
    updateStats();
    renderClassrooms();
}

// Save game state to local storage
function saveGame() {
    localStorage.setItem('funds', funds);
    localStorage.setItem('teachers', teachers);
    localStorage.setItem('students', students);
    localStorage.setItem('classrooms', classrooms);
    localStorage.setItem('studentGenerationRate', studentGenerationRate);
}

// Format numbers to scientific notation if they are large
function formatNumber(num) {
    if (num < 1000) return num;
    return num.toExponential(2);
}

function updateStats() {
    fundsElement.textContent = formatNumber(funds);
    teachersElement.textContent = teachers;
    studentsElement.textContent = formatNumber(students);
    classroomsElement.textContent = classrooms;
}

function hireTeacher() {
    if (funds >= teacherCost) {
        funds -= teacherCost;
        teachers++;
        studentGenerationRate++;
        updateStats();
        saveGame();
    }
}

hireTeacherButton.addEventListener('click', hireTeacher);

function buildClassroom() {
    if (funds >= classroomCost) {
        funds -= classroomCost;
        classrooms++;
        updateStats();
        renderClassrooms();
        saveGame();
    }
}

buildClassroomButton.addEventListener('click', buildClassroom);

function renderClassrooms() {
    classroomContainer.innerHTML = '';
    for (let i = 0; i < classrooms; i++) {
        const classroom = document.createElement('div');
        classroom.className = 'classroom';
        classroom.textContent = `Room ${i + 1}`;
        classroomContainer.appendChild(classroom);
    }
}

function generateStudents() {
    students += studentGenerationRate;
    funds += students * 10; // Students contribute to funds
    updateStats();
    saveGame();
}

setInterval(generateStudents, 1000); // Generate students every second

function drawMathAnimation() {
    ctx.clearRect(0, 0, mathCanvas.width, mathCanvas.height);
    ctx.font = "20px Arial";
    ctx.fillText(`Math: ${Math.random().toFixed(2)} + ${Math.random().toFixed(2)} =`, 10, 50);
}

setInterval(drawMathAnimation, 2000); // Update math animation every 2 seconds

// Load the game when the page loads
window.onload = loadGame;

// Initial stats update
updateStats();
