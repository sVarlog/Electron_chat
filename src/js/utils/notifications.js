export const Notifications = {
    setup() {
        if (!("Notification" in window)) {
            console.error("This window doesn't support notification!");
        } else if (Notification.permission === "granted") {
            return;
        } else if (Notification.permission !== "denied") {
            Notification.requestPermission().then((permission) => {
                if (permission === "granted") {
                    console.log("Permission has been granted");
                }
            });
        }
    },
    show({ title, body }) {
        new Notification(title, { body });
    },
};
