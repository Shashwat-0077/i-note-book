import React, { useEffect, useContext, useState } from "react";
import NoteContext from "../context/NoteContext";
import EditNoteModal from "./EditNoteModal";
import NoteItem from "./NoteItem";

const Notes = () => {
    const { getAllNotes, notes } = useContext(NoteContext);
    const [show, setShow] = useState(false);
    const [previousNote, setPreviousNote] = useState({});

    useEffect(() => {
        if (localStorage.getItem("token")) {
            getAllNotes();
        }
        //eslint-disable-next-line
    }, []);

    const updateNote = (note) => {
        setPreviousNote(note);
        setShow(true);
    };

    return (
        <>
            <EditNoteModal
                show={show}
                setShow={setShow}
                previousNote={previousNote}
                setPreviousNote={setPreviousNote}
            />

            <h2 className="my-4">Your Notes</h2>
            <div className="mt-2 row">
                {notes.length !== 0 ? (
                    notes.map((note) => {
                        return (
                            <NoteItem
                                key={note._id}
                                note={note}
                                updateNote={updateNote}
                            />
                        );
                    })
                ) : (
                    <p>No note here , try making a new note</p>
                )}
            </div>
        </>
    );
};

export default Notes;
