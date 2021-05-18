window.onload=function(){
    document.getElementById("update").disabled=true;
}
var updatebtn=document.getElementsById("update");
updatebtn.onclick=function(){
    updateRecord(formData);
}
var selectedRow = null

function onFormSubmit() {
    if (validate()) {
        var formData = readFormData();
        if (selectedRow == null)
            insertNewRecord(formData);
        else
            updateRecord(formData);    
    }
}

function readFormData() {
    var formData = {};
    formData["id"] = document.getElementById("id").value;
    formData["title"] = document.getElementById("title").value;
    formData["user"] = document.getElementById("user").value;
    formData["email"] = document.getElementById("email").value;
    return formData;
}

function insertNewRecord(data) {
    var table = document.getElementById("employeeList").getElementsByTagName('tbody')[0];
    var newRow = table.insertRow(table.length);
    cell1 = newRow.insertCell(0);
    cell1.innerHTML = data.id;
    cell2 = newRow.insertCell(1);
    cell2.innerHTML = data.title;
    cell3 = newRow.insertCell(2);
    cell3.innerHTML = data.user;
    cell4 = newRow.insertCell(3);
    cell4.innerHTML = data.email;
    cell4 = newRow.insertCell(4);
    cell4.innerHTML = `<a onClick="onEdit(this)">Update</a>
                       <a onClick="onDelete(this)">Remove</a>`;
}

function resetForm() {
    document.getElementById("update").disabled=true;
    document.querySelector('input[type="submit"]').disabled=false;
    document.getElementById("id").value = "";
  //  document.querySelector('input[name="gender"]:checked').value = "";
    document.getElementById("title").value = "";
    document.getElementById("user").value = "";
    document.getElementById("email").value = "";
    selectedRow = null;
}

function onEdit(td) {
    document.getElementById("update").disabled=false;
    document.querySelector('input[type="submit"]').disabled=true;
    selectedRow = td.parentElement.parentElement;
    document.getElementById("id").value = selectedRow.cells[0].innerHTML;
    document.getElementById('title').value = selectedRow.cells[1].innerHTML;
    document.getElementById("user").value = selectedRow.cells[2].innerHTML;
    document.getElementById("email").value = selectedRow.cells[3].innerHTML;
}
function updateRecord(formData) {
    selectedRow.cells[0].innerHTML = formData.id;
    selectedRow.cells[1].innerHTML = formData.title;
    selectedRow.cells[2].innerHTML = formData.user;
    selectedRow.cells[3].innerHTML = formData.email;
}

function onDelete(td) {
    if (confirm('Are you sure to delete this record ?')) {
        row = td.parentElement.parentElement;
        document.getElementById("employeeList").deleteRow(row.rowIndex);
        resetForm();
    }
}
function validate() {
    isValid = true;
    if (document.getElementById("email").value == "") {
        isValid = false;
        document.getElementById("fullNameValidationError").classList.remove("hide");
    } else {
        isValid = true;
        if (!document.getElementById("fullNameValidationError").classList.contains("hide"))
            document.getElementById("fullNameValidationError").classList.add("hide");
    }
    return isValid;
}