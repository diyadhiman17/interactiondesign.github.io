const container = document.getElementById('notes-container');
const addNoteButton = document.getElementById('add-note-btn');

// Load saved notes from localStorage when the page loads
window.addEventListener('DOMContentLoaded', loadNotes);

// Function to create a new sticky note
function createStickyNote(content = "", position = { top: 100, left: 100 }, colorClass = getRandomColorClass()) {
  const note = document.createElement('div');
  note.classList.add('sticky-note', colorClass); // Add the color class
  note.style.top = `${position.top}px`;
  note.style.left = `${position.left}px`;
  note.contentEditable = true;

  // Add the content to the note (set only user text, exclude delete button)
  note.dataset.content = content; // Save content in a data attribute
  note.innerText = content;

  // Apply a random tilt to the sticky note
  const randomAngle = Math.floor(Math.random() * 15) - 7.5; // Random tilt between -7.5° and 7.5°
  note.style.transform = `rotate(${randomAngle}deg)`;

  // Create and add a delete button
  const deleteButton = document.createElement('button');
  deleteButton.innerText = 'X';
  deleteButton.classList.add('delete-btn');
  deleteButton.addEventListener('click', () => {
    note.remove(); // Remove note from the DOM
    saveNotes(); // Save updated notes to localStorage
  });

  note.appendChild(deleteButton); // Append the delete button to the note

  // Add drag functionality
  makeDraggable(note);

  // Save notes on content change
  note.addEventListener('input', () => {
    note.dataset.content = note.innerText; // Update the data-content attribute
    saveNotes();
  });

  container.appendChild(note);
}

// Function to generate a random color class
function getRandomColorClass() {
  const colors = ['pink', 'green', 'blue', 'yellow'];
  return colors[Math.floor(Math.random() * colors.length)];
}

// Make sticky notes draggable
function makeDraggable(note) {
  let offsetX, offsetY;

  note.addEventListener('mousedown', (e) => {
    offsetX = e.offsetX;
    offsetY = e.offsetY;

    const onMouseMove = (event) => {
      note.style.left = `${event.clientX - offsetX}px`;
      note.style.top = `${event.clientY - offsetY}px`;
    };

    document.addEventListener('mousemove', onMouseMove);

    note.addEventListener('mouseup', () => {
      document.removeEventListener('mousemove', onMouseMove);
      saveNotes();
    }, { once: true });
  });
}

// Save all notes to localStorage
function saveNotes() {
  const notes = [];
  document.querySelectorAll('.sticky-note').forEach((note) => {
    notes.push({
      content: note.dataset.content, // Save content from the data-content attribute
      position: {
        top: parseInt(note.style.top),
        left: parseInt(note.style.left),
      },
      colorClass: Array.from(note.classList).find((cls) =>
        ['pink', 'green', 'blue', 'yellow'].includes(cls)
      ),
    });
  });
  localStorage.setItem('stickyNotes', JSON.stringify(notes));
}

// Load notes from localStorage
function loadNotes() {
  const savedNotes = JSON.parse(localStorage.getItem('stickyNotes')) || [];
  savedNotes.forEach((note) => createStickyNote(note.content, note.position, note.colorClass));
}

// Add event listener to the button to create new sticky notes
addNoteButton.addEventListener('click', () => createStickyNote());
