var mensajes = {
    date: '',
    asunto: '',
    mensaje: '',
    leido: null
};

var $data = {
    //VARIABLES
    // ====================================================
 

    //CONSTANTS
    // ====================================================
 
    _cons: {
        dbDatas: {
            name: 'sshacpDB',
            ver: '1.0',
            app: 'smartSoft',
            size: '1024'
        },
        ajax: {
            type: 'GET',
            url: 'http://192.168.1.106:3000/', //---------------------------------------- HOST IP or URL----------------
            dataType: 'json',
            crossDomains: true
        },
        localStorage: null,
        monthNames: [ "Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic" ]
    },
    db: null,

    // INIT APP
    // ====================================================

    init: function() {
        app.logg('init data'); 
        $data._cons.localStorage = window.localStorage;
        if($data.decodeArray_utf8($data._cons.localStorage.getItem('mensajes')) == null){
            console.log('1');
            $data.cargarDatos(function(){});
        } else {
            console.log('2');
            $data.showTitles(null);
        }
    },

    cargarDatos: function(cb){
        $data.palabras.getPalabras([$data.enunciado.getEnunciado, $data.generateMsgs, $data.showTitles, cb]);
        // $data.palabras.getPalabras([$data.enunciado.getEnunciado, $data.generateMsgs, $data.showTitles, function(a){}]);
    },

    // EVENTS
    // ====================================================
    startDB: function(){
        $data.db = window.openDatabase(
            $data._cons.dbDatas.name, 
            $data._cons.dbDatas.ver, 
            $data._cons.dbDatas.app, 
            $data._cons.dbDatas.size
        );
    },

    showTitles: function(cb){
        var msgs = $data.decodeArray_utf8($data._cons.localStorage.getItem('mensajes'));
        var html = '';
        for (var i = 0; i < msgs.length; i++) {
            var date = new Date(msgs[i].date);
            html += '<li><a href="#detail" data-transition="flip" onclick="$data.showMessage(\''+i+'\')">';
            if(!msgs[i].leido)
                html += "<span>";
            html += msgs[i].asunto + " - " + date.getDate() + '/' + $data._cons.monthNames[date.getMonth()] + '/' + date.getFullYear();
            html += "&nbsp;&nbsp;&nbsp;";
            if(!msgs[i].leido)
                html += "</span>";
            html += "<i>></i></a></li>";
        }
        $('#home ul').html(html);
        $('#loader').fadeOut(100);
        if(typeof(cb) == 'object' && typeof(cb[3]) == 'function')
            cb[3](cb);
        else if(typeof(cb) == 'function')
            cb();
    },

    showMessage: function(i){
        var msgs = $data.decodeArray_utf8($data._cons.localStorage.getItem('mensajes'));
        msgs[i].leido = true;
        $data._cons.localStorage.setItem('mensajes', $data.encodeArray_utf8(msgs));
        $data.showTitles();
        var date = new Date(msgs[i].date);
        $('#detail h1').html(msgs[i].asunto);
        $('#detail h6').html(date.getDate() + '/' + $data._cons.monthNames[date.getMonth()] + '/' + date.getFullYear());
        $('#detail p').html(msgs[i].mensaje);
    },

    // APP CODE
    // ====================================================
    cloneObj: function(obj) {
        return JSON.parse(JSON.stringify(obj));
    },
    fechaAleatoria: function(inicio, fin) {
        return new Date(inicio.getTime() + Math.random() * (fin.getTime() - inicio.getTime()));
    },

    // FUNCTIONS
    // ====================================================  
    encode_utf8: function (s) {
        return unescape(encodeURIComponent(s));
    },

    decode_utf8: function (s) {
        return decodeURIComponent(escape(s));
    },
    encodeArray_utf8: function(s) {
        return JSON.stringify((s));
    },
    decodeArray_utf8: function(s) {
        return JSON.parse(s);
    },

    _ajax: {
        exec: function(parameters, path, successCB, cb, errorCB) {
            $.ajax({
                type:           $data._cons.ajax.type,
                url:            $data._cons.ajax.url + path,
                data:           parameters,
                dataType:       $data._cons.ajax.dataType,
                crossDomain:    $data._cons.ajax.crossDomains,
                success: function(data)
                {
                    successCB( data, cb );
                },
                error: function(error) {
                    errorCB( error );
                }
            });
            return false;
        }
    },
    
    palabras: {
        getPalabras: function(cb){
            $data._ajax.exec([], 'palabras', $data.palabras.sucessCB, cb, $data.palabras.errorCB );
        },
        sucessCB: function(data, cb){
            console.log("Palabras descargadas de forma correcta.");
            $data.palabras.extractPal(data, cb);
            return false;
        },
        errorCB: function(data){
            console.log("Error al descargar las palabras.");
            return false;
        },
        extractPal: function(data, cb){
            var tmpPbr = [];
            var dt = data.message;
            for (var i = 0; i < dt.length; i++) {
                tmpPbr.push(dt[i].palabra);
            }
            $data._cons.localStorage.setItem('palabras', $data.encodeArray_utf8(tmpPbr));
            cb[0](cb);
        }
    },

    enunciado: {
        getEnunciado: function(cb){ 
            $data._ajax.exec([], 'enunciado', $data.enunciado.sucessCB, cb, $data.enunciado.errorCB );
        },
        sucessCB: function(data, cb){
            console.log("Enunciado descargado de forma correcta.");
            $data.enunciado.extractEnun(data, cb);
            return false;
        },
        errorCB: function(data){
            console.log("Error al descargar el enunciado.");
            return false;
        },
        extractEnun: function(data, cb){
            var dt = data.message[0].enunciado;
            $data._cons.localStorage.setItem('enunciado', dt);
            cb[1](cb);
        }
    },
    generateMsgs: function(cb){
        var qty = Math.floor((Math.random() * 10) + 1);
        var cmd = "<[var]>";
        var enun = $data._cons.localStorage.getItem('enunciado');
        var enumArr = enun.split(cmd);
        var palArr = $data.decodeArray_utf8($data._cons.localStorage.getItem('palabras'));
        var msgs = [];

        for (var ii = 0; ii < qty; ii++) {
            var msg = "";
            var newMsg = $data.cloneObj(mensajes);
            var ast = '';
            for (var i = 0; i < enumArr.length-1; i++) { 
                var wordI = Math.floor(Math.random() * palArr.length);
                msg += enumArr[i] + palArr[wordI];
                ast += palArr[wordI] + ' ';
                if( i+1 == enumArr.length-1 ){
                    msg += enumArr[i+1];
                }
            }
            newMsg.date = $data.fechaAleatoria(new Date(2015, 10, 1), new Date());
            newMsg.asunto = ast;
            newMsg.mensaje = msg;
            newMsg.leido = false;
            msgs.push(newMsg);
        }
        $data._cons.localStorage.setItem('mensajes', $data.encodeArray_utf8(msgs));
        cb[2](cb);
    }
};
$data.init();