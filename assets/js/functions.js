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

jQuery.mask = {
    set: function(opts){
        var defaults = {
            text: 'Obteniendo informaci&oacute;n...'
        };
        var options = $.extend({}, defaults, opts);
        
        var modal = $('#mask_panel_important');
        
        if(modal.length <= 0){
            modal = $('<div></div>')
                    .hide()
                    .attr({
                        id: 'mask_panel_important',
                        tabIndex: -1
                    })
                    .addClass('modal-backdrop in')
                    .appendTo(document.body);
            
            $('<div></div>')
                    .attr({id: 'mask_panel_loader'})
                    .addClass('mask_loading')
                    .append('<div class="loading"></div>')
                    .append('<span class="text">' + options.text + '</span>')
                    .appendTo(document.body);
        }
        modal.show();
    },
    destroy: function(){
        $('#mask_panel_important, #mask_panel_loader').remove();   
    }
};