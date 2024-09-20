// Initially hide both form and CV when the page loads
window.addEventListener('DOMContentLoaded', () => {
  (document.querySelector(".form-section") as HTMLDivElement).style.display = "block";
  (document.querySelector(".cv-section") as HTMLDivElement).style.display = "none";
});

// Fields array for text inputs and their respective dynamic output elements
const fields = [
  { inputId: 'Name', outputId: 'dynamicName' },
  { inputId: 'Email', outputId: 'dynamicEmail' },
  { inputId: 'Phone', outputId: 'dynamicPhone' },
  { inputId: 'About', outputId: 'dynamicAbout' },
  { inputId: 'Education', outputId: 'dynamicEducation' },
  { inputId: 'Skill', outputId: 'dynamicSkills' },
  { inputId: 'Language', outputId: 'dynamicLanguages' }
];

const button = document.getElementById('button') as HTMLButtonElement | null;
const profilePic = document.getElementById("profile-pic") as HTMLImageElement | null;
const inputFile = document.getElementById("input-file") as HTMLInputElement | null;
const pdfButton = document.getElementById("pdf-btn") as HTMLButtonElement | null;
let selectedFile: File | null = null;

inputFile?.addEventListener('change', () => {
  const file = inputFile.files?.[0];
  if (file) {
    selectedFile = file;
  }
});

function showField(inputElement: HTMLInputElement | null, outputElement: HTMLElement | null) {
  if (inputElement && outputElement) {
    outputElement.innerText = inputElement.value;
  }
}

button?.addEventListener('click', (event) => {
  event.preventDefault();

  window.scrollTo({ top: 0, behavior: 'smooth' });

  fields.forEach(({ inputId, outputId }) => {
    const inputElement = document.getElementById(inputId) as HTMLInputElement | null;
    const outputElement = document.getElementById(outputId) as HTMLElement | null;
    showField(inputElement, outputElement);
  });

  if (selectedFile && profilePic) {
    profilePic.src = URL.createObjectURL(selectedFile);
    profilePic.style.display = "block";
  }

  // Hide form and show CV
  (document.querySelector(".form-section") as HTMLDivElement).style.display = "none";
  (document.querySelector(".cv-section") as HTMLDivElement).style.display = "block";
});

// Function to handle edit button click
function editForm(): void {
  window.scrollTo({ top: 0, behavior: 'smooth' });
  (document.querySelector(".cv-section") as HTMLDivElement).style.display = "none";
  (document.querySelector(".form-section") as HTMLDivElement).style.display = "block";
}

// Edit button functionality
const editButton = document.getElementById("edit-btn") as HTMLButtonElement;
editButton.addEventListener("click", (event) => {
  event.preventDefault();
  editForm();
});

// PDF button functionality - opens print dialog
pdfButton?.addEventListener("click", (event) => {
  event.preventDefault();
  
  // Hide form and only show CV in print
  (document.querySelector(".form-section") as HTMLDivElement).style.display = "none";
  (document.querySelector(".cv-section") as HTMLDivElement).style.display = "block";

  // Trigger the print dialog to generate PDF
  window.print();

  // After print, return to original display
  (document.querySelector(".form-section") as HTMLDivElement).style.display = "none";
  (document.querySelector(".cv-section") as HTMLDivElement).style.display = "block";
});


// URL encoding
function uriEncod(): void {
  const currentUrl = new URL(window.location.href);
  const usrname = (document.getElementById("Name") as HTMLInputElement).value; 
  currentUrl.searchParams.delete("username");
  currentUrl.searchParams.set("username", usrname);
  const usrUriElement = document.getElementById("usruri") as HTMLElement;
  //usrUriElement.innerText = currentUrl.toString();
  usrUriElement.style.display = "block";
  var tm=20;
  var tmr=setInterval(function(){
    if(tm>0){
      tm--;
      usrUriElement.innerHTML ="<h3>"+ currentUrl.toString()+"<br><br>Select & Copy your Unique Link<br>"+tm+"</h3>";
    }
    else{
usrUriElement.style.display = "none";
clearInterval(tmr);
    }
    
  },1000)
}



// URL decoding
function uriDecod(){
 
const urlParams = new URLSearchParams(window.location.search);
const uname:any = urlParams.get('username');


if(uname){
  (document.getElementById("form-section") as HTMLElement).style.display = "none";
(document.getElementById("cv-section") as HTMLElement).style.display = "block";
  (document.getElementById("dynamicName") as HTMLElement).innerText = `${uname}`;
}
}
setTimeout(function(){
  uriDecod();
},500);
