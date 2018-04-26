const {Menu, MenuItem} = require('electron')

//for acces to mainWindow
module.exports = function(mainWindow) {

    //custom menu for Reload and Fullscreen
    const template = [
        {
            label: 'File',
            submenu: [
                {
                    role: 'reload'
                },
                {
                    role: 'quit'
                }
            ]
        },
        {
            label: 'View',
            submenu: [
                {
                    label: 'Fullscreen',
                    accelerator: 'Control+F',
                    click: function() {
                        mainWindow.setFullScreen(true)
                    }
                },
                {
                    label: 'Exit Fullscreen',
                    accelerator: 'Esc',
                    click: function() {
                        mainWindow.setFullScreen(false)
                    }
                }
            ]
        },
//        {
//            label: 'Developer',
//            submenu: [
//                {
//                    role: 'toggledevtools'
//                }
//            ]
//        }
    ]

    const menu = Menu.buildFromTemplate(template)
    Menu.setApplicationMenu(menu)
}