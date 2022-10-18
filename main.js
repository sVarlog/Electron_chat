const { app, BrowserWindow, ipcMain, Notification, Menu } = require("electron");
const path = require("path");
const isDev = !app.isPackaged;

const createWindow = () => {
    const browserWindow = new BrowserWindow({
        width: 1200,
        height: 800,
        backgroundColor: "#6e707e",
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

if (isDev) {
    app.whenReady()
        .then(() => require("electron-devtools-installer"))

        .then(({ default: installExtension, REDUX_DEVTOOLS }) =>
            installExtension(REDUX_DEVTOOLS, {
                loadExtensionOptions: {
                    allowFileAccess: true,
                },
            })
        )
        .catch((e) => console.error("Failed install extension:", e));
}

app.whenReady().then(async () => {
    const template = require("./utils/Menu").createTemplate(app);
    const menu = Menu.buildFromTemplate(template);
    Menu.setApplicationMenu(menu);
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
