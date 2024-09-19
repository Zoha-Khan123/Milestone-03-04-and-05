// Initially hide both form and CV when the page loads
window.addEventListener('DOMContentLoaded', function () {
    document.querySelector(".form-section").style.display = "block";
    document.querySelector(".cv-section").style.display = "none";
});
// Fields array for text inputs and their respective dynamic output elements
var fields = [
    { inputId: 'Name', outputId: 'dynamicName' },
    { inputId: 'Email', outputId: 'dynamicEmail' },
    { inputId: 'Phone', outputId: 'dynamicPhone' },
    { inputId: 'About', outputId: 'dynamicAbout' },
    { inputId: 'Education', outputId: 'dynamicEducation' },
    { inputId: 'Skill', outputId: 'dynamicSkills' },
    { inputId: 'Language', outputId: 'dynamicLanguages' }
];
var button = document.getElementById('button');
var profilePic = document.getElementById("profile-pic");
var inputFile = document.getElementById("input-file");
var selectedFile = null;
inputFile === null || inputFile === void 0 ? void 0 : inputFile.addEventListener('change', function () {
    var _a;
    var file = (_a = inputFile.files) === null || _a === void 0 ? void 0 : _a[0];
    if (file) {
        selectedFile = file;
    }
});
function showField(inputElement, outputElement) {
    if (inputElement && outputElement) {
        outputElement.innerText = inputElement.value;
    }
}
button === null || button === void 0 ? void 0 : button.addEventListener('click', function (event) {
    event.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
    fields.forEach(function (_a) {
        var inputId = _a.inputId, outputId = _a.outputId;
        var inputElement = document.getElementById(inputId);
        var outputElement = document.getElementById(outputId);
        showField(inputElement, outputElement);
    });
    if (selectedFile && profilePic) {
        profilePic.src = URL.createObjectURL(selectedFile);
        profilePic.style.display = "block";
    }
    // Hide form and show CV
    document.querySelector(".form-section").style.display = "none";
    document.querySelector(".cv-section").style.display = "block";
});
function editForm() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    document.querySelector(".cv-section").style.display = "none";
    document.querySelector(".form-section").style.display = "block";
}
var editButton = document.getElementById("edit-btn");
editButton.addEventListener("click", function (event) {
    event.preventDefault();
    editForm();
});
// PDF Button
var pdfBtn = document.getElementById("pdf-btn");
var editBtn = document.getElementById("edit-btn");
var shareableBtn = document.getElementById("shareable-btn");
// Function to hide specific buttons
function hideButtons() {
    if (editBtn)
        editBtn.style.display = "none";
    if (pdfBtn)
        pdfBtn.style.display = "none";
    if (shareableBtn)
        shareableBtn.style.display = "none";
}
// Function to show the buttons again after printing
function showButtons() {
    if (editBtn)
        editBtn.style.display = "inline-block";
    if (pdfBtn)
        pdfBtn.style.display = "inline-block";
    if (shareableBtn)
        shareableBtn.style.display = "inline-block";
}
pdfBtn === null || pdfBtn === void 0 ? void 0 : pdfBtn.addEventListener("click", function () {
    hideButtons(); // Hide the buttons
    window.print(); // Trigger print dialog
    setTimeout(showButtons, 0); // Show the buttons again after the print dialog
});
