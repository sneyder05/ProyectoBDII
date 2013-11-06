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
            this.pp.progressBar = $('<div/>').prependTo('#main_panel .content').tbProgressbar({
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
            $(document).delegate('#admin_panel ul.nav li a', 'click', this.behaviors.general.onSelectTable);
            keypress.combo('ctrl h', this.behaviors.general.onTogglePanel);
        },
        behaviors: {
            general: {
                onSelectView: function(){
                    var link = $(this);
                    link.parent().addClass('active').siblings().removeClass('active');
                    
                    if(link.data('for') === 'index'){
                        $('#main_panel div.content').html('');
                    }
                    else{
                        $('#main_panel div.content').load('views/' + link.data('for'));
                    }
                },
                onTogglePanel: function(event){
                    var admin = $('#admin_panel');
                    var content = $('#main_panel div.content').parent();
                    if(admin.is(':visible')){
                        content.removeClass('col-sm-9').addClass('col-sm-12');
                        admin.hide();
                    }
                    else{
                        content.removeClass('col-sm-12').addClass('col-sm-9');
                        admin.show();
                    }
                    
                    event.preventDefault();
                },
                onLoginSuccessfull: function(data){
                    $('#admin_panel ul.nav li:not(.title)').remove();
                    
                    if(data.tables){
                        $.each(data.tables, function(table, content){
                            $('<li>')
                                .append('<a href="#" data-table="' + table + '">' + table + '</a>')
                                .appendTo($('#admin_panel ul.nav'));
                        });
                    }
                    
                    this.pp.loginView.remove();
                    $('.modal-backdrop').remove();
                },
                onSelectTable: function(){
                    var self = $(this);
                    
                    self.parent().addClass('selected').siblings().removeClass('selected');
                    
                    var table_name = self.data('table');
                    
                    if(!$.isEmpty(table_name)){
                        $.jsonp({
                            url: Global.PATH_SERVER + '/Services/GetTableInfo',
                            data: {
                                data: JSON.stringify({
                                    Table: table_name
                                })
                            },
                            beforeSend: function(){
                                $.mask.set();
                            },
                            success: function(data, status, opts){
                                $.checkResponse({
                                    response: data,
                                    onClose: function(){
                                        $.mask.destroy();
                                    }
                                });

                                if(data.success){
                                    var info = JSON.parse(data.data);
                                    console.log(info);
                                    
                                    var htmlCols = '';
                                    $.each(info.columns, function(column, data){
                                        htmlCols += '<tr>' +
                                                    '<td>' + column + '</td>' +
                                                    '<td>' + data.type + '</td>' +
                                                    '<td>' + data.length + '</td>' +
                                                    '<td>' + (data.precision > 0 ? data.precision + ((data.scale > 0 ? ',' + data.scale : '')) : '-') + '</td>' +
                                                    '<td>' + (data.nullable ? 'Si' : 'No') + '</td>' +
                                                '</tr>';
                                    });
                                    
                                    var checkTypeConstraint = function(type){
                                        return type === 'P' ? 'Primaria' : type === 'R' ? 'Foranea' : type === 'U' ? 'Unique' : type === 'C' ? 'Check' : 'Desconocido';
                                    };
                                    
                                    var htmlConstraints = '';
                                    $.each(info.contraints, function(constraint, data){
                                        htmlConstraints += '<tr>' +
                                                    '<td>' + constraint + '</td>' +
                                                    '<td>' + checkTypeConstraint(data.type) + (data.type === 'R' ? '(' + data.fk_name + ')' : '') + '</td>' +
                                                    '<td>' + (typeof data.detail === 'object' ? data.detail.join(',') : '') + '</td>' +
                                                    '<td>' + (data.type === 'R' ? data.detail_fk.table : '-') + '</td>' +
                                                    '<td>' + (data.type === 'R' && typeof data.detail_fk.columns === 'object' ? data.detail_fk.columns.join(',') : '-') + '</td>' +
                                                '</tr>';
                                    });
                                    
                                    var html = '' +
                                        '<div class="panel panel-primary">' +
                                            '<div class="panel-heading"><strong>' + table_name + ': Definici&oacute;n</strong></div>' +
                                            '<table class="table">' +
                                                '<thead>' +
                                                    '<tr>' +
                                                        '<th>Columna</th>' +
                                                        '<th>Tipo</th>' +
                                                        '<th>Tama&ntilde;o</th>' +
                                                        '<th>Precisi&oacute;n</th>' +
                                                        '<th>Nulo</th>' +
                                                    '</tr>' +
                                                '</thead>' +
                                                '<tbody>' +
                                                    htmlCols +
                                                '</tbody>' +
                                            '</table>' +
                                        '</div>' +
                                        '<div class="panel panel-success">' +
                                            '<div class="panel-heading"><strong>' + table_name + ': Llaves Primarias / For&aacute;neas</strong></div>' +
                                            '<table class="table">' +
                                                '<thead>' +
                                                    '<tr>' +
                                                        '<th>Nombre</th>' +
                                                        '<th>Tipo</th>' +
                                                        '<th>Columnas</th>' +
                                                        '<th>Tabla FK</th>' +
                                                        '<th>Columnas FK</th>' +
                                                    '</tr>' +
                                                '</thead>' +
                                                '<tbody>' +
                                                    htmlConstraints +
                                                '</tbody>' +
                                            '</table>' +
                                        '</div>';
                                
                                    $('#main_panel div.content').html(html);
                                    
                                    $.mask.destroy();
                                }
                            }
                        });
                    }
                    else{
                        window.alert('Tabla invalida');
                    }
                }
            }
        }
    };
    
    Index.init();
});