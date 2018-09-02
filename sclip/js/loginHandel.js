$ = require("jquery")
let db = require('electron-db');
var { ipcRenderer  } = require('electron')




let user_name;

// menu
   
//

// hide progress 
$(".progress").hide();
// is a user is already logged in 
db.getAll('_data', (succ, data) => {

	try {
		user_name = data[0].user;
	} catch (err) {
		console.log(err);
	}
	//  the data is already in json fromat dont need to parse
})

if (user_name != null) {
	ipcRenderer.send('login-success');
}
///




$("#login_btn").on("click", function () {

	var user = $("#user").val();
	var pass = $("#pass").val();

 
    // sctivate progress bar 
    $(".progress").show();

	// need to validate is the user name and pass is really valid 

	$.ajaxSetup({
		cache: false,
		timeout: 5000,
		error: function (XMLHttpRequest, textStatus, errorThrown) {
			console.log("error is connection ");
			$("#hint_id").html("Check your internet connection");
		}
	});
	$.post(login_url, { "mail": user, "pw": pass }, (data, status) => {


		if (data == user + pass) {
			//console.log("credential correct");



			// clear previos data



			// insert new data

			let obj = new Object();
			obj.user = user;
			obj.pass = pass;
			obj.extra = "null";

			db.insertTableContent('_data', obj, (succ, msg) => {

				//console.log('success : ' + succ);
				//console.log('message : ' + msg );
			})
           
			ipcRenderer.send('login-success');
		} else {
			//console.log("credential incorrect");
			$(".progress").hide();
			$("#hint_id").html("email or password incorrect ");
			
		}
	})

	// inseting data to table 






})