/* 
 * Sneyder Navia
 * fabiansneyder@gmail.com
 * Copyright 2013
 */

jQuery.isEmpty = function(){
    var count = 0;
    $.each(arguments, function(i, data){
        if(data !== null && data !== undefined && data !== '' && typeof(data) !== 'undefined')
            count ++;
        else
            return false
    });
    return (arguments).length === count ? false : true;
};

jQuery.checkResponse = function(opts){
    var defaults = {
        response: null,
        onClose: function(){}
    };
    var options = $.extend({}, defaults, opts);
    
    if(!$.isEmpty(options.response)){
        if(!options.response.success){
            var msg = !$.isEmpty(options.response.data) ? options.response.data : 'Indefinido';
            $.xBAlert({
                title: 'Error',
                content: msg,
                labelClose: 'Cerrar',
                width: '50%',
                onClose: options.onClose
            });
        }
    }
};