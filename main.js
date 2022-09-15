const { app, BrowserWindow, Notification } = require("electron");

const createWindow = () => {
    const browserWindow = new BrowserWindow({
        width: 1200,
        height: 800,
        backgroundColor: "white",
        webPreferences: {
            nodeIntegration: true,
        },
    });

    browserWindow.loadFile("index.html");

    browserWindow.webContents.openDevTools();
};

app.whenReady().then(() => {
    createWindow();
    const notification = new Notification({
        title: "Hello World",
        body: "My test message",
    });
    notification.show();
});

app.on("window-all-closed", () => {
    if (process.platform === "darwin") {
        console.log("close");
        app.quit();
    }
});

app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});
