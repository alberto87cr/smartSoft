// FUNCTIONS FRAMEWORK
var app = {
	init: function(){
		app.logg("app.js -- √");
	},

    logg: function(msg){
		//console.log(" \n"+msg+" \n===================================");
    },

    debugg: function(obj){
		//console.debug(obj);
    },
 	
 	loadJSView:function(obj,callback){
 		var total = obj.length;
 		$.each(obj, function( index, value ) {
			$.getScript('assets/js/views/'+value+'.js', function(){ 
				app.logg(""+value+".js -- √");
				if (index === total - 1) {
			        if(callback != undefined){
			        	callback();
			        }
			    } 
			});
		});
 	},
 	loadJS:function(obj,callback){
 		var total = obj.length;
 		$.each(obj, function( index, value ) {
			$.getScript('assets/js/plugins/'+value+'.js', function(){ 
				app.logg(""+value+".js -- √");
				if (index === total - 1) {
			        if(callback != undefined){
			        	callback();
			        }
			    } 
			});
		});
 	},
 	loadData:function(obj,callback){
 		var total = obj.length;
 		$.each(obj, function( index, value ) {
			$.getScript('assets/js/data/'+value+'.js', function(){ 
				app.logg(""+value+".js -- √");
				if (index === total - 1) {
			        if(callback != undefined){
			        	callback();
			        }
			    } 
			});
		});
 	}
}
app.init();
