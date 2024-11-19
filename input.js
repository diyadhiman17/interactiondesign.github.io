const container = document.getElementById('notes-container');
const addNoteButton = document.getElementById('add-note-btn');

// Load saved notes from localStorage when the page loads
window.addEventListener('DOMContentLoaded', loadNotes);

// Function to create a new sticky note
function createStickyNote(content = "Write here...", position = { top: 100, left: 100 }, colorClass = getRandomColorClass()) {
  const note = document.createElement('div');
  note.classList.add('sticky-note', colorClass); // Add the color class
  note.style.top = `${position.top}px`;
  note.style.left = `${position.left}px`;
  note.contentEditable = true;
  note.innerText = content;

  // Apply a random tilt to the sticky note
  const randomAngle = Math.floor(Math.random() * 15) - 7.5; // Random tilt between -7.5° and 7.5°
  note.style.transform = `rotate(${randomAngle}deg)`;  // Apply the rotation to the sticky note

  // Add drag functionality
  makeDraggable(note);

  container.appendChild(note);

  // Save notes whenever content or position changes
  note.addEventListener('input', saveNotes);
  note.addEventListener('mouseup', saveNotes);
}

// Function to generate a random color class for sticky notes
function getRandomColorClass() {
  const colors = ['pink', 'green', 'blue', 'yellow']; // Available colors
  const randomIndex = Math.floor(Math.random() * colors.length); // Generate random index
  return colors[randomIndex]; // Return random color class
}

// Add functionality to make sticky notes draggable
function makeDraggable(note) {
  let offsetX, offsetY;

  note.addEventListener('mousedown', (e) => {
    // Save the offset where the mouse is clicking relative to the note's position
    offsetX = e.offsetX;
    offsetY = e.offsetY;

    // Make the note move with the mouse during drag
    const onMouseMove = (event) => {
      note.style.left = `${event.clientX - offsetX}px`; // Update note's position on the x-axis
      note.style.top = `${event.clientY - offsetY}px`;  // Update note's position on the y-axis
    };

    // Add mousemove event listener to document
    document.addEventListener('mousemove', onMouseMove);

    // When the mouse is released, stop moving the note and save its position
    note.addEventListener('mouseup', () => {
      document.removeEventListener('mousemove', onMouseMove); // Stop moving the note
      saveNotes(); // Optionally, save the new position here
    }, { once: true }); // Use once: true to remove the mouseup listener after it is triggered
  });
}

// Save all notes to localStorage
function saveNotes() {
  const notes = [];
  document.querySelectorAll('.sticky-note').forEach((note) => {
    notes.push({
      content: note.innerText,
      position: {
        top: parseInt(note.style.top),
        left: parseInt(note.style.left),
      },
      colorClass: Array.from(note.classList).find((cls) =>
        ['pink', 'green', 'blue', 'yellow'].includes(cls)
      ), // Save the color class
    });
  });
  localStorage.setItem('stickyNotes', JSON.stringify(notes));
}

// Load notes from localStorage
function loadNotes() {
  const savedNotes = JSON.parse(localStorage.getItem('stickyNotes')) || [];
  savedNotes.forEach((note) =>
    createStickyNote(note.content, note.position, note.colorClass)
  );
}

// Add event listener to the button to create new sticky notes
addNoteButton.addEventListener('click', () => createStickyNote());
