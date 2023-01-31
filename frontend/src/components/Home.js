import React, { useContext, useEffect } from "react";
import Notes from "./Notes";
import AddNoteForm from "./AddNoteForm";
import AlertContext from "../context/AlertContext";
import { useNavigate } from "react-router-dom";

const Home = () => {
    const { setAlertProperties } = useContext(AlertContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (!localStorage.getItem("token")) {
            setAlertProperties(
                true,
                "danger",
                "You must be logged in to do that"
            );
            navigate("/login");
        }
    });

    return (
        <div className="container my-3">
            <AddNoteForm />
            <Notes />
        </div>
    );
};

export default Home;
