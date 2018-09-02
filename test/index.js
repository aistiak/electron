let {app , BrowserWindow} = require('electron') ;


function loadWindow(){

	win = new BrowserWindow({height:500,width:500})

}


app.on('ready',loadWindow);