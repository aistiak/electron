let $ = require('jquery')  // jQuery now loaded and assigned to $
let count = 0
$('#txt').text(count.toString())
$('#btn_id').on('click', () => {
   count ++ 
   $('#txt').text(count)
}) 