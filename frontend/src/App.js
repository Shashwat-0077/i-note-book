import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./components/Navbar";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import About from "./components/About";
import NoteState from "./context/NoteState";
import MyAlert from "./components/MyAlert";
import AlertState from "./context/AlertState";

function App() {
    return (
        <Router>
            <Navbar></Navbar>
            <AlertState>
                <MyAlert />
                <NoteState>
                    <Routes>
                        <Route exact path="/" element={<Home />} />
                        <Route exact path="/about" element={<About />} />
                    </Routes>
                </NoteState>
            </AlertState>
        </Router>
    );
}

export default App;
