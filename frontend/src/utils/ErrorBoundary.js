import React from "react";
import Alert from "react-bootstrap/Alert";

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: {} };
    }

    static getDerivedStateFromError(error) {
        // Update state so the next render will show the fallback UI.

        return { hasError: true, error: error };
    }

    render() {
        if (this.state.hasError) {
            // You can render any custom fallback UI
            return (
                <div className="container">
                    <h1 style={{ color: "#dc3545" }}>
                        Error : {this.state.error.message}
                    </h1>

                    <Alert key={"danger"} variant={"danger"}>
                        {this.state.error.stack}
                    </Alert>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
