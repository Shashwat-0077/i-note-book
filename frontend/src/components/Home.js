import React from "react";
import Notes from "./Notes";
import AddNoteForm from "./AddNoteForm";

const Home = () => {

    return (
        <div className="container my-3">
            <AddNoteForm />
            <Notes />
        </div>
    );
};

export default Home;
