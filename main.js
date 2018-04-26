const electron = require('electron')
// Module to control application life.
const app = electron.app
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow

const path = require('path')
const url = require('url')

const ejse = require('ejs-electron')

const fs = require('fs');
const config = JSON.parse(fs.readFileSync('config.json'))

//Accelerators - global shorcut module
const GlobalShortcut = electron.globalShortcut

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

function createWindow () {
    
  //instantiate express
  app.server = require(__dirname + '/app')()
    
  // Create the browser window.
  mainWindow = new BrowserWindow({width: 1200, height: 800, resizable: false, titleBarStyle: "hidden"})

  // and load the index.html of the app.
  mainWindow.loadURL("http://"+config.server.host+":"+config.server.port);
    
  mainWindow.setFullScreen(true);

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
app.on('ready', function(){
    
    //create window
    createWindow()
    
    GlobalShortcut.register('Esc', () => {
        mainWindow.setFullScreen(false)
    })
    
    GlobalShortcut.register('Control+F', () => {
        mainWindow.setFullScreen(true)
    })
    
    //create custom menu
    require('./customMenu')(mainWindow)
    
})

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
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

//app.listen(3000, "localhost");