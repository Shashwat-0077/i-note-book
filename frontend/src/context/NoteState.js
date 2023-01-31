import { useState, useContext } from "react";
import NoteContext from "./NoteContext";
import AlertContext from "./AlertContext";

const NoteState = (props) => {
    const [notes, setNotes] = useState([]);
    const { setAlertProperties } = useContext(AlertContext);

    const host = "http://localhost:5000";
    const userToken = localStorage.getItem("token");

    //GET NOTES
    const getAllNotes = async () => {
        const response = await fetch(`${host}/notes/fetchallnotes`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "auth-token": userToken,
            },
        });

        const json = await response.json();
        setNotes(json);
    };

    // ADD NOTES
    const addNote = async (title, body, tag) => {
        const response = await fetch(`${host}/notes/createnote`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "auth-token": userToken,
            },
            body: JSON.stringify({ title, body, tag }),
        });

        const note = await response.json();
        setNotes(notes.concat(note));
        setAlertProperties(true, "success", "Note is Added");
    };

    //DELETE NOTES
    const deleteNote = async (id) => {
        await fetch(`${host}/notes/deletenote/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "auth-token": userToken,
            },
        });

        setNotes(notes.filter((note) => note._id !== id));
        setAlertProperties(true, "danger", "Note is deleted");
    };

    //EDIT NOTES
    const editNote = async (id, title, body, tag) => {
        await fetch(`${host}/notes/editnote/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "auth-token": userToken,
            },
            body: JSON.stringify({ title, body, tag }),
        });

        for (let index = 0; index < notes.length; index++) {
            const element = notes[index];
            if (element._id === id) {
                element.title = title;
                element.body = body;
                element.tag = tag;
            }
        }
        setAlertProperties(true, "primary", "Note is edited");
    };

    return (
        <NoteContext.Provider
            value={{
                notes,
                setNotes,
                addNote,
                deleteNote,
                editNote,
                getAllNotes,
            }}
        >
            {props.children}
        </NoteContext.Provider>
    );
};

export default NoteState;
