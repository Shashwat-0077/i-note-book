import Alert from "react-bootstrap/Alert";
import { useContext } from "react";
import AlertContext from "../context/AlertContext";

function MyAlert() {
    const context = useContext(AlertContext);
    const { alertShow, alertMessage, alertType, setAlertShow } = context;

    if (alertShow) {
        return (
            <Alert
                variant={alertType}
                onClose={() => setAlertShow(false)}
                dismissible
            >
                {alertMessage}
            </Alert>
        );
    }
    return <></>;
}

export default MyAlert;
