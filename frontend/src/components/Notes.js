import React, { useEffect, useContext, useState } from "react";
import NoteItem from "./NoteItem";
import NoteContext from "../context/NoteContext";
import EditNoteModal from "./EditNoteModal";

const Notes = () => {
    const { notes, getAllNotes } = useContext(NoteContext);
    const [show, setShow] = useState(false);
    const [previousNote, setPreviousNote] = useState({});

    const handleUpdate = (note) => {
        setPreviousNote(note);
        setShow(true);
    };

    useEffect(() => {
        getAllNotes();
        //eslint-disable-next-line
    }, []);

    return (
        <>
            <h1 className="mt-4">Your notes</h1>
            <EditNoteModal
                show={show}
                previousNote={previousNote}
                handleClose={() => {
                    setShow(false);
                }}
            />
            <div className="row">
                {notes.map((note) => {
                    return (
                        <NoteItem
                            key={note._id}
                            note={note}
                            handleUpdate={handleUpdate}
                        />
                    );
                })}
            </div>
        </>
    );
};

export default Notes;
