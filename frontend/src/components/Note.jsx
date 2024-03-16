import React from 'react';

const Note = ({ note, onDelete }) => {
    return (
        <div className="card sticky-note">
            <div className="card-body">
                <p className="card-text">{note.text}</p>
                <button className="btn btn-danger" onClick={() => onDelete(note.id)}>Delete</button>
            </div>
        </div>
    );
};

export default Note;