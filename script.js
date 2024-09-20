// Get references to necessary DOM elements
var formSection = document.querySelector(".form-section");
var cvSection = document.querySelector(".cv-section");
var nameInput = document.getElementById('Name');
var button = document.getElementById('button');
var profilePic = document.getElementById("profile-pic");
var inputFile = document.getElementById("input-file");
var pdfButton = document.getElementById("pdf-btn");
var editButton = document.getElementById("edit-btn");
var shareableButton = document.getElementById("shareable-btn");
var selectedFile = null;
// Utility function to get query parameters from the URL
function getQueryParam(param) {
    var urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}
// Field mapping for dynamic content updates
var fields = [
    { inputId: 'Name', outputId: 'dynamicName' },
    { inputId: 'Email', outputId: 'dynamicEmail' },
    { inputId: 'Phone', outputId: 'dynamicPhone' },
    { inputId: 'About', outputId: 'dynamicAbout' },
    { inputId: 'Education', outputId: 'dynamicEducation' },
    { inputId: 'Skill', outputId: 'dynamicSkills' },
    { inputId: 'Language', outputId: 'dynamicLanguages' }
];
// DOMContentLoaded event to handle initial page load logic
window.addEventListener('DOMContentLoaded', function () {
    // Initially show form and hide CV
    formSection.style.display = "block";
    cvSection.style.display = "none";
    // If URL contains '#cv', show the CV section and load data from local storage
    if (window.location.hash === '#cv') {
        var nameFromURL = getQueryParam('name');
        if (nameFromURL) {
            formSection.style.display = "none";
            cvSection.style.display = "block";
            // Load data from local storage using the name as a key
            var savedData = localStorage.getItem(nameFromURL);
            if (savedData) {
                var formData_1 = JSON.parse(savedData);
                // Populate CV fields from saved data
                fields.forEach(function (_a) {
                    var inputId = _a.inputId, outputId = _a.outputId;
                    var outputElement = document.getElementById(outputId);
                    if (outputElement && formData_1[inputId]) {
                        outputElement.innerText = formData_1[inputId];
                    }
                });
                // Show profile picture if saved
                if (formData_1.profilePic && profilePic) {
                    profilePic.src = formData_1.profilePic;
                    profilePic.style.display = "block";
                }
            }
        }
    }
});
// Handle file input for profile picture
inputFile === null || inputFile === void 0 ? void 0 : inputFile.addEventListener('change', function () {
    var _a;
    var file = (_a = inputFile.files) === null || _a === void 0 ? void 0 : _a[0];
    if (file) {
        selectedFile = file;
    }
});
// Function to show fields dynamically in the CV section
function showField(inputElement, outputElement) {
    if (inputElement && outputElement) {
        outputElement.innerText = inputElement.value;
    }
}
// Event listener for the "Generate CV" button
button === null || button === void 0 ? void 0 : button.addEventListener('click', function (event) {
    event.preventDefault();
    // Scroll to the top of the page
    window.scrollTo({ top: 0, behavior: 'smooth' });
    // Create an object to store form data
    var formData = {};
    // Update CV fields and store form values
    fields.forEach(function (_a) {
        var inputId = _a.inputId, outputId = _a.outputId;
        var inputElement = document.getElementById(inputId);
        var outputElement = document.getElementById(outputId);
        showField(inputElement, outputElement);
        if (inputElement) {
            formData[inputId] = inputElement.value;
        }
    });
    // Save profile picture if selected
    if (selectedFile && profilePic) {
        profilePic.src = URL.createObjectURL(selectedFile);
        profilePic.style.display = "block";
        formData.profilePic = profilePic.src;
    }
    // Save form data in local storage using the name as the key
    if (nameInput === null || nameInput === void 0 ? void 0 : nameInput.value.trim()) {
        localStorage.setItem(nameInput.value.trim(), JSON.stringify(formData));
    }
    // Hide the form section and show the CV section
    formSection.style.display = "none";
    cvSection.style.display = "block";
});
// Function to switch back to form for editing
function editForm() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    cvSection.style.display = "none";
    formSection.style.display = "block";
}
// Event listener for the "Edit" button
editButton.addEventListener("click", function (event) {
    event.preventDefault();
    editForm();
});
// Event listener for the "Generate PDF" button
pdfButton === null || pdfButton === void 0 ? void 0 : pdfButton.addEventListener("click", function (event) {
    event.preventDefault();
    // Show the CV section for PDF generation
    formSection.style.display = "none";
    cvSection.style.display = "block";
    window.print();
    // Ensure the CV section remains visible after printing
    formSection.style.display = "none";
    cvSection.style.display = "block";
});
// Shareable button functionality
shareableButton === null || shareableButton === void 0 ? void 0 : shareableButton.addEventListener("click", function (event) {
    event.preventDefault();
    // Use the form data to generate the shareable link with only the name
    var nameValue = (nameInput === null || nameInput === void 0 ? void 0 : nameInput.value.trim()) || "defaultName";
    var shareableURL = "".concat(window.location.origin, "?name=").concat(encodeURIComponent(nameValue), "#cv");
    // Show the shareable link in an alert box
    alert("Your shareable link is: ".concat(shareableURL));
    // Show the CV section and hide the form
    formSection.style.display = "none";
    cvSection.style.display = "block";
});
