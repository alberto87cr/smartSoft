var body = document.getElementsByTagName("body")[0]; 
var datainit = body.getAttribute('data-init'); 
function addScripts(array,callback){  
	var d = new Date(); // se crea un objeto tipo fecha
	var funScripts = function(src,handler){  
		var scripts = document.createElement("script");  
		scripts.src = src+"?rnd="+d.getTime();  
		scripts.onload = scripts.onreadystatechange = function(){  
			scripts.onreadystatechange = scripts.onload = null;  
			if(/MSIE ([6-9]+\.\d+);/.test(navigator.userAgent))window.setTimeout(function(){handler();},8,this);  
			else handler();  
		}  
		var head = document.getElementsByTagName("head")[0];  
		(head || document.body).appendChild( scripts );  
	};  
	(function(){  
		if(array.length!=0){  
			funScripts(array.shift(),arguments.callee);  
		}else{  
			callback && callback();  
		}  
	})();  
}
addScripts([
	"assets/js/plugins/jquery.js",
 	"assets/js/plugins/jquery.mobile-1.4.2.min.js"
	],
	function(){
		addScripts([
			"assets/js/plugins/app.js" 
		],
		function(){
			app.loadJSView( [datainit] );
		});
});


 
