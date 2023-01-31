import React, { useContext } from "react";
import Card from "react-bootstrap/Card";
import NoteContext from "../context/NoteContext";

const NoteItem = (props) => {
    const { note, updateNote } = props;
    const { deleteNote } = useContext(NoteContext);

    return (
        <div className="col-md-3 mt-3">
            <Card style={{ width: "18rem" }}>
                <Card.Body>
                    <Card.Title>{note.title}</Card.Title>
                    <Card.Text>{note.body}</Card.Text>
                    <i
                        className="fa-solid fa-pen-to-square"
                        onClick={() => {
                            updateNote(note);
                        }}
                    ></i>
                    <i
                        className="fa-regular fa-trash-can mx-3"
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
