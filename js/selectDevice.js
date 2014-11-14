	function init(){
	  var windowWidth = window.innerWidth;
	  var windowHeight = window.innerHeight;	  	  	
	  	  
  	  var _temp_dialog_ = document.createElement('div');	
  	  
  	  _temp_dialog_.setAttribute('id','_temp_dialog_');
  	  _temp_dialog_.setAttribute('style',''+
  	  		'display:block;'+
  	  		'opacity:0.8;'+
  	  		'background-color:black;'+
  	  		'position:absolute;'+
  	  		'z-index:999;'+
  	  		'top:0px;'+
  	  		'left:0px;'+
  	  '');
  	  _temp_dialog_.style.width = windowWidth +'px';
  	  _temp_dialog_.style.height = windowHeight +'px';
  	  
  	  var _device_list_ = document.createElement('div');
  	  
  	  _device_list_.setAttribute('style',''+
  	  		'display:block;'+
  	  		'background-color:white;'+
  	  		'position:relative;'+
  	  		'overflow-x:hidden;'+
  	  		'overflow-y:auto;'+
  	  		'opacity:1;'+
  	  '');
  	  
  	  _device_list_.style.width = (windowWidth * 0.75) +'px'; 
  	  
  	  _device_list_.style.height = (windowHeight * 0.75) +'px';
  	  
  	  _device_list_.style.top = (windowHeight/2 - (windowHeight * 0.75)/2)+'px';
  	  
  	  _device_list_.style.left = (windowWidth/2 - (windowWidth*0.75)/2)+'px';
  	  
  	  _device_list_.innerHTML = "<ul id='_device_list_ul_' style='position:relative;list-style-type:none;text-align:center;margin-top:5px;width:100%;background-color:white'></ul>";
  	  
  	  _temp_dialog_.appendChild(_device_list_);
  	  
  	  var _temp_dialog_close_ = document.createElement('div');
  	  
  	  _temp_dialog_close_.setAttribute("style",''+
  	  		'display:block;'+
  	  		'position:absolute;'+
  	  		'z-index:1000;'+
  	  		'color:red;'+
  	  		'top:5px;'+
  	  		'right:5px;'+
  	  		'opacity:1;'+
  	  '');
  	  
  	  _temp_dialog_close_.innerHTML ="X";
  	  _temp_dialog_close_.onclick =function(){
	  	  document.body.removeChild(_temp_dialog_);
  	  }
  	  _temp_dialog_.appendChild(_temp_dialog_close_);
  	  document.body.appendChild(_temp_dialog_);
  }
  
  
  function selectDevice(callback){
  	init();
  	$.ajax({
		async: true,
		url: "http://192.168.1.108:8080/server",
		type: "get",
		dataType: "jsonp",
		jsonp: "callback",
		
		data:{
			"key" : "1234",
			"address" : "local",
			"resource" : "/devices/nearby",
			"operation" : "read",
			"settings" : "low latency"
		},

		beforeSend: function() {

		},
		
		success: function(data) {
			console.log('data  '+JSON.stringify(data));
			var _device_list_ul_ = document.getElementById('_device_list_ul_');
			
			var devices = data['devices'];
			
			var htmlStr = "";
			
			for(var i=0;i<devices.length;i++){
				var device = devices[i];
				
				var li_element = document.createElement('li');
				
				li_element.setAttribute('style', 'float:left;width:90%;margin:0 auto;text-align:left;border-bottom:1px solid #ccc;height:70px;');
				(function(device,callback){	
					li_element.onclick = function(){
						DEVICEADDRESS = device.address;
						if(callback){
							callback(device.address);
						}
						
						document.body.removeChild(document.getElementById('_temp_dialog_'));
					}
				})(device,callback);
				li_element.innerHTML = '<h5>'+device.name+'</h5>'+'<p>'+device.address+'</p>';
				
				_device_list_ul_.appendChild(li_element);
			}
		},
		
		complete: function(request, textStatus) {
			console.log('textStatus '+textStatus);
		},
		
		error: function(error) {
			console.log('errorCode '+JSON.stringify(error));
		}
	});		  
}
