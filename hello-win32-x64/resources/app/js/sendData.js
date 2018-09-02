//let $ = require('jquery')



$("#index_warn_id").hide()
$("#send_data_btn").on('click',() =>{

    //hide the warnign 
    $("#index_warn_id").hide();
    

	let link = $("#link_id").val();
	let tag  = $("#tag_id").val();
	let time = new Date() ;

	console.log("link : " + link.length) ;
	if(link.trim().length != 0){ // if link is not null then send 
		console.log("link is null ");

		db.getAll('cred',(succ,data) =>{ 
		//console.log(data.length) ;
		//console.log(data);
		let mail = data[0].user ;
		let pw   = data[0].pass ;
	//  the data is already in json fromat dont need to parse
	console.log("sending : " + link + ' ' + tag + ' ' + time )
	
	$.post(send_data_url,{"mail": mail, "pw": pw ,"link":link,"tag":tag,"time":time},(data,status) =>{
		$("#link_id").val("");
		$("#tag_id").val("") ;
		//console.log('status : ' + status) ;
		//console.log('data   : ' + data) ;
	});	


})


	}else{

	   $("#index_warn_id").show();
	}



	
});

