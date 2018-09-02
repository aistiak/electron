let $ = require("jquery")
let db = require('electron-db') ;
let {ipcRenderer} = require('electron')


var temp_store  = " ";	// using a flag storage 

// at first populate the list from database 
//set user name on top 

//


// load options menu 


//

let r_flag = 0 ;

db.getAll('cred',(succ,data) =>{ 
  //console.log(data.length) ;
  //console.log(data);
//  the data is already in json fromat dont need to parse
if(succ){
  var ul = $("#list_id") ;
      // update the list after getting response
      var arr = JSON.parse(data[0].extra) ;       

      // add all the link to the list in UI
      for(var i = 0 ; i<arr.length ; i++){
        var li = $("<li>") ;
        li.addClass("list-group-item");
        
        var time = $("<h6>") ;
        time.html(arr[i].time);
        
        var tag  = $("<h6>") ;
        tag.html(arr[i].tag) ;
        
        var link = $("<h6>") ;
        link.html(arr[i].link); 

        var cpy_btn = $("<button>");
        cpy_btn.html("copy link ");
        cpy_btn.addClass("form-control") ;

        var div  = $("<div>") ; 
        div.addClass("from-group") ;  
        
        div.append(cpy_btn) ;

        //li.html(arr[i].link) ;
        li.append(time);
        li.append(tag);
        li.append(link);
        li.append(div);


        ul.append(li);
      }

      $(".progress").hide();

    }

  })



// get user & pass from db

let user_name ;
let passwd ;
db.getAll('cred',(succ,data) =>{ 
  //console.log(data[0].user) ;
  user_name  = data[0].user ;
  passwd     = data[0].passwd ;
   //  the data is already in json fromat dont need to parse
 })

 // hide progress bar after data has loaded 

setInterval(call,3000);	

function call(){	
  $.ajaxSetup({
    cache: false,
    timeout: 2000,
    error: function (XMLHttpRequest, textStatus, errorThrown) {
      console.log("error is connection ");
      $("#user_name").html("offline ( " + user_name + " ) ");

    }
  });
  try{
   $.post(get_data_url,{"mail":user_name,"pw":passwd},function(data,status){
     $("#user_name").html("online ( " + user_name + " ) ");
     if(temp_store == data.toString()) {
     //console.log('data same ') ;
     return ;
   }else{
     temp_store = data.toString();
     //console.log('data changed') ;
        // store the data (link tag and time )in database 
        // update row 
        let where = {
          "user": user_name  
        };

        let set = {
          "extra" : temp_store 
        }

        db.updateRow('cred',where,set,(succ,msg) =>{

          //console.log('success : '+ succ) ;
          //console.log('message : ' + msg) ;
        })




      }

      var ul = $("#list_id") ;
      ul.empty();
      // update the list after getting response
      var arr = JSON.parse(data.toString());

      // add all the link to the list in UI
      for(var i = 0 ; i<arr.length ; i++){
      	var li = $("<li>") ;
        li.addClass("list-group-item");
        
        var time = $("<h6>") ;
        time.html(arr[i].time);
        
        var tag  = $("<h6>") ;
        tag.html(arr[i].tag) ;
        
        var link = $("<h6>") ;
        link.html(arr[i].link); 

        var cpy_btn = $("<button>");
        cpy_btn.html("copy link ");
        cpy_btn.addClass("form-control") ;

        var div  = $("<div>") ; 
        div.addClass("from-group") ;  
        
        div.append(cpy_btn) ;

        //li.html(arr[i].link) ;
        li.append(time);
        li.append(tag);
        li.append(link);
        li.append(div);


        ul.append(li);
      }

      $(".progress").hide();


    })
 }catch(err){
   console.log(err);
 }
}	


// logout handeler 

$("#logout_btn").on('click',() =>{

 var user ;

 db.getAll('cred',(succ,data) =>{
  user = data[0].user ;
})

 // delete the stored username & password 
 db.deleteRow('cred', {'user':user}, (succ, msg) => {
  //console.log(msg);
});

 //goto login screen again 
 ipcRenderer.send('logout-success');

})

$(document).ready(function(){

  $("ul").on("click","button",function(e){
    e.preventDefault();

            // get the link text 
            var  link = $(this).parent().parent().children()[2] ;
            var text = $(link).text();
            console.log(text); 



            // copy to clipboard 
            const el = document.createElement("textarea");
            el.value = text ;
            document.body.appendChild(el);
            el.select();
            document.execCommand("copy");
            document.body.removeChild(el);


          });
});