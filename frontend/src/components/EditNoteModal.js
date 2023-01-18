import React, { useState, useContext } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import NoteContext from "../context/NoteContext";

const EditNoteModal = (props) => {
    const { show, handleClose, previousNote } = props;
    const { editNote } = useContext(NoteContext);
    const [note, setNote] = useState({ title: "", body: "", tag: "" });
    const [warning, setWarning] = useState(undefined);

    const handleFormSubmit = (e) => {
        e.preventDefault();

        const regex = /^\s*$/;

        if (
            note.title.match(regex) ||
            note.body.match(regex) ||
            note.tag.match(regex)
        ) {
            setWarning("Please fill all the fields");
            return;
        }

        handleClose();
        setWarning(undefined);
        editNote(previousNote._id, note.title, note.body, note.tag);
    };

    const handleOnChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value });
    };

    return (
        <>
            <Modal
                show={show}
                onHide={() => {
                    handleClose();
                    setWarning(undefined);
                }}
            >
                <Modal.Header closeButton>
                    <Modal.Title
                        style={{ color: `${warning ? "red" : "black"}` }}
                    >
                        {warning || "Edit your note"}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="noteTitle">
                            <Form.Label>Title</Form.Label>
                            <Form.Control
                                type="text"
                                name="title"
                                placeholder={previousNote.title}
                                onChange={handleOnChange}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="noteBody">
                            <Form.Label>Body</Form.Label>
                            <Form.Control
                                type="text"
                                name="body"
                                placeholder={previousNote.body}
                                onChange={handleOnChange}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="noteTag">
                            <Form.Label>Tag</Form.Label>
                            <Form.Control
                                type="text"
                                name="tag"
                                placeholder={previousNote.tag}
                                onChange={handleOnChange}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        variant="secondary"
                        onClick={() => {
                            handleClose();
                            setWarning(undefined);
                        }}
                    >
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleFormSubmit}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default EditNoteModal;
