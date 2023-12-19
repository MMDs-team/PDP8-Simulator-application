const { app, BrowserWindow, Menu } = require('electron')

require('electron-reload')(__dirname, {
  // Note that the path to electron may vary according to the main file
  electron: require(`${__dirname}/node_modules/electron`)
});


const path = require('node:path')

function createWindow () {
  const win = new BrowserWindow({
    width: 1300,
    height: 900,
    webPreferences: {
      nodeIntegration: true,
      
      preload: path.join(__dirname, 'preload.js')
    }
  })

  win.loadFile('index.html')
  win.openDevTools()
}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})