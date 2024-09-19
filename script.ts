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

function editForm(): void {
  window.scrollTo({ top: 0, behavior: 'smooth' });
  (document.querySelector(".cv-section") as HTMLDivElement).style.display = "none";
  (document.querySelector(".form-section") as HTMLDivElement).style.display = "block";
}

const editButton = document.getElementById("edit-btn") as HTMLButtonElement;
editButton.addEventListener("click", (event) => {
  event.preventDefault();
  editForm();
});



