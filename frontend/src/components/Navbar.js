import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { Link, useLocation, useNavigate } from "react-router-dom";
import React, { useContext } from "react";
import AlertContext from "../context/AlertContext";

function NavScrollExample() {
    const location = useLocation();
    const navigate = useNavigate();
    const { setAlertProperties } = useContext(AlertContext);

    const handleLogout = () => {
        localStorage.removeItem("token");
        setAlertProperties(true, "success", "Successfully Logged Out");
        navigate("/login");
    };

    const handleNavHome = () => {
        if (localStorage.getItem("token")) {
            navigate("/");
        } else {
            setAlertProperties(
                true,
                "danger",
                "You must be logged in to do that"
            );
        }
    };

    return (
        <Navbar bg="dark" variant="dark" expand="lg" className="sticky-top">
            <Container fluid>
                <Link to="/" className="navbar-brand">
                    INoteBook
                </Link>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Nav
                        className="me-auto my-2 my-lg-0"
                        style={{ maxHeight: "100px" }}
                        navbarScroll
                    >
                        <div
                            style={{ cursor: "pointer" }}
                            className={`nav-link ${
                                location.pathname === "/" ? "active" : ""
                            }`}
                            onClick={handleNavHome}
                        >
                            Home
                        </div>

                        <Link
                            to="/about"
                            className={`nav-link ${
                                location.pathname === "/about" ? "active" : ""
                            }`}
                        >
                            About
                        </Link>
                    </Nav>

                    {!localStorage.getItem("token") ? (
                        <>
                            <Link
                                className="btn btn-outline-light mx-2"
                                to="/login"
                            >
                                Login
                            </Link>
                            <Link
                                className="btn btn-outline-light"
                                to="/sign-up"
                            >
                                Sign Up
                            </Link>{" "}
                        </>
                    ) : (
                        <button
                            className="btn btn-light"
                            onClick={handleLogout}
                        >
                            Logout
                        </button>
                    )}
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavScrollExample;
