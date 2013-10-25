/*
 * Sneyder Navia
 * fabiansneyder@gmail.com
 * Copyright 2013
 */
(function(){
    $.widget('sn.tbProgressbar', {
        options: {
            value: 0
        },

        _create: function() {
            this.element
            .hide()
            .addClass('progress progress-striped active')
            .append(
                $('<div/>')
                    .addClass('progress-bar')
                    .attr({
                        'role': 'progressbar',
                        'aria-valuenow': this.options.value,
                        'aria-valuemin': 0,
                        'aria-valuemax': 100
                    })
                    .css({
                        width: this.options.value + '%'
                    })
            )
            .show();
            this._update();
        },

        _setOption: function(key, value){
            this.options[key] = value;
            this._update();
        },

        _update: function(){
            this.element.children('.progress-bar').css({width: this.options.value + '%'});
            
            if (this.options.value == 100){
                var _self_ = this;
                window.setTimeout(function(){
                    _self_._trigger('complete', null, {value: 100});                    
                }, 800);
            }
        },
        
        destroy: function() {
            this.element.hide();
            $.Widget.prototype.destroy.call( this );
        }
    });
})(jQuery);