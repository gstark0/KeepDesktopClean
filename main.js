// Modules to control application life and create native browser window
const {app, BrowserWindow, Menu, Tray, dialog, nativeImage} = require('electron')
const path = require('path')

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow
var tray;

function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    title: 'Desky',
    width: 640, height: 360,
    resizable: false,
    maximizable: false,
    fullscreen: false,
    transparent: true,
    frame: false
  })

  
  if (process.platform !== 'darwin') {
    let p = path.join(__dirname, 'assets/icons/win/icon.png')
    let ni = nativeImage.createFromPath(p);
    tray = new Tray(ni)
  } else {
    let p = path.join(__dirname, 'assets/icons/mac/iconTemplate.png')
    let ni = nativeImage.createFromPath(p);
    tray = new Tray(ni)
  }
  const contextMenu = Menu.buildFromTemplate([
      {label: 'Clean now', type: 'normal', click: function() { mainWindow.webContents.send('clean') }},
      {label: 'Settings', type: 'normal', click: function() { mainWindow.show() }},
      {label: 'Quit', type: 'normal', click: function() { app.quit() }}
    ])
  tray.setToolTip('Simple and user-friendly desktop cleaner.')
  tray.setContextMenu(contextMenu)
  /*
  tray.on('click', () => {
    mainWindow.isVisible() ? mainWindow.hide() : mainWindow.show()
  })
  */

  // and load the index.html of the app.
  mainWindow.loadFile('index.html')

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })

}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  tray.destroy()
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    tray.
    app.quit()
  }
})

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
