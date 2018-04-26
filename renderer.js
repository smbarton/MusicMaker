// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

const BrowserWindow = require('electron').remote.BrowserWindow
const Dialog = require('electron').remote.dialog

const newWindowBtn = document.getElementById('new-window')

newWindowBtn.addEventListener('click', function (event) {
    let win = new BrowserWindow({ width: 400, height:320 })
    win.on('close', function () { win = null })
    win.loadURL('https://electron.atom.io/')
    win.show()
})

const dialogBtn = document.getElementById('dialog')

dialogBtn.addEventListener('click', function(event) {
    Dialog.showMessageBox({
        message: "Dialog Message"
    });
})