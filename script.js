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
var pdfButton = document.getElementById("pdf-btn");
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
// Function to handle edit button click
function editForm() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    document.querySelector(".cv-section").style.display = "none";
    document.querySelector(".form-section").style.display = "block";
}
// Edit button functionality
var editButton = document.getElementById("edit-btn");
editButton.addEventListener("click", function (event) {
    event.preventDefault();
    editForm();
});
// PDF button functionality - opens print dialog
pdfButton === null || pdfButton === void 0 ? void 0 : pdfButton.addEventListener("click", function (event) {
    event.preventDefault();
    // Hide form and only show CV in print
    document.querySelector(".form-section").style.display = "none";
    document.querySelector(".cv-section").style.display = "block";
    // Trigger the print dialog to generate PDF
    window.print();
    // After print, return to original display
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
