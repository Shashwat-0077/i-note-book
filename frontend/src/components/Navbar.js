import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link, useLocation } from "react-router-dom";

function NavScrollExample() {
    const location = useLocation();

    return (
        <Navbar bg="dark" variant="dark" expand="lg     ">
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
                        <Link
                            to="/"
                            className={`nav-link ${
                                location.pathname === "/" ? "active" : ""
                            }`}
                        >
                            Home
                        </Link>

                        <Link
                            to="/about"
                            className={`nav-link ${
                                location.pathname === "/about" ? "active" : ""
                            }`}
                        >
                            About
                        </Link>
                    </Nav>
                    <Form className="d-flex">
                        <Form.Control
                            type="search"
                            placeholder="Search"
                            className="me-2"
                            aria-label="Search"
                        />
                        <Button variant="outline-success">Search</Button>
                    </Form>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavScrollExample;
