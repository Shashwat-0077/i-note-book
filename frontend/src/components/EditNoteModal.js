import React, { useContext, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import NoteContext from "../context/NoteContext";

const EditNoteModal = (props) => {
    const { show, setShow, previousNote, setPreviousNote } = props;
    const { editNote } = useContext(NoteContext);
    const [warning, setWarning] = useState(undefined);

    const handleOnChange = (e) => {
        setPreviousNote({ ...previousNote, [e.target.name]: e.target.value });
    };

    const handleFormSubmit = () => {
        const regex = /^\s*$/;

        if (
            previousNote.title.match(regex) ||
            previousNote.body.match(regex) ||
            previousNote.tag.match(regex)
        ) {
            setWarning("Please fill all the fields");
            return;
        }

        setShow(false);
        editNote(
            previousNote._id,
            previousNote.title,
            previousNote.body,
            previousNote.tag
        );
    };

    return (
        <Modal
            show={show}
            onHide={() => {
                setShow(false);
            }}
        >
            <Modal.Header closeButton>
                <Modal.Title>{warning || "Edit Note"}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3" controlId="noteTitle">
                        <Form.Label>Title</Form.Label>
                        <Form.Control
                            type="text"
                            name="title"
                            value={previousNote.title}
                            onChange={handleOnChange}
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="noteBody">
                        <Form.Label>Body</Form.Label>
                        <Form.Control
                            type="text"
                            name="body"
                            value={previousNote.body}
                            onChange={handleOnChange}
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="noteTag">
                        <Form.Label>Tag</Form.Label>
                        <Form.Control
                            type="text"
                            name="tag"
                            value={previousNote.tag}
                            onChange={handleOnChange}
                            required
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button
                    variant="secondary"
                    onClick={() => {
                        setShow(false);
                    }}
                >
                    Close
                </Button>
                <Button variant="primary" onClick={handleFormSubmit}>
                    Save Changes
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default EditNoteModal;
