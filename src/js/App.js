import React from "react";

export const App = () => {
    const title = "Hello World!";
    const enchancedTitle = title + " - React App!";

    const sendNotification = () => {
        electron.notificationApi.sendNotification("This is msg");
    };

    return (
        <>
            <h1>{enchancedTitle}</h1>
            <button onClick={sendNotification}>Send Notification</button>
        </>
    );
};
