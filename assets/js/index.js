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
            loginView: null,
            table: null
        },
        init: function(){
            this.load();
            this.events();
        },
        load: function(){
            $('*[data-toggle]').tooltip({container: 'body'});
            
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
            $(document).delegate('html', 'click', this.behaviors.general.onClickHtml);
            $(document).delegate('#float_toolbar', 'click', this.behaviors.general.stopEventToolbar);
            $(document).delegate('#main_menu a', 'click', this.behaviors.general.onSelectView);
            $(document).delegate('#admin_panel ul.nav li a', 'click', this.behaviors.general.onSelectTable);
            $(document).delegate('#float_toolbar_launch', 'click', this.behaviors.general.onLaunchToolbar);
            $(document).delegate('#float_toolbar #aGetSQLTable', 'click', this.behaviors.general.onGetTableSQL);
            $(document).delegate('#float_toolbar #aBackup', 'click', this.behaviors.general.onGenerateBck);
            
            keypress.combo('ctrl h', this.behaviors.general.onTogglePanel);
        },
        behaviors: {
            general: {
                onClickHtml: function(){
                    if($('#float_toolbar > ul').is(':visible')){
                        $('#float_toolbar > ul').slideUp(250);
                        $('#float_toolbar_launch').animate({opacity: 1}, 200);
                    }
                },
                stopEventToolbar: function(event){
                    event.stopPropagation();
                },
                onGetTableSQL: function(){
                    var link = $(this);
                    
                    if(link.parent().hasClass('disabled')){
                        return;
                    }
                    
                    link.parent().addClass('disabled');
                    
                    $.jsonp({
                        url: Global.PATH_SERVER + '/Services/GetTableSQL',
                        beforeSend: function(){
                            $.mask.set();
                        },
                        data: {
                            data: JSON.stringify({
                                Table: Index.pp.table
                            })
                        },
                        success: function(data, status, opts){
                            $.checkResponse({
                                response: data,
                                onClose: function(){
                                    $.mask.destroy();
                                }
                            });
                                                        
                            if(data.success){
                                var html = '' +
                                    '<div class="panel panel-success">' +
                                        '<div class="panel-heading">' +
                                            '<h4 class="panel-title">' +
                                                '<a data-toggle="collapse" data-parent="#accordion" href="#collapseOne">' +
                                                    'Script SQL' +
                                                '</a>' +
                                            '</h4>' +
                                        '</div>' +
                                        '<div id="collapseOne" class="panel-collapse collapse in">' +
                                            '<div class="panel-body">' +
                                                data.data.replace(/\n/g, '<br />').replace(/\t/g, '&nbsp;&nbsp;&nbsp;&nbsp;') +
                                            '</div>' +
                                        '</div>' +
                                    '</div>';
                        
                                $('#main_panel #sql_table_panel').html(html).slideDown();
                                
                                $.mask.destroy();
                            }
                        }
                    });
                    
                    Index.behaviors.general.onClickHtml();
                },
                onGenerateBck: function(){
                    Index.behaviors.general.onClickHtml();
                },
                onLaunchToolbar: function(event){
                    $(this).animate({opacity: $('#float_toolbar > ul').is(':visible') ? 1 : .5}, 200);
                    $('#float_toolbar > ul')[$('#float_toolbar > ul').is(':visible') ? 'slideUp' : 'slideDown'](250);
                    event.stopPropagation();
                },
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
                    $('#main_panel #columns_table_panel').slideUp(300);
                    $('#main_panel #constraints_table_panel').slideUp(300);
                    $('#main_panel #sql_table_panel').slideUp(300);
                    $('#float_toolbar li.disabled').removeClass('disabled');
                    
                    var self = $(this);
                    
                    self.parent().addClass('selected').siblings().removeClass('selected');
                    
                    var table_name = self.data('table');
                    
                    if(!$.isEmpty(table_name)){
                        Index.pp.table = table_name;
                        
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
                                    var htmlCols = '';
                                    $.each(info.columns, function(column, data){
                                        var has_cst = data.has_constraint;
                                        //<a href="#" data-toggle="tooltip" title="" data-original-title="Default tooltip">you probably</a>
                                        htmlCols += '<tr>' +
                                                    '<td>' + (has_cst.isP ? '<span data-toggle="tooltip" data-original-title="Llave primaria" class="glyphicon glyphicon-star"></span>' : '') + (has_cst.isR ? '<span data-toggle="tooltip" data-original-title="Llave for&aacute;nea" class="glyphicon glyphicon-star-empty"></span>' : '') + (has_cst.isU ? '<span data-toggle="tooltip" data-original-title="&Uacute;nico" class="glyphicon glyphicon-record"></span>' : '') + (has_cst.isC ? '<span data-toggle="tooltip" data-original-title="Condicional" class="glyphicon glyphicon .glyphicon-tag"></span>' : '') +
                                                     column + '</td>' +
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
                                    htmlConstraints = $.isEmpty(htmlConstraints) ? '<tr><td colspan="5">No hay relaciones</td></tr>' : htmlConstraints;
                                    
                                    var html = '' +
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
                                            '</table>';
                                
                                    $('#main_panel #columns_table_panel').html(html).slideDown();
                                
                                    html = '' +
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
                                            '</table>';
                                
                                    $('#main_panel #constraints_table_panel').html(html).slideDown();
                                                                    
                                    $('*[data-toggle]').tooltip({container: 'body'});
                                    
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