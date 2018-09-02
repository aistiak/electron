self.addEventListener('message',function(e){
	var message = 'data updated !' ;



   // fetch data 

   $.ajaxSetup({ cache: false }); // preventing catch data
	try{
		$.get("http://www.istiak.net/s_clip/data/sample.php",{"mail":"istiak","pw":"istiak"},function(data,status){


		var ul = $("#list_id") ;
        // update the list after getting response
        var arr = JSON.parse(data.toString());

        // add all the link to the list in UI
        for(var i = 0 ; i<arr.length ; i++){
        	var li = $("<li>") ;
        	li.html(arr[i].link) ;
        	ul.append(li);
        }


    })
	}catch(err){
		console.log(err);
		self.postMessage(err) ;
	}





    // post ACK message 
	self.postMessage(message) ;

	self.close();
})