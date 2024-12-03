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

  // Add the content to the note
  note.dataset.content = content;
  note.innerText = content;

  // Add a delete button
  const deleteButton = document.createElement('button');
  deleteButton.innerText = 'X';
  deleteButton.classList.add('delete-btn');
  deleteButton.addEventListener('click', () => {
    note.remove();
    saveNotes();
  });

  note.appendChild(deleteButton);

  // Make draggable
  makeDraggable(note);

  // Save notes on content change
  note.addEventListener('input', () => {
    note.dataset.content = note.innerText;
    saveNotes();
  });

  container.appendChild(note);
}

// Function to make sticky notes draggable
function makeDraggable(note) {
  let isDragging = false;
  let offsetX, offsetY;

  note.addEventListener('mousedown', (e) => {
    isDragging = true;
    offsetX = e.clientX - note.getBoundingClientRect().left;
    offsetY = e.clientY - note.getBoundingClientRect().top;

    const onMouseMove = (event) => {
      if (isDragging) {
        note.style.left = `${event.clientX - offsetX}px`;
        note.style.top = `${event.clientY - offsetY}px`;
      }
    };

    const onMouseUp = () => {
      isDragging = false;
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
      saveNotes();
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
}

// Generate a random color class
function getRandomColorClass() {
  const colors = ['pink', 'green', 'blue', 'yellow'];
  return colors[Math.floor(Math.random() * colors.length)];
}

// Save all notes to localStorage
function saveNotes() {
  const notes = [];
  document.querySelectorAll('.sticky-note').forEach((note) => {
    notes.push({
      content: note.dataset.content,
      position: {
        top: parseInt(note.style.top, 10),
        left: parseInt(note.style.left, 10),
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
