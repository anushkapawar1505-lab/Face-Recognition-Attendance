// Get students from storage
function getStudents(){
let data = localStorage.getItem("students");
return data ? JSON.parse(data) : [];
}

// Save students
function saveStudents(students){
localStorage.setItem("students",JSON.stringify(students));
}

// Add Student
function addStudent(){

let name = document.getElementById("name").value;
let className = document.getElementById("class").value;

if(name === "" || className === ""){
alert("Enter all details");
return;
}

let students = getStudents();

let newStudent = {
id: students.length + 1,
name: name,
className: className
};

students.push(newStudent);

saveStudents(students);

alert("Student Added Successfully");

document.getElementById("name").value="";
document.getElementById("class").value="";

loadStudents();
}

// Load students in table
function loadStudents(){

let students = getStudents();
let list = document.getElementById("studentList");

if(!list) return;

list.innerHTML="";

if(students.length === 0){
list.innerHTML="<tr><td colspan='4'>No Students Found</td></tr>";
return;
}

students.forEach((s,index)=>{

list.innerHTML += `
<tr>
<td>${s.id}</td>
<td>${s.name}</td>
<td>${s.className}</td>
<td>
<button onclick="deleteStudent(${index})">Delete</button>
</td>
</tr>
`;

});
}

// Delete student
function deleteStudent(index){

let students = getStudents();

students.splice(index,1);

saveStudents(students);

loadStudents();
}

// Mark Attendance
function markAttendance(){

let students = getStudents();

let attendance = JSON.parse(localStorage.getItem("attendance")) || [];

let today = new Date().toLocaleDateString();

students.forEach(s=>{

attendance.push({
name:s.name,
date:today,
status:"Present"
});

});

localStorage.setItem("attendance",JSON.stringify(attendance));

alert("Attendance Marked");

loadAttendance();
}

// Load Attendance
function loadAttendance(){

let data = JSON.parse(localStorage.getItem("attendance")) || [];

let table = document.getElementById("attendanceTable");

if(!table) return;

table.innerHTML="";

data.forEach(a=>{

table.innerHTML += `
<tr>
<td>${a.name}</td>
<td>${a.date}</td>
<td>${a.status}</td>
</tr>
`;

});
}

// Page load
window.onload = function(){

loadStudents();
loadAttendance();

};