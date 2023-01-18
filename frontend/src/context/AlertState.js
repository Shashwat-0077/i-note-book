import { useState } from "react";
import AlertContext from "./AlertContext";

const AlertState = (props) => {
    const [alertType, setAlertType] = useState("danger");
    const [alertMessage, setAlertMessage] = useState("");
    const [alertShow, setAlertShow] = useState(false);

    const setAlertProperties = (
        show = false,
        type = "danger",
        message = ""
    ) => {
        setAlertShow(show);
        setAlertType(type);
        setAlertMessage(message);

        if (show === true) {
            setTimeout(() => {
                setAlertShow(false);
            }, 3000);
        }
    };

    return (
        <AlertContext.Provider
            value={{
                alertShow,
                alertMessage,
                alertType,
                setAlertShow,
                setAlertProperties,
            }}
        >
            {props.children}
        </AlertContext.Provider>
    );
};

export default AlertState;
