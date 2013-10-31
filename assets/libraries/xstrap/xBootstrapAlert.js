/*
 * SNavia
 * Playtech - Enigma Dev
 * 2013
 */
/*
 * Depends:
 * - xBootstrapModal
 */
(function($){
    $.xBAlert = function(opts){
        var options = $.extend({}, $.xBAlert.defaults, opts);
        var options_persistent = $.extend({}, opts, {
            closeThick: false,
            buttons: {
                'alert':{
                    label: (options.labelClose != null && options.labelClose != '' ? options.labelClose: 'Aceptar'),
                    fn : ($.isFunction(options.onClose) ? options.onClose : function(){}),
                    closer: true,
                    type: 'btn-warning'
                }
            }
        });
        
        options = $.extend({}, $.xBAlert.defaults, options_persistent);
        
        $.xBModal(options);
    };
    
    $.xBAlert.defaults = {
        closeOnEscape: true,
        labelClose: '',
        onClose: function(){},
        height: 'auto',
        maxHeight: false,
        maxWidth: false,
        minHeight: 150,
        minWidth: 150,
        title: '',
        width: '100%',
        content: ''
    };
}(jQuery));