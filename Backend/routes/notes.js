const express = require("express");
const { detectError } = require("../utils/detectError");
const { validateNote } = require("../utils/JoiSchema");
const fetchUser = require("../middleware/fetchUser");
const Note = require("../models/Note");

const router = express.Router();

router.get(
    "/fetchallnotes",
    fetchUser,
    detectError(async (req, res, next) => {
        const { noteID } = req.params;
        const notes = await Note.find({ author: req.user.id });

        if (!notes) return res.send("Cannot find the notes by the given ID");

        res.send(notes);
    })
);

router.post(
    "/createnote",
    validateNote,
    fetchUser,
    detectError(async (req, res, next) => {
        const { title, body, tag } = req.body;
        const { id: userID } = req.user;

        let newNote = new Note({
            title: title,
            body: body,
            tag: tag,
            author: userID,
        });

        await newNote.save();

        res.send(newNote);
    })
);

router.put(
    "/editnote/:noteID",
    validateNote,
    fetchUser,
    detectError(async (req, res, next) => {
        const { noteID } = req.params;
        const { title, body, tag } = req.body;

        const note = await Note.findById(noteID);
        if (!note) {
            return res.status(404).send("Not Found");
        }
        if (note.author.toString() !== req.user.id) {
            return res.status(401).send("You are not authorized to do that");
        }

        if (title) note.title = title;
        if (body) note.body = body;
        if (tag) note.tag = tag;

        const savedNote = await note.save();
        res.send(savedNote);
    })
);

router.delete(
    "/deletenote/:noteID",
    fetchUser,
    detectError(async (req, res, next) => {
        const { noteID } = req.params;

        const note = await Note.findById(noteID);
        if (!note) {
            return res.status(404).send("Not Found");
        }
        if (note.author.toString() !== req.user.id) {
            return res.status(401).send("You are not authorized to do that");
        }

        await Note.findByIdAndRemove(noteID);

        res.send("Deleted");
    })
);

module.exports = router;
