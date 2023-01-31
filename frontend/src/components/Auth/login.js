import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import AlertContext from "../../context/AlertContext";

const Login = () => {
    const [emailText, setEmialText] = useState({ value: "", show: false });
    const [passText, setPassText] = useState({ value: "", show: false });
    const { setAlertProperties } = useContext(AlertContext);
    const navigate = useNavigate();

    const handleOnClick = async (e) => {
        e.preventDefault();
        if (emailText.value === "" || passText.value === "") {
            if (emailText.value === "") {
                setEmialText({ value: "", show: true });
            }
            if (passText.value === "") {
                setPassText({ value: "", show: true });
            }
            return;
        }

        const response = await fetch("http://localhost:5000/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: emailText.value,
                password: passText.value,
            }),
        });

        const json = await response.json();

        if (json.success) {
            localStorage.setItem("token", json.authToken);
            navigate("/");
            setAlertProperties(true, "success", "Logged in Successfully");
        } else {
            setAlertProperties(true, "danger", json.error);
        }
    };

    const handleEmail = (e) => {
        setEmialText({ value: e.target.value, show: false });
    };

    const handlePass = (e) => {
        setPassText({ value: e.target.value, show: false });
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
                <h1 className="text-center mb-4">Login</h1>
                <Form>
                    <Form.Group className="mb-3" controlId="email">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="Enter email"
                            onChange={handleEmail}
                        />
                        <Form.Text
                            style={{
                                display: emailText.show ? "block" : "none",
                                color: "red",
                            }}
                        >
                            Please enter some value
                        </Form.Text>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Password"
                            onChange={handlePass}
                        />
                        <Form.Text
                            style={{
                                display: passText.show ? "block" : "none",
                                color: "red",
                            }}
                        >
                            Please enter some value
                        </Form.Text>
                    </Form.Group>
                    <Button
                        variant="primary"
                        type="submit"
                        onClick={handleOnClick}
                        style={{
                            display: "block",
                            margin: "auto",
                            paddingLeft: "40px",
                            paddingRight: "40px",
                        }}
                    >
                        Submit
                    </Button>
                </Form>
            </div>
        </div>
    );
};

export default Login;
