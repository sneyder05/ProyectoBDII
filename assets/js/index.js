/* 
 * Sneyder Navia
 * fabiansneyder@gmail.com
 * Copyright 2013
 */
var Index;
$(function(){
    Index = {
        pp: {
            progressBar: null,
            loginView: null
        },
        init: function(){
            this.load();
            this.events();
        },
        load: function(){
            this.pp.progressBar = $('<div/>').prependTo('#main_panel .lead').tbProgressbar({
                value: 10,
                complete: function(){
                    $('#modal_panel').hide();
                    if($.isEmpty(Global.USER_LOGGED)){
                        $.get('views/login.html', function(html){
                            Index.pp.loginView = $.xBModal({
                                title: 'Iniciar Sesi&oacute;n',
                                content: html,
                                closeThick: false,
                                closeOnEscape: false,
                                width: '30%',
                                me: Index
                            });
                        });
                    }
                    Index.pp.progressBar.tbProgressbar('destroy');
                }
            });
            
            this.pp.progressBar.tbProgressbar('option','value',100);
        },
        events: function(){
            $(document).delegate('#main_menu a', 'click', this.behaviors.general.onSelectView);
            keypress.combo('ctrl h', this.behaviors.general.onTogglePanel);
        },
        behaviors: {
            general: {
                onSelectView: function(){
                    var link = $(this);
                    link.parent().addClass('active').siblings().removeClass('active');
                    
                    if(link.data('for') === 'index'){
                        $('#main_panel div.lead').html('');
                    }
                    else{
                        $('#main_panel div.lead').load('views/' + link.data('for'));
                    }
                },
                onTogglePanel: function(event){
                    event.preventDefault();
                },
                onLoginSuccessfull: function(){
                    this.pp.loginView.remove();
                    $('.modal-backdrop').remove();
                }
            }
        }
    };
    
    Index.init();
});