/**
 * Define all global variables here
 */
/**
 * student_array - global array to hold student objects
 * @type {Array}
 */
var student_array = [];

/**
 * inputIds - id's of the elements that are used to add students
 * @type {string[]}
 */
// var inputIds =


/**
 * addClicked - Event Handler when user clicks the add button
 */
$(document).ready(function(){
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
        deleteStudentListItem();
    })
});

/**
 * addStudent - creates a student objects based on input fields in the form and adds the object to global student array
 *
 * @return undefined
 */
function addStudent() {
    var studentName = $("#studentName")["0"].value;
    var studentCourse = $("#course")["0"].value;
    var studentGrade = $("#studentGrade")["0"].value;
    var studentData = {
        name: studentName,
        course: studentCourse,
        grade: studentGrade
    };
    if (studentName === '' || studentCourse === '' || studentGrade === '' || !  isNaN(studentGrade)){
        return;
    } else {
        student_array.push(studentData);
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
    console.log("Student Grade Average: ", studentAverage);
    return studentAverage;
}

/**
 * updateData - centralized function to update the average and call student list update - ** Confused... **
 */
function updateData() {

}

/**
 * updateStudentList - loops through global student array and appends each objects data into the student-list-container > list-body - ** Confused... **
 */
function updateStudentList(studentData) {

}

/**
 * addStudentToDom - take in a student object, create html elements from the values and then append the elements
 * into the .student_list tbody
 * @param studentObj
 */
function addStudentToDom(studentData) {
    var studentListItem = $("<tr>");
    var nameDomElement = $("<td>").text(studentData.name);
    var courseDomElement = $("<td>").text(studentData.course);
    var gradeDomElement = $("<td>").text(studentData.grade);
    var deletecellDomElement = $("<td>");
    var delButton = $("<button>", {
        type: "button",
        class: "btn btn-danger",
        onclick: "",
        text: "Delete"
    });
    deletecellDomElement.append(delButton);
    studentListItem.append(nameDomElement).append(courseDomElement).append(gradeDomElement)
        .append(deletecellDomElement);
    $("tbody").append(studentListItem);
}

/**
 * reset - resets the application to initial state. Global variables reset, DOM get reset to initial load state
 */
function reset() {
    $("tbody tr").remove();
}

function deleteStudentListItem() {
    $(this).parent().parent().remove();
}


/**
 * Listen for the document to load and reset the data to the initial state - ** Researching **
 */