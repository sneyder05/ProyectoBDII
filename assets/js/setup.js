/* 
 * Sneyder Navia
 * fabiansneyder@gmail.com
 * Copyright 2013
 */

jQuery.jsonp.setup({
    callbackParameter: "callback",
    error: function(opts, err){
        alert('Error: ' + (err === 'error' ? 'Indefinido' : (err === 'timeout' ? 'Tiempo de conexion excedido' : err)));
    }
});