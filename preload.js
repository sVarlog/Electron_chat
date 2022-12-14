const { ipcRenderer, contextBridge } = require("electron");

contextBridge.exposeInMainWorld("electron", {
    notificationApi: {
        sendNotification(msg) {
            ipcRenderer.send("notify", msg);
        },
    },
    appApi: {
        quitApp() {
            ipcRenderer.send("app-quit");
        },
    },
});
