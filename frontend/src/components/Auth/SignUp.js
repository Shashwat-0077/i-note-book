import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import AlertContext from "../../context/AlertContext";

const SignUp = () => {
    const [creds, setCreds] = useState({ name: "", email: "", password: "" });
    const navigate = useNavigate();
    const { setAlertProperties } = useContext(AlertContext);

    const handleOnSubmit = async (e) => {
        e.preventDefault();

        const response = await fetch("http://localhost:5000/auth/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: creds.name,
                email: creds.email,
                password: creds.password,
            }),
        });

        const json = await response.json();

        console.log(json);

        if (json.success) {
            localStorage.setItem("token", json.authToken);
            navigate("/");
            setAlertProperties(true, "success", "Registerd Successfully");
        } else {
            setAlertProperties(true, "danger", json.error);
        }
    };

    const onChange = (e) => {
        setCreds({ ...creds, [e.target.name]: e.target.value });
    };

    return (
        <div
            style={{
                minHeight: "calc(100vh - 100px)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "100vw",
            }}
        >
            <div
                style={{
                    width: "80%",
                    maxWidth: "400px",
                }}
            >
                <Form onSubmit={handleOnSubmit}>
                    <Form.Group className="mb-3" controlId="name">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter Name"
                            name="name"
                            value={creds.name}
                            onChange={onChange}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="email">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="Enter email"
                            name="email"
                            value={creds.email}
                            onChange={onChange}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Password"
                            name="password"
                            value={creds.password}
                            onChange={onChange}
                        />
                    </Form.Group>

                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
            </div>
        </div>
    );
};

export default SignUp;
