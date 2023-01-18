import React, { useContext } from "react";
import NoteContext from "../context/NoteContext";
import Card from "react-bootstrap/Card";

const NoteItem = (props) => {
    const { note, handleUpdate } = props;
    const { deleteNote } = useContext(NoteContext);

    return (
        <div className="col-md-3 my-3">
            <Card className="h-100">
                <Card.Body>
                    <Card.Title>{note.title}</Card.Title>
                    <Card.Text>{note.body}</Card.Text>
                    <i
                        className="fa-solid fa-pen-nib px-2"
                        onClick={() => {
                            handleUpdate(note);
                        }}
                    ></i>
                    <i
                        className="fa-solid fa-trash-can px-2"
                        onClick={() => {
                            deleteNote(note._id);
                        }}
                    ></i>
                </Card.Body>
            </Card>
        </div>
    );
};

export default NoteItem;
