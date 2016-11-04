const { app, BrowserWindow, ipcMain } = require('electron');
const Forge = require('DiscordForge');
let win;

function createWindow() {
  win = new BrowserWindow({ width: 1024, height: 576, frame: false, titleBarStytle: "hidden", title: "DiscordLite" });
  win.loadURL(`file://${__dirname}/app/index.html`);
  console.log(win.webContents);
  win.on('closed', () => {
    win = null
  });
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (win === null) {
    createWindow();
  }
});
