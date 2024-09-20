// Utility function to get query parameters from the URL
function getQueryParam(param) {
    var urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}
// DOMContentLoaded event to handle initial page load logic
window.addEventListener('DOMContentLoaded', function () {
    var formSection = document.querySelector(".form-section");
    var cvSection = document.querySelector(".cv-section");
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
// Get references to necessary DOM elements
var nameInput = document.getElementById('Name');
var button = document.getElementById('button');
var profilePic = document.getElementById("profile-pic");
var inputFile = document.getElementById("input-file");
var pdfButton = document.getElementById("pdf-btn");
var selectedFile = null;
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
    document.querySelector(".form-section").style.display = "none";
    document.querySelector(".cv-section").style.display = "block";
});
<<<<<<< HEAD
// Function to switch back to form for editing
=======
// Function to handle edit button click
>>>>>>> 930fbd4147733883a068270c05a46faa3ed22dfb
function editForm() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    document.querySelector(".cv-section").style.display = "none";
    document.querySelector(".form-section").style.display = "block";
}
<<<<<<< HEAD
// Event listener for the "Edit" button
=======
// Edit button functionality
>>>>>>> 930fbd4147733883a068270c05a46faa3ed22dfb
var editButton = document.getElementById("edit-btn");
editButton.addEventListener("click", function (event) {
    event.preventDefault();
    editForm();
});
<<<<<<< HEAD
// Event listener for the "Generate PDF" button
pdfButton === null || pdfButton === void 0 ? void 0 : pdfButton.addEventListener("click", function (event) {
    event.preventDefault();
    // Show the CV section for PDF generation
    document.querySelector(".form-section").style.display = "none";
    document.querySelector(".cv-section").style.display = "block";
    window.print();
    // Ensure the CV section remains visible after printing
    document.querySelector(".form-section").style.display = "none";
    document.querySelector(".cv-section").style.display = "block";
});
// Shareable button functionality
var shareableButton = document.getElementById("shareable-btn");
shareableButton === null || shareableButton === void 0 ? void 0 : shareableButton.addEventListener("click", function (event) {
    event.preventDefault();
    // Use the form data to generate the shareable link with only the name
    var nameValue = (nameInput === null || nameInput === void 0 ? void 0 : nameInput.value.trim()) || "defaultName";
    var shareableURL = "".concat(window.location.origin, "?name=").concat(encodeURIComponent(nameValue), "#cv");
    // Show the shareable link in an alert box
    alert("Your shareable link is: ".concat(shareableURL));
    // Show the CV section and hide the form
=======
// PDF button functionality - opens print dialog
pdfButton === null || pdfButton === void 0 ? void 0 : pdfButton.addEventListener("click", function (event) {
    event.preventDefault();
    // Hide form and only show CV in print
    document.querySelector(".form-section").style.display = "none";
    document.querySelector(".cv-section").style.display = "block";
    // Trigger the print dialog to generate PDF
    window.print();
    // After print, return to original display
>>>>>>> 930fbd4147733883a068270c05a46faa3ed22dfb
    document.querySelector(".form-section").style.display = "none";
    document.querySelector(".cv-section").style.display = "block";
});
// URL encoding
function uriEncod() {
    var currentUrl = new URL(window.location.href);
    var usrname = document.getElementById("Name").value;
    currentUrl.searchParams.delete("username");
    currentUrl.searchParams.set("username", usrname);
    var usrUriElement = document.getElementById("usruri");
    //usrUriElement.innerText = currentUrl.toString();
    usrUriElement.style.display = "block";
    var tm = 20;
    var tmr = setInterval(function () {
        if (tm > 0) {
            tm--;
            usrUriElement.innerHTML = "<h3>" + currentUrl.toString() + "<br><br>Select & Copy your Unique Link<br>" + tm + "</h3>";
        }
        else {
            usrUriElement.style.display = "none";
            clearInterval(tmr);
        }
    }, 1000);
}
// URL decoding
function uriDecod() {
    var urlParams = new URLSearchParams(window.location.search);
    var uname = urlParams.get('username');
    if (uname) {
        document.getElementById("form-section").style.display = "none";
        document.getElementById("cv-section").style.display = "block";
        document.getElementById("dynamicName").innerText = "".concat(uname);
    }
}
setTimeout(function () {
    uriDecod();
}, 500);
