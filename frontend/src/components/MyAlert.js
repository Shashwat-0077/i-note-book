import Alert from "react-bootstrap/Alert";
import { useContext, useEffect } from "react";
import AlertContext from "../context/AlertContext";

function MyAlert() {
    const context = useContext(AlertContext);
    const { alertShow, alertMessage, alertType, setAlertShow } = context;

    useEffect(() => {
        let timer = setTimeout(() => {
            setAlertShow(false);
        }, 3000);

        return () => {
            clearTimeout(timer);
        };
    });

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
