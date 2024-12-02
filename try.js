// Select all images in the gallery
const images = document.querySelectorAll('.image-container img');

// Create the modal elements
const modal = document.createElement('div');
const modalContent = document.createElement('div');
const modalImage = document.createElement('img');
const modalText = document.createElement('div');
const closeButton = document.createElement('button');

// Add classes for styling
modal.classList.add('modal');
modalContent.classList.add('modal-content');
modalImage.classList.add('modal-image');
modalText.classList.add('modal-text');
closeButton.classList.add('modal-close');

// Add close button functionality
closeButton.textContent = '×';
closeButton.addEventListener('click', () => {
  modal.style.display = 'none'; // Hide the modal
});

// Assemble the modal structure
modalContent.appendChild(modalImage);
modalContent.appendChild(modalText);
modal.appendChild(modalContent);
modal.appendChild(closeButton);
document.body.appendChild(modal);

// Add click event listeners to each image
images.forEach((img) => {
  img.addEventListener('click', () => {
    // Set the modal content
    modalImage.src = img.src; // Set the image
    modalText.textContent = img.getAttribute('data-description'); // Set the description
    modal.style.display = 'flex'; // Show the modal
  });
});

// Add Intersection Observer for fade-in effect
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    } else {
      entry.target.classList.remove('visible');
    }
  });
}, { threshold: 0.6 });

// Observe each image for visibility
images.forEach((img) => observer.observe(img));
