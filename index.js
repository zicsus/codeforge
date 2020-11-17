const { app, BrowserWindow } = require('electron');

//require('electron-reload')(__dirname);

function createWindow () 
{
    const win = new BrowserWindow({
        width: 1000,
        height: 600,
        webPreferences: {
            nodeIntegration: true
        },
        menu: false
    });
    win.removeMenu();
    win.maximize();
    win.loadFile(`distribution/index.html`);
}

app.whenReady().then(createWindow);