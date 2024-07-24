import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import toast, { Toaster } from 'react-hot-toast';
import 'tailwindcss/tailwind.css';
import 'daisyui/dist/full.css';

import {useNavigate} from 'react-router-dom';

const App = () => {
  const [note, setNote] = useState('');

  const [notes, setNotes] = useState([]);
  const [selectedNote, setSelectedNote] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const storedNotes = JSON.parse(localStorage.getItem('notes')) || [];
    setNotes(storedNotes);
  }, []);

  const handleSaveNote = () => {
    if (!note.trim()) {
      toast.error('Note cannot be empty');
      return;
    }
    const newNote = { id: Date.now(), text: note };
    const newNotes = [...notes, newNote];
    setNotes(newNotes);
    localStorage.setItem('notes', JSON.stringify(newNotes));
    setNote('');
    toast.success('Note saved!');

  };

  const handleEditNote = (editedText) => {
    const updatedNotes = notes.map((n) =>
      n.id === selectedNote.id ? { ...n, text: editedText } : n
    );
    setNotes(updatedNotes);
    localStorage.setItem('notes', JSON.stringify(updatedNotes));
    setSelectedNote(null);
    setIsEditing(false);
    toast.success('Note updated!');
  };

  return (
    <div className="min-h-screen bg-gray-100 p-5">
      <Toaster />
      <div className="container mx-auto">
        <div className="mb-5">
          <input
            type="text"
            className="input input-bordered w-full"
            placeholder="Type your note here..."
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />
          <button className="btn btn-primary mt-2" onClick={handleSaveNote}>
            Save
          </button>
        </div>
        <div>
          {selectedNote ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="p-5 bg-white shadow-lg rounded-lg"
            >
              <textarea
                className="textarea textarea-bordered w-full"
                value={selectedNote.text}
                onChange={(e) =>
                  setSelectedNote({ ...selectedNote, text: e.target.value })
                }
              />
              <button
                className="btn btn-primary mt-2"
                onClick={() => handleEditNote(selectedNote.text)}
              >
                Save
              </button>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {notes.map((note) => (
                <motion.div
                  key={note.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  className="p-5 bg-white shadow-lg rounded-lg cursor-pointer"
                  onClick={() => {
                    setSelectedNote(note);
                    setIsEditing(true);
                  }}
                >
                  {note.text}
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
