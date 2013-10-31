/* 
 * Sneyder Navia
 * fabiansneyder@gmail.com
 * Copyright 2013
 */
var Login;
$(function(){
    Login = {
        pp: {
            progressBar: null
        },
        init: function(){
            this.load();
            this.events();
        },
        load: function(){
            
        },
        events: function(){
            $(document).delegate('#btnLogin', 'click', this.behaviors.general.onLogin);
        },
        behaviors: {
            general: {
                onLogin: function(){
                    var button = $(this);
                    
                    button.attr({disabled: true}).html('Conectando...');
                    
                    var login = $('#txtLogin').val();
                    var password = $('#txtPassword').val();
                    var db = $('#txtDB').val();
                    
                    $.jsonp({
                        url: Global.PATH_SERVER + '/Services/Login',
                        data: {
                            data: JSON.stringify({
                                Login: login,
                                Password: password,
                                DB: db
                            })
                        },
                        success: function(data, status, opts){
                            $.checkResponse({
                                response: data,
                                onClose: function(){
                                    button.removeAttr('disabled').html('Autenticar');
                                }
                            });
                            
                            if(data.success){
                                Index.behaviors.general.onLoginSuccessfull.call(Index);
                            }
                        }
                    });

                }
            }
        }
    };
    
    Login.init();
});