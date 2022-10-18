const {
    app,
    BrowserWindow,
    ipcMain,
    Notification,
    Menu,
    Tray,
} = require("electron");
const path = require("path");
const isDev = !app.isPackaged;

const docIcon = path.join(__dirname, "assets", "img", "react_app_logo.png");
const trayIcon = path.join(__dirname, "assets", "img", "react_icon.png");

const createWindow = () => {
    const browserWindow = new BrowserWindow({
        width: 1200,
        height: 800,
        backgroundColor: "#6e707e",
        show: false,
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
            preload: path.join(__dirname, "preload.js"),
        },
    });

    browserWindow.loadFile("index.html");

    isDev && browserWindow.webContents.openDevTools();

    return browserWindow;
};

const createSplashWindow = () => {
    const browserWindow = new BrowserWindow({
        width: 400,
        height: 200,
        frame: false,
        transparent: true,
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
        },
    });

    browserWindow.loadFile("splash.html");
    return browserWindow;
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

if (process.platform === "darwin") {
    app.dock.setIcon(docIcon);
}

let tray = null;

app.whenReady().then(async () => {
    const template = require("./utils/Menu").createTemplate(app);
    const menu = Menu.buildFromTemplate(template);
    Menu.setApplicationMenu(menu);

    tray = new Tray(trayIcon);
    tray.setContextMenu(menu);

    const splash = createSplashWindow();
    const mainApp = createWindow();

    mainApp.once("ready-to-show", () => {
        setTimeout(() => {
            splash.destroy();
            mainApp.show();
        }, 1500);
    });
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
