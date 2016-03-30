app.loadJS([ 'createjs/utils/Proxy' ], function(){ 
app.loadJS([ 'createjs/utils/IndexOf' ], function(){ 
app.loadJS([ 'createjs/events/Event' ], function(){ 
app.loadJS([ 'createjs/events/EventDispatcher' ], function(){ 
     index.init();
}); }); }); });
 
var index = {
    //VARIABLES
    // ====================================================
 

    //CONSTANTS
    // ====================================================
 
    cons:{
        go: null
    },

    // INIT APP
    // ====================================================

    init: function() {
        app.logg('init'); 
        index.cons.go = $('#go');


      
        index._setup();
        
        
        index.events.init();
    },


    // EVENTS
    // ====================================================
    events:{
        init:function(){
            $(window).resize( index.events.window_onResize );
            $(window).load( index.events.window_load );
            $( "#home" ).bind( "pageshow", index.events.on_home_show );
            $( "#detail" ).bind( "pageshow", index.events.on_subPage_show );
            $(document).on('click', '.relConfig', index.events.nav_close_click_click )
            $(document).on('click', '.configClose', index.events.nav_close_click )
            $(document).on('click', '.aboutClose', index.events.aviso_continuar_click )
            $(document).on('click', '.aboutOpen', index.events.aviso_continuar_click )
            $(document).on('click', '.getMsgs', index.events.getMsgs_click )

        },

       window_onResize: function(){ 
            
        },

        window_load:function(){
          
        },

        on_home_show: function(){
            app.logg('home show');
            $('header a.relBack').fadeOut(0);
        },
        on_subPage_show: function(){
            app.logg('subPage show');
            $('header a.relBack').fadeIn(200);
        },
        nav_close_click_click: function(){
            $('#nav').fadeIn(200);
            setTimeout(function(){
                $('#nav .nav').slideDown(300); 
            }, 200);
            return false;
        },
        nav_close_click: function(){
            $('#nav .nav').slideUp(300); 
            setTimeout(function(){
                $('#nav').fadeOut(200); 
            }, 200);
            return false;
        },
        aviso_continuar_click: function(){
            var st = $('#about').css('display');
            if( st == 'none') {
                index.events.nav_close_click();
                $('#about .about').fadeIn(200);
                setTimeout(function(){
                    $('#about').fadeIn(200); 
                }, 200);
            } else {
                $('#about .about').fadeOut(200);
                setTimeout(function(){
                    $('#about').fadeOut(200); 
                }, 200);
            }
            return false;
        },
        getMsgs_click: function(){
            $('#nav .nav').slideUp(300); 
            setTimeout(function(){
                $('#nav').fadeOut(200, function(){
                    $.mobile.changePage( "#detail", { transition: "flip", changeHash: false });
                }); 
            }, 200);
            return false;
        },
        azarPos_click: function(){
            $('#nav .nav').slideUp(300); 
            setTimeout(function(){
                $('#nav').fadeOut(200, function(){
                    $.mobile.changePage( "#detail", { transition: "flip", changeHash: false });
                }); 
            }, 200);
            return false;
        },
         
      
    },
 
    // APP CODE
    // ====================================================
    _setup: function() {
        app.logg('my code'); 

        if( $('#home').hasClass('ui-page-active') ){
            app.logg('home active');
            $('header .relBack').fadeOut(0);
        }

        setTimeout(function(){
            index.hide_preLoader();
        }, 2000);

    },

    // FUNCTIONS
    // ====================================================  

    hide_preLoader:function(){
        $('#loader').fadeOut(300);
    },

    responsive:{
        init: function(){
            index.responsive._960();
            index.responsive._768();
            index.responsive._480();
            index.responsive._320();
        },
        _960: function(){
            if( $(window).width() < 1200 && $(window).width() > 959){
              

            }
        },
        _768: function(){
            if( $(window).width() < 960 && $(window).width() > 479){
               
            }
        },
        _480: function(){
            if( $(window).width() < 768 && $(window).width() > 319){
               

            }
        },
        _320: function(){
            if( $(window).width() < 480){
              
            }
        }

    }
 
 
        
 


};

