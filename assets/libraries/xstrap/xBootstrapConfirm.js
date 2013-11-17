/* 
 * Sneyder Navia
 * fabiansneyder@gmail.com
 * Copyright 2013
 */

/*
 * Depends:
 * - xBootstrapModal
 */
(function($){
    $.xBConfirm = function(opts){
        var options = $.extend({}, $.xBConfirm.defaults, opts);
        var options_persistent = $.extend({}, opts, {
            closeThick: false,
            buttons: {
                'yes': {
                    label: (options.labelYes != null && options.labelYes != '' ? options.labelYes: 'Yes'),
                    fn : function(){
                        if($.isFunction(options.onYes))
                            options.onYes.call(options.me);
                        
                        if($.isFunction(options.onClose))
                            options.onClose.call(options.me);
                    },
                    closer: true,
                    type: 'btn-primary',
                    styles: {
                        'float': 'left'
                    }
                },
                'no': {
                    label: (options.labelNo != null && options.labelNo != '' ? options.labelNo: 'No'),
                    fn : function(){
                        if($.isFunction(options.onNo))
                            options.onNo.call(options.me);
                        
                        if($.isFunction(options.onClose))
                            options.onClose.call(options.me);
                    },
                    closer: true,
                    type: 'btn-warning'
                }
            }
        });
        
        options = $.extend({}, $.xBConfirm.defaults, options_persistent);
        
        $.xBModal(options);
    };
    
    $.xBConfirm.defaults = {
        closeOnEscape: true,
        labelYes: 'Si',
        labelNo: 'No',
        onClose: function(){},
        onYes: function(){},
        onNo: function(){},
        height: 'auto',
        maxHeight: false,
        maxWidth: false,
        minHeight: 150,
        minWidth: 150,
        title: '',
        width: '100%',
        content: '',
        me: null
    };
}(jQuery));