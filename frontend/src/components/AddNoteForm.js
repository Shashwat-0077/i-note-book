import React, { useContext, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import NoteContext from "../context/NoteContext";
import AlertContext from "../context/AlertContext";

const AddNoteForm = () => {
    const { setAlertProperties } = useContext(AlertContext);
    const { addNote } = useContext(NoteContext);

    const [note, setNote] = useState({ title: "", body: "", tag: "" });

    const handleFormSubmit = (e) => {
        e.preventDefault();

        const regex = /^\s*$/;

        if (
            note.title.match(regex) ||
            note.body.match(regex) ||
            note.tag.match(regex)
        ) {
            setAlertProperties(true, "danger", "Please fill all the fields");
            return;
        }

        addNote(note.title, note.body, note.tag);
    };

    const handleOnChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value });
    };

    return (
        <>
            <h1>Add a note</h1>
            <Form>
                <Form.Group className="mb-3" controlId="noteTitle">
                    <Form.Label>Title</Form.Label>
                    <Form.Control
                        type="text"
                        name="title"
                        placeholder="Enter Title"
                        onChange={handleOnChange}
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="noteBody">
                    <Form.Label>Body</Form.Label>
                    <Form.Control
                        type="text"
                        name="body"
                        placeholder="Enter Body"
                        onChange={handleOnChange}
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="noteTag">
                    <Form.Label>tag</Form.Label>
                    <Form.Control
                        type="text"
                        name="tag"
                        placeholder="Enter Tag"
                        onChange={handleOnChange}
                    />
                </Form.Group>

                <Button
                    variant="primary"
                    type="submit"
                    onClick={handleFormSubmit}
                >
                    Submit
                </Button>
            </Form>
        </>
    );
};

export default AddNoteForm;
