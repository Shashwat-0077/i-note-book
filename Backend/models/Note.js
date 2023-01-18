const mongoose = require("mongoose");
const { Schema } = mongoose;

const NotesSchema = new Schema(
    {
        author: {
            type: Schema.Types.ObjectId,
            ref: "users",
            required: true,
        },

        title: {
            type: String,
            required: true,
        },

        body: {
            type: String,
            required: true,
        },
        tag: {
            type: String,
            default: "General",
        },
    },
    {
        timestamps: true,
    }
);

const Note = mongoose.model("note", NotesSchema);

module.exports = Note;
