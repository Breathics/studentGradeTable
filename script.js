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

/**
 * addClicked - Event Handler when user clicks the add button
 */
$(document).ready(function() {
    updateData();
    retrieveData();
    $("div.container").on('click', '.btn-success', function() {
        console.log("Add button works via click");
        addStudent();
    });
    $(document).keypress(function(e) {
        if (e.which == 13) {
            console.log("Add button works via Enter");
            addStudent();
        }
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

    $("div.container").on('click', '.btn-info', function() {
        console.log("AJAX button works");
        retrieveData();
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
        addToStudentDB(studentData);
        student_array.push(studentData);
    }
    clearAddStudentForm();
    calculateAverage(student_array);
    console.log(studentData);
    return studentData;
}

/**
 * retrieveData - retrieves data from student database through an ajax call that takes in an API key
 */
function retrieveData() {
    $.ajax({
        dataType: 'json',
        method: 'post',
        url: 'http://s-apis.learningfuze.com/sgt/get',
        data: {
            'api_key': 'hfx7uq7nuo'
        },
        success: function(result) {
            student_array = student_array.concat(result.data);
            updateData();
        }
    });
}

/**
 * addToStudentDB
 */
function addToStudentDB(studentObj) {
    var form = new FormData();
    form.append("api_key", "hfX7uq7nuo");
    form.append("name", studentObj.name);
    form.append("course", studentObj.course);
    form.append("grade", studentObj.grade);
    $.ajax({
        // async: true,
        dataType: 'json',
        method: 'post',
        url: 'http://s-apis.learningfuze.com/sgt/create',
        processData: false,
        contentType: false,
        mimeType: 'multipart/form-data',
        data: form,
        success: function(response) {
            console.log("adding to db", response);
            studentObj.id = response.new_id;
            addStudentToDom(studentObj);
        }
    });
}

/**
 * delStudentFromDB
 */
function delStudentFromDB(studentIndex) {
    $.ajax({
        method: 'post',
        url: 'http://s-apis.learningfuze.com/sgt/delete',
        headers: {
            'content-type': 'application/x-www-form-urlencoded'
        },
        data: {
            'api_key': 'hfX7uq7nuo',
            'student_id': studentIndex
        },
        success: function(response) {
            console.log(response);
        }
    });
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
    for (var i = 0; i < student_array.length; i++) {
        var gradeValue = parseInt(student_array[i].grade);
        sum += gradeValue;
    }
    var studentAverage = sum / student_array.length;
    studentAverage = Math.round(studentAverage);
    if (isNaN(studentAverage)) {
        console.log("Student Grade Average: No Student Data Available");
        $('.avgGrade').html("0");
    } else {
        console.log("Student Grade Average: ", studentAverage);
        $('.avgGrade').html(studentAverage);
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
    $("tbody tr").remove();
    for (var i = 0; i < student_array.length; i++) {
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
        id: studentObj.id,
        onclick: "",
        text: "Delete"
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
    student_array = [];
    updateStudentList();
}

/**
 * removeStudent - take in currentStudent, will reindex each student with a new ID every time a student is removed
 * from the DOM
 * @param currentStudent
 */
function removeStudent(currentStudent) {
    var studentIndicator = parseInt(currentStudent.attr("id"));
    for (var i = 0; i < student_array.length; i++) {
        if (studentIndicator == student_array[i].id) {
            student_array.splice(i, 1);
            delStudentFromDB(studentIndicator);
        }
    }
}

/**
 * Listen for the document to load and reset the data to the initial state
 */
