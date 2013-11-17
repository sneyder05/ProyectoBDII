/* 
 * Sneyder Navia
 * fabiansneyder@gmail.com
 * Copyright 2013
 */

/*
 * Depends:
 * - jQuery.X.js
 * - Bootstrap.js
 */
(function($){
    $.xBModal = function(opts){
        var options = $.extend({}, $.xBModal.defaults, opts);
        //Create
        var title = options.title || '&#160;',
        XBModalWrap = ($('<div></div>'))
            .addClass('modal')
            .appendTo(document.body),
        xBModalDialog = ($('<div></div>'))
            .addClass('modal-dialog')
            .css({minWidth: options.minWidth, minHeight: options.minHeight, width: options.width})
            .appendTo(XBModalWrap),
        xBModal = ($('<div></div>'))
            .addClass('modal-content')
            .attr('tabIndex', -1).keydown(function(event) {
                if (options.closeOnEscape && event.keyCode &&  event.keyCode === $.xBModal.keyCode.ESCAPE) {
                    fnClose(event);
                    event.preventDefault();
                }
            })
            .attr({
                id: options.id
            })
            .appendTo(xBModalDialog),
        xBModalHeaderCloseThick = ($('<button></button>'))
            .html('&times;')
            .addClass('close')
            .attr({
                type: 'button',
                'data-dismiss': 'modal',
                'aria-hidden': 'true'
            }),
        xBModalHeaderTitle = ($('<h4></h4>'))
            .html(options.title),
        xBModalHeader = ($('<div></div>'))
            .addClass('modal-header')
            .append(options.closeThick ? xBModalHeaderCloseThick : $(xBModalHeaderCloseThick).hide())
            .append(xBModalHeaderTitle)
            .appendTo(xBModal),
        xBModalBody = ($('<div></div>'))
            .addClass('modal-body')
            .append(
                $('<p></p>')
                    .html(options.content)
            )
            .appendTo(xBModal),
        xBModalFooterButtons = ($('<div></div>')),
        _fnCreateButtons = function(buttons){
            if(typeof buttons === 'object' && buttons !== null){
                return $.each(buttons, function(name, pp) {
                    var opts = $.extend({}, {
                        fn: function(){},
                        label: name,
                        closer: false,
                        type: 'btn-primary',
                        styles: {}
                    }, pp);
                    var button = $('<button></button>')
                        .text(opts.label)
                        .addClass('btn' + (opts.type !== null && opts.type !== '' ? ' ' + opts.type : ''))
                        .css(opts.styles)
                        .attr({
                            'id': 'btn_' + name,
                            type: 'button'
                        })
                        .on('click', function(event) {
                            if(opts.closer)
                                $(xBModalHeaderCloseThick).trigger('click');
                            opts.fn.call(options.me, this, event);
                        })
                        .appendTo(xBModalFooterButtons);
                });
            }
            return '';
        },
        xBModalFooter = ($(xBModalFooterButtons))
            .addClass('modal-footer')
            .append(_fnCreateButtons(options.buttons)),
        fnClose = function(event){

        };
        
        if(!$.isEmpty(options.buttons) && typeof options.buttons === 'object' && Object.keys(options.buttons).length > 0){
            xBModalFooter.appendTo(xBModal);
        }
        
        if(options.autoOpen){
            return $(XBModalWrap).modal();
        }
        
        return $(XBModalWrap);
    };

    $.xBModal.defaults = {
        id: 'xBootstrapModal_' + (parseInt((Math.random() + 9) / 3)),
        autoOpen: true,
        buttons: {},
        classes: 'modal hide fade',
        closeOnEscape: true,
        closeThick: true,
        height: 'auto',
        maxHeight: false,
        maxWidth: false,
        minHeight: 400,
        minWidth: 200,
        title: '',
        width: 'auto',
        content: '',
        me: null
    };

    $.xBModal.keyCode = {
        ESCAPE: 27
    };
}(jQuery));