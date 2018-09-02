const db = require('electron-db') ;


// creating db 

/*db.createTable('111',(succ,msg) =>{
	console.log('success : ' +succ) ;
	console.log('message : ' + msg) ;
})*/


// inseting data to table 

let obj = new Object();
obj.user = "istiak" ;
obj.pass = "istiak" ;
obj.extra = "link data ";

db.insertTableContent('111',obj,(succ,msg) =>{

	console.log('success : ' + succ);
	console.log('message : ' + msg );
})

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
})*/


// search data

/*let term = "oh";
 
db.search('customers', 'name', term, (succ, data) => {
  if (succ) {
    console.log(data);
  }
});
 */

 // delete record 

/* db.deleteRow('cred', {"user":"istiak"}, (succ, msg) => {
  console.log(msg);
});*/
// get all 

/*db.getAll('cred',(succ,data) =>{ 
	console.log(data.length) ;
	console.log(data);
	//  the data is already in json fromat dont need to parse
}) 
 */