import React, { useState, useEffect } from "react";
import axios from "axios";
import Note from "./Note";
import { useAuth } from "./Auth";

const NotesLayout = () => {
  const [auth, setAuth] = useAuth();
  const [notes, setNotes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [notesPerPage] = useState(6); // Number of notes per page
  const [newNoteText, setNewNoteText] = useState("");

  const config = {
    header: {
      authorization: auth?.token,
    },
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      const response = await axios.get(
        "https://stock-smart.vercel.app/listNotes",
        config
      );
      setNotes(response.data.notes);
    } catch (error) {
      console.log("Error fetching notes:", error);
    }
  };

  const createNote = async () => {
    try {
      const response = await axios.post(
        "https://stock-smart.vercel.app/createNote",
        { content: newNoteText },
        config
      );
      setNotes([...notes, response.data.note]);
      setNewNoteText("");
    } catch (error) {
      console.log("Error creating note:", error);
    }
  };

  const deleteNote = async (id) => {
    try {
      await axios.delete(
        `https://stock-smart.vercel.app/deleteNote/${id}`,
        config
      );
      setNotes(notes.filter((note) => note.id !== id));
    } catch (error) {
      console.log("Error deleting note:", error);
    }
  };

  // Pagination
  const indexOfLastNote = currentPage * notesPerPage;
  const indexOfFirstNote = indexOfLastNote - notesPerPage;
  const currentNotes = notes.slice(indexOfFirstNote, indexOfLastNote);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="container mt-4">

      <div className="row row-cols-2">
        {currentNotes.map((note) => (
          <div key={note.id} className="col mb-4">
            <Note note={note} onDelete={deleteNote} />
          </div>
        ))}
      </div>
      <div className="row">
        <div className="col">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Enter your note..."
              value={newNoteText}
              onChange={(e) => setNewNoteText(e.target.value)}
            />
            <div className="input-group-append">
              <button
                className="btn btn-primary"
                type="button"
                onClick={createNote}
              >
                Add Note
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="d-flex justify-content-center mt-3">
        <nav aria-label="Page navigation">
          <ul className="pagination">
            {Array.from({ length: Math.ceil(notes.length / notesPerPage) }).map(
              (_, index) => (
                <li
                  key={index}
                  className={`page-item ${
                    currentPage === index + 1 ? "active" : ""
                  }`}
                >
                  <button
                    className="page-link"
                    onClick={() => paginate(index + 1)}
                  >
                    {index + 1}
                  </button>
                </li>
              )
            )}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default NotesLayout;
