const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;

if (typeof window !== 'undefined') {
    let noteForm;
    let noteTitle;
    let noteText;
    let saveNoteBtn;
    let newNoteBtn;
    let noteList;
  
    if (window.location.pathname === '/notes') {
      noteForm = document.querySelector('.note-form');
      noteTitle = document.querySelector('.note-title');
      noteText = document.querySelector('.note-textarea');
      saveNoteBtn = document.querySelector('.save-note');
      newNoteBtn = document.querySelector('.new-note');
      clearBtn = document.querySelector('.clear-btn');
      noteList = document.querySelectorAll('.list-container .list-group');
    }
  
  
    fetch('/api/data')
    .then(response => response.json())
    .then(data => {
      console.log(data); // Output the response from the server
    })
    .catch(error => {
      console.error('Error:', error);
    });
  
  // Show an element
  const show = (elem) => {
    elem.style.display = 'inline';
  };
  
  // Hide an element
  const hide = (elem) => {
    elem.style.display = 'none';
  };
  
  // activeNote is used to keep track of the note in the textarea
  let activeNote = {};
  
  const getNotes = () =>
    fetch('/api/notes', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });
  
  const saveNote = (note) =>
    fetch('/api/notes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(note)
    });
  
  const deleteNote = (id) =>
    fetch(`/api/notes/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    });
  
  const renderActiveNote = () => {
    hide(saveNoteBtn);
    hide(clearBtn);
  
    if (activeNote.id) {
      show(newNoteBtn);
      noteTitle.setAttribute('readonly', true);
      noteText.setAttribute('readonly', true);
      noteTitle.value = activeNote.title;
      noteText.value = activeNote.text;
    } else {
      hide(newNoteBtn);
      noteTitle.removeAttribute('readonly');
      noteText.removeAttribute('readonly');
      noteTitle.value = '';
      noteText.value = '';
    }
  };
  
  const handleNoteSave = () => {
    const newNote = {
      title: noteTitle.value,
      text: noteText.value
    };
    saveNote(newNote).then(() => {
      getAndRenderNotes();
      renderActiveNote();
    });
  };
  
  // Delete the clicked note
  const handleNoteDelete = (e) => {
    // Prevents the click listener for the list from being called when the button inside of it is clicked
    e.stopPropagation();
  
    const note = e.target;
    const noteId = JSON.parse(note.parentElement.getAttribute('data-note')).id;
  
    if (activeNote.id === noteId) {
      activeNote = {};
    }
  
    deleteNote(noteId).then(() => {
      getAndRenderNotes();
      renderActiveNote();
    });
  };
  
  // Sets the activeNote and displays it
  const handleNoteView = (e) => {
    e.preventDefault();
    activeNote = JSON.parse(e.target.parentElement.getAttribute('data-note'));
    renderActiveNote();
  };
  
  // Sets the activeNote to and empty object and allows the user to enter a new note
  const handleNewNoteView = (e) => {
    activeNote = {};
    show(clearBtn);
    renderActiveNote();
  };
  
  // Renders the appropriate buttons based on the state of the form
  const handleRenderBtns = () => {
    show(clearBtn);
    if (!noteTitle.value.trim() && !noteText.value.trim()) {
      hide(clearBtn);
    } else if (!noteTitle.value.trim() || !noteText.value.trim()) {
      hide(saveNoteBtn);
    } else {
      show(saveNoteBtn);
    }
  };
  }
  