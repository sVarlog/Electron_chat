const { app, BrowserWindow, ipcMain, Notification } = require("electron");
const path = require("path");
const isDev = !app.isPackaged;

const createWindow = () => {
    const browserWindow = new BrowserWindow({
        width: 1200,
        height: 800,
        backgroundColor: "white",
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
            preload: path.join(__dirname, "preload.js"),
        },
    });

    browserWindow.loadFile("index.html");

    isDev && browserWindow.webContents.openDevTools();
};

if (isDev) {
    require("electron-reload")(__dirname, {
        electron: path.join(__dirname, "node_modules", ".bin", "electron"),
    });
}

app.whenReady().then(() => {
    createWindow();
});

ipcMain.on("notify", (e, msg) => {
    new Notification({ title: "Notification", body: msg }).show();
});

ipcMain.on("app-quit", () => {
    app.quit();
});

app.on("window-all-closed", () => {
    if (process.platform === "darwin") {
        app.quit();
    }
});

app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});
