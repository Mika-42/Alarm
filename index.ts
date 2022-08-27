/*
*@todo Keep it run in background
*/
import { app, BrowserWindow, ipcMain } from 'electron';
import path from "path";

let mainWindow: BrowserWindow;
const createWindow = (): void => {
    mainWindow = new BrowserWindow({
        width: 550,
        height: 620,
        minWidth: 550,
        minHeight: 620,
        frame: false,
        webPreferences: {
            preload: path.join(__dirname, 'renderer.js'),
        },
    });

    mainWindow.loadFile('index.html');
}

app.whenReady().then((): void => {
    createWindow()
    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    })
})

ipcMain.on('CloseTheWindow', (): void => {
    app.quit();
});

ipcMain.on('MaxTheWindow', (): void => {
    if (mainWindow?.isMaximized()) {
        mainWindow.unmaximize();
    } else {
        mainWindow.maximize();
    }
});

ipcMain.on('MinTheWindow', (): void => {
    mainWindow?.minimize();
});