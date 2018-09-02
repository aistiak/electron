const {app , BrowserWindow } = require("electron") ;


function createWin(){

	win = new BrowserWindow({width:800 , height:500} )
	win.loadURL(`file://${__dirname}/index.html`);
	//win.loadFile("index.html")
	//win.loadURL('file://'+ __dirname + 'index.html')
}

app.on("ready",createWin)