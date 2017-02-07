/**
 * Define all global variables here
 */
/**
 * student_array - global array to hold student objects
 * @type {Array}
 */
// var student_array = [];
var student_array = [{name: "Andy", course: "Coding", grade: 20, ID: 0}, {name: "Tara", course: "Baking", grade: 100, ID:1},
    {name: "Tyler", course: "Paradise Bowls", grade: 100, ID:2},{name: "David", course: "Gaming", grade: 100, ID:3},
    {name: "Jasmine", course: "Make-Up", grade: 100, ID:4}];

/**
 * inputIds - id's of the elements that are used to add students
 * @type {string[]}
 */

/**
 * addClicked - Event Handler when user clicks the add button
 */
$(document).ready(function(){
    // reset();
    updateStudentList();
    $("div.container").on('click', '.btn-success', function() {
        console.log("Add button works");
        addStudent();
    });

/**
 * cancelClicked - Event Handler when user clicks the cancel button, should clear out student form
 */
    $("div.container").on('click', '.btn-default', function() {
        console.log("Cancel button works");
        clearAddStudentForm();
    });

    $("div.container").on('click', '.btn-danger', function() {
        console.log("Delete button works");
        var currentStudent = $(this);
        removeStudent(currentStudent);
        updateData();
    });
});

/**
 * addStudent - creates a student objects based on input fields in the form and adds the object to global student array
 *
 * @return undefined
 */
function addStudent() {
    var studentName = $("#studentName").val();
    var studentCourse = $("#course").val();
    var studentGrade = $("#studentGrade").val();
    var studentData = {
        name: studentName,
        course: studentCourse,
        grade: studentGrade
    };
    if (studentName === '' || studentCourse === '' || studentGrade === '') {
        return;
    } else if (isNaN(studentGrade)) {
        return;
    } else {
        student_array.push(studentData);
        studentData.ID = student_array.length-1;
    }
    clearAddStudentForm();
    addStudentToDom(studentData);
    calculateAverage(student_array);
    console.log(studentData);
    return studentData;
}

/**
 * clearAddStudentForm - clears out the form values based on inputIds variable
 */
function clearAddStudentForm() {
    $("#studentName")["0"].value = '';
    $("#course")["0"].value = '';
    $("#studentGrade")['0'].value = '';
}

/**
 * calculateAverage - loop through the global student array and calculate average grade and return that value
 * @returns {number}
 */
function calculateAverage() {
    var sum = 0;
    for(var i = 0; i < student_array.length; i++){
        var gradeValue = parseInt(student_array[i].grade);
        sum += gradeValue;
    }
    var studentAverage = sum / student_array.length;
    if (isNaN(studentAverage)){
        console.log("Student Grade Average: No Student Data Available");
    } else {
        console.log("Student Grade Average: ", studentAverage);
    }
    return studentAverage;
}

/**
 * updateData - centralized function to update the average and call student list update - ** Confused... **
 */
function updateData() {
    updateStudentList();
    calculateAverage();
}

/**
 * updateStudentList - loops through global student array and appends each objects data into the student-list-container > list-body - ** Confused... **
 */
function updateStudentList() {
    console.log("Update student list for loop works");
    $("tbody tr").remove();
    for (var i = 0; i < student_array.length; i++){
        addStudentToDom(student_array[i]);
    }
}

/**
 * addStudentToDom - take in a student object, create html elements from the values and then append the elements
 * into the .student_list tbody
 * @param studentObj
 */
function addStudentToDom(studentObj) {
    var studentListItem = $("<tr>");
    var nameDomElement = $("<td>").text(studentObj.name);
    var courseDomElement = $("<td>").text(studentObj.course);
    var gradeDomElement = $("<td>").text(studentObj.grade);
    var deletecellDomElement = $("<td>");
    var delButton = $("<button>", {
        type: "button",
        class: "btn btn-danger",
        onclick: "",
        text: "Delete",
        ID: studentObj.ID
    });
    deletecellDomElement.append(delButton);
    studentListItem.append(nameDomElement, courseDomElement, gradeDomElement, deletecellDomElement);
    $("tbody").append(studentListItem);
}


/**
 * reset - resets the application to initial state. Global variables reset, DOM get reset to initial load state
 */
function reset() {
    $("tbody tr").remove();
    // student_array = [];
    student_array = [{name: "Andy", course: "Coding", grade: 20, ID: 0}, {name: "Tara", course: "Baking", grade: 100, ID:1},
        {name: "Tyler", course: "Paradise Bowls", grade: 100, ID:2},{name: "David", course: "Gaming", grade: 100, ID:3},
        {name: "Jasmine", course: "Make-Up", grade: 100, ID:4}];
    updateStudentList();
}

function removeStudent(currentStudent) {
    var studentIndex = parseInt(currentStudent.attr("ID"));
    student_array.splice(studentIndex, 1);
    for (var i = 0; i < student_array.length; i++){
        student_array[i]["ID"] = i;
    }
}

/**
 * Listen for the document to load and reset the data to the initial state
 */