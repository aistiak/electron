/*const sqlite3 = require('sqlite3');

var db = new sqlite3.Database('data.db');


db.serialize(function(){
	db.run('create table if not exists  data (mail,pass)');

	//db.run('insert into data values ("arif","arif")');

	db.each('select * from data',function(err,row){
        console.log(row);
	});
});*/

const db = require('electron-db') ;
const electron = require('electron') ;
const app = electron.app ;

// creating db 

/*db.createTable('_data',(succ,msg) =>{
	console.log('success : ' +succ) ;
	console.log('message : ' + msg) ;
})
*/
// inseting data to table 

/*let obj = new Object();
 
obj.name = "Ale"
obj.address = "Pac"
 
db.insertTableContent('_data', obj, (succ, msg) => {
  // succ - boolean, tells if the call is successful
  console.log("Success: " + succ);
  console.log("Message: " + msg);
})*/

// get row 

/*db.getRows('cred',{user:"istiak"},(succ,result) =>{

	console.log('success : ' + succ) ;
	console.log(result) ;
})*/ 

// update row 

/*let where = {
	"user":"istiak" 
};

let set = {
	"pass" : "1234"
}

db.updateRow('cred',where,set,(succ,msg) =>{

	console.log('success : '+ succ) ;
	console.log('message : ' + msg) ;
})
*/

// search data

/*let term = "oh";
 
db.search('customers', 'name', term, (succ, data) => {
  if (succ) {
    console.log(data);
  }
});
 */

 // delete record 

/* db.deleteRow('data', {"user":"istiak"}, (succ, msg) => {
  console.log(msg);
});*/
// get all 

db.getAll('_data',(succ,data) =>{ 
	console.log(data.length) ;
	console.log(data);
	//  the data is already in json fromat dont need to parse
}) 
 