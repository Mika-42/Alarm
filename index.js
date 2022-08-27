"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
const path_1 = __importDefault(require("path"));
let mainWindow;
const createWindow = () => {
    mainWindow = new electron_1.BrowserWindow({
        width: 550,
        height: 620,
        minWidth: 550,
        minHeight: 620,
        frame: false,
        webPreferences: {
            preload: path_1.default.join(__dirname, 'renderer.js'),
        },
    });
    //mainWindow.webContents.openDevTools();
    mainWindow.loadFile('index.html');
};
electron_1.app.whenReady().then(() => {
    createWindow();
    electron_1.app.on('activate', () => {
        if (electron_1.BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });
});
electron_1.ipcMain.on('CloseTheWindow', () => {
    electron_1.app.quit();
});
electron_1.ipcMain.on('MaxTheWindow', () => {
    if (mainWindow === null || mainWindow === void 0 ? void 0 : mainWindow.isMaximized()) {
        mainWindow.unmaximize();
    }
    else {
        mainWindow.maximize();
    }
});
electron_1.ipcMain.on('MinTheWindow', () => {
    mainWindow === null || mainWindow === void 0 ? void 0 : mainWindow.minimize();
});
