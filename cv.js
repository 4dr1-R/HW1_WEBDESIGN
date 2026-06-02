const form = document.getElementById("projectForm");
const tableBody = document.getElementById("projectsTableBody");

const fields = {
    projectName: document.getElementById("projectName"),
    projectDate: document.getElementById("projectDate"),
    description: document.getElementById("description"),
    projectUrl: document.getElementById("projectUrl"),
    technologies: document.getElementById("technologies"),
    imageUrl: document.getElementById("imageUrl")
};

function showError(field, message){
    const errorElement = document.getElementById(field.id + "Error");
    field.classList.add("invalid");
    errorElement.textContent = message;
}

function clearError(field){
    const errorElement = document.getElementById(field.id + "Error");
    field.classList.remove("invalid");
    errorElement.textContent = "";
}

function validateForm(){
    let valid = true;

    Object.values(fields).forEach(clearError);

    if(fields.projectName.value.trim().length < 3){
        showError(fields.projectName, "Project name must contain at least 3 characters.");
        valid = false;
    }

    if(fields.description.value.trim().length < 3){
        showError(fields.description, "Description must contain at least 3 characters.");
        valid = false;
    }

    if(!fields.projectUrl.value.trim()){
        showError(fields.projectUrl, "Please enter a valid project URL.");
        valid = false;
    }

    if(!fields.imageUrl.value.trim()){
        showError(fields.imageUrl, "Please enter a thumbnail image URL.");
        valid = false;
    }

    if(!fields.technologies.value){
        showError(fields.technologies, "Please select a technology.");
        valid = false;
    }

    if(!fields.projectDate.value){
        showError(fields.projectDate, "Please choose a completion date.");
        valid = false;
    }

    return valid;
}

form.addEventListener("submit", function(event){
    event.preventDefault();

    if(!validateForm()){
        return;
    }

   
    if(tableBody.querySelector(".empty-state")){
        tableBody.innerHTML = "";
    }

    const row = document.createElement("tr");

    
    row.innerHTML = `
        <td>
            <img
                loading="lazy"
                src="${fields.imageUrl.value}"
                alt="${fields.projectName.value} thumbnail"
                class="thumbnail"> 
        </td>
        <td>${fields.projectName.value}</td>
        <td>${fields.description.value}</td>
        <td>
            <a
                href="${fields.projectUrl.value}"
                target="_blank"
                rel="noopener noreferrer">
                Visit
            </a>
        </td>
        <td>${fields.technologies.value}</td>
        <td>${fields.projectDate.value}</td>
    `;

    tableBody.appendChild(row);
    form.reset();
});

form.addEventListener("reset", () => {
    Object.values(fields).forEach(clearError);
});