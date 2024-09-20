// Utility function to get query parameters from the URL
function getQueryParam(param: string): string | null {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}

// DOMContentLoaded event to handle initial page load logic
window.addEventListener('DOMContentLoaded', () => {
  const formSection = document.querySelector(".form-section") as HTMLDivElement;
  const cvSection = document.querySelector(".cv-section") as HTMLDivElement;

  // Initially show form and hide CV
  formSection.style.display = "block";
  cvSection.style.display = "none";

  // If URL contains '#cv', show the CV section and load data from local storage
  if (window.location.hash === '#cv') {
    const nameFromURL = getQueryParam('name');

    if (nameFromURL) {
      formSection.style.display = "none";
      cvSection.style.display = "block";

      // Load data from local storage using the name as a key
      const savedData = localStorage.getItem(nameFromURL);

      if (savedData) {
        const formData = JSON.parse(savedData);

        // Populate CV fields from saved data
        fields.forEach(({ inputId, outputId }) => {
          const outputElement = document.getElementById(outputId) as HTMLElement | null;
          if (outputElement && formData[inputId]) {
            outputElement.innerText = formData[inputId];
          }
        });

        // Show profile picture if saved
        if (formData.profilePic && profilePic) {
          profilePic.src = formData.profilePic;
          profilePic.style.display = "block";
        }
      }
    }
  }
});

// Field mapping for dynamic content updates
const fields = [
  { inputId: 'Name', outputId: 'dynamicName' },
  { inputId: 'Email', outputId: 'dynamicEmail' },
  { inputId: 'Phone', outputId: 'dynamicPhone' },
  { inputId: 'About', outputId: 'dynamicAbout' },
  { inputId: 'Education', outputId: 'dynamicEducation' },
  { inputId: 'Skill', outputId: 'dynamicSkills' },
  { inputId: 'Language', outputId: 'dynamicLanguages' }
];

// Get references to necessary DOM elements
const nameInput = document.getElementById('Name') as HTMLInputElement | null;
const button = document.getElementById('button') as HTMLButtonElement | null;
const profilePic = document.getElementById("profile-pic") as HTMLImageElement | null;
const inputFile = document.getElementById("input-file") as HTMLInputElement | null;
const pdfButton = document.getElementById("pdf-btn") as HTMLButtonElement | null;
let selectedFile: File | null = null;

// Handle file input for profile picture
inputFile?.addEventListener('change', () => {
  const file = inputFile.files?.[0];
  if (file) {
    selectedFile = file;
  }
});

// Function to show fields dynamically in the CV section
function showField(inputElement: HTMLInputElement | null, outputElement: HTMLElement | null) {
  if (inputElement && outputElement) {
    outputElement.innerText = inputElement.value;
  }
}

// Event listener for the "Generate CV" button
button?.addEventListener('click', (event) => {
  event.preventDefault();

  // Scroll to the top of the page
  window.scrollTo({ top: 0, behavior: 'smooth' });

  // Create an object to store form data
  const formData: { [key: string]: string } = {};

  // Update CV fields and store form values
  fields.forEach(({ inputId, outputId }) => {
    const inputElement = document.getElementById(inputId) as HTMLInputElement | null;
    const outputElement = document.getElementById(outputId) as HTMLElement | null;
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
  if (nameInput?.value.trim()) {
    localStorage.setItem(nameInput.value.trim(), JSON.stringify(formData));
  }

  // Hide the form section and show the CV section
  (document.querySelector(".form-section") as HTMLDivElement).style.display = "none";
  (document.querySelector(".cv-section") as HTMLDivElement).style.display = "block";
});

// Function to switch back to form for editing
function editForm(): void {
  window.scrollTo({ top: 0, behavior: 'smooth' });
  (document.querySelector(".cv-section") as HTMLDivElement).style.display = "none";
  (document.querySelector(".form-section") as HTMLDivElement).style.display = "block";
}

// Event listener for the "Edit" button
const editButton = document.getElementById("edit-btn") as HTMLButtonElement;
editButton.addEventListener("click", (event) => {
  event.preventDefault();
  editForm();
});

// Event listener for the "Generate PDF" button
pdfButton?.addEventListener("click", (event) => {
  event.preventDefault();

  // Show the CV section for PDF generation
  (document.querySelector(".form-section") as HTMLDivElement).style.display = "none";
  (document.querySelector(".cv-section") as HTMLDivElement).style.display = "block";

  window.print();

  // Ensure the CV section remains visible after printing
  (document.querySelector(".form-section") as HTMLDivElement).style.display = "none";
  (document.querySelector(".cv-section") as HTMLDivElement).style.display = "block";
});

// Shareable button functionality
const shareableButton = document.getElementById("shareable-btn") as HTMLButtonElement | null;
shareableButton?.addEventListener("click", (event) => {
  event.preventDefault();

  // Use the form data to generate the shareable link with only the name
  const nameValue = nameInput?.value.trim() || "defaultName";
  const shareableURL = `${window.location.origin}?name=${encodeURIComponent(nameValue)}#cv`;

  // Show the shareable link in an alert box
  alert(`Your shareable link is: ${shareableURL}`);

  // Show the CV section and hide the form
  (document.querySelector(".form-section") as HTMLDivElement).style.display = "none";
  (document.querySelector(".cv-section") as HTMLDivElement).style.display = "block";
});
