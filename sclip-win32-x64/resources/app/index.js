const {app, BrowserWindow ,ipcMain ,Menu  , MenuItem } = require('electron')


const electron = require('electron')

let db = require('electron-db') ;


let {ipcRenderer} = require('electron')

let debug = 1 ;

let $ = require('jquery') 

function createWindow () {
  	// display width 

    // Create the browser window.
    win = new BrowserWindow(
    {
     width: 300, 
     height: 400,
     x: 1060 ,
     y: 350,
     webPreferences: {
      nodeIntegrationInWorker: true
    }
  }
  )
    
    win.webContents.openDevTools();
    
    // load menu
    if(debug == 0){
    const template = [

          {
            label : 'options',
            submenu : [

                
                {
                    label : 'logout' , 
                    click(){
                       try{
                           
                          console.log("logout");
                       
                          var user ;
                          db.getAll('_data',(succ,data) =>{
                             user = data[0].user ;
                          })

                      // delete the stored username & password 
                          db.deleteRow('_data', {'user':user}, (succ, msg) => {
                      //console.log(msg);
                          });

                          win.loadFile('login.html');  
                       }catch(err){
                         console.log(err);
                       }
                    }
                },
                {
                   role : 'close' 
                }


            ]
          }
    ]

    const menu = Menu.buildFromTemplate(template)
    Menu.setApplicationMenu(menu) 
  }

    //
/*
    let menu = new Menu();
    menu.append(new MenuItem({ label : 'logout' , click(){console.log("pressed logout")}}))
    Menu.setApplicationMenu(menu);*/


    // and load the index.html of the app.
   // win.loadFile('login.html')
    win.loadURL(`file://${__dirname}/login.html`);


    // to show index.html or main view 
    ipcMain.on("login-success",function(){
    	//win.loadFile("index.html")
      win.loadURL(`file://${__dirname}/index.html`);

      //setInterval(getData,3000);
    })

    // to show login screen 
    ipcMain.on('logout-success',() =>{
      win.loadFile('login.html');
    })


  }

  app.on('ready', createWindow) ;
/*
appp.commandLine.appendSwitch('remote-debugging-port', '8315');
appp.commandLine.appendSwitch('host-rules', 'MAP * 127.0.0.1');

*/
