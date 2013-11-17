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
            $(document).delegate('#main_menu a:not(.dropdown-toggle)', 'click', this.behaviors.general.onSelectView);
            $(document).delegate('#navbar_tables li a', 'click', this.behaviors.general.onSelectTable);
            $(document).delegate('#float_toolbar_launch', 'click', this.behaviors.general.onLaunchToolbar);
            $(document).delegate('#float_toolbar #aGetSQLTable', 'click', this.behaviors.general.onGetTableSQL);
            $(document).delegate('#float_toolbar #aBackup', 'click', this.behaviors.general.onGenerateBck);
            $(document).delegate('.tools_for_field .delete_field', 'click', this.behaviors.general.onDeleteField);
            $(document).delegate('.tools_for_field span', 'mouseenter mouseleave', this.behaviors.general.onHoverToolField);
            
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
                onHoverToolField: function(event){
                    $(this).parent().parent().css({background: event.type === 'mouseenter' ? '#eee' : '#fff'});
                },
                onDeleteField: function(){
                    var button = $(this);
                    var field = button.data('field');
                    
                    if(!$.isEmpty(field)){
                        $.xBConfirm({
                            labelYes: 'Continuar',
                            labelNo: 'Cancelar',
                            title: 'Confirmaci&oacute;n',
                            content: 'Realmente desea eliminar el campo <strong>"' + field + '"</strong>',
                            width: '340px',
                            onYes: function(){
                                $.jsonp({
                                    url: Global.PATH_SERVER + '/Services/DeleteField',
                                    beforeSend: function(){
                                        $.mask.set({text: 'Eliminando el campo ' + field + '...'});
                                    },
                                    data: {
                                        data: JSON.stringify({
                                            Field: field,
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
                                            $('#main_panel #sql_table_panel').html('').slideUp();
                                            $('#float_toolbar #aGetSQLTable').parent().removeClass('disabled');
                                            
                                            button.parentsUntil('tr').last().parent()
                                                .css({textDecoration: 'line-through'})
                                                .animate({
                                                    color: 'red',
                                                    opacity: 0
                                                }, 300, function(){
                                                    $(this).remove();
                                                });

                                            $.mask.destroy();
                                        }
                                    }
                                });
                            }
                        });
                    }
                    else{
                        alert('No se identifica el campo, imposible proceder con la eliminacion.');
                    }
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
                                    link.parent().removeClass('disabled');
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
                    var link = $(this);
                    
                    if(link.parent().hasClass('disabled')){
                        return;
                    }
                    
                    $.jsonp({
                        url: Global.PATH_SERVER + '/Services/GenerateBackup',
                        beforeSend: function(){
                            $.mask.set({text: 'Generando backup...'});
                        },
                        data: {
                            data: JSON.stringify({
                                FileName: 'backup_oracle.sql'
                            })
                        },
                        success: function(data, status, opts){
                            $.checkResponse({
                                response: data,
                                onClose: function(){
                                    link.parent().removeClass('disabled');
                                    $.mask.destroy();
                                }
                            });
                                                        
                            if(data.success){
                                var url = data.data;
                                console.log(url);
                                window.parent.location = url;
                                
                                $.mask.destroy();
                            }
                        }
                    });
                    
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
                        $('.content .panel').hide();
                        $('#main_panel .main_title').show();
                    }
                    else if(link.data('for') === 'acercade.html'){
                        $.get('views/' + link.data('for'), function(html){
                            Index.pp.loginView = $.xBModal({
                                title: 'Proyecto Final BD II',
                                content: html,
                                closeThick: true,
                                closeOnEscape: false,
                                width: '30%',
                                me: Index
                            });
                        });
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
                    $(document.body).removeClass('modal-open');
                    $('#navbar_tables li:not(.divider)').remove();
                    
                    if(data.tables){
                        $.each(data.tables, function(table, content){
                            $('<li>')
                                .append('<a href="#" data-table="' + table + '">' + table + '</a>')
                                .appendTo($('#navbar_tables'));
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
                                        htmlCols += '<tr>' +
                                                    '<td>' + (has_cst.isP ? '<span data-toggle="tooltip" data-original-title="Llave primaria" class="glyphicon glyphicon-star"></span>' : '') + (has_cst.isR ? '<span data-toggle="tooltip" data-original-title="Llave for&aacute;nea" class="glyphicon glyphicon-star-empty"></span>' : '') + (has_cst.isU ? '<span data-toggle="tooltip" data-original-title="&Uacute;nico" class="glyphicon glyphicon-record"></span>' : '') + (has_cst.isC ? '<span data-toggle="tooltip" data-original-title="Condicional" class="glyphicon glyphicon glyphicon-tag"></span>' : '') +
                                                     column + '</td>' +
                                                    '<td>' + data.type + '</td>' +
                                                    '<td>' + data.length + '</td>' +
                                                    '<td>' + (data.precision > 0 ? data.precision + ((data.scale > 0 ? ',' + data.scale : '')) : '-') + '</td>' +
                                                    '<td>' + (data.nullable ? 'Si' : 'No') + '</td>' +
                                                    '<td class="adjust_width tools_for_field">' +
                                                        '<span data-toggle="tooltip" data-original-title="Eliminar campo ' + column + '" class="delete_field glyphicon glyphicon-trash" data-field="' + column + '"></span>' +
                                                    '</td>' +
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
                                            '<div class="panel-heading">' +
                                                '<strong>' + table_name + ': Definici&oacute;n</strong>' +
                                                (Object.keys(info.triggers).length > 0 ? '<span data-toggle="tooltip" data-original-title="Triggers: ' + (Object.keys(info.triggers).join(', ')) + '" class="glyphicon_tools glyphicon glyphicon-flash">(' + Object.keys(info.triggers).length + ')</span>' : '') +
                                            '</div>' +
                                            '<table class="table">' +
                                                '<thead>' +
                                                    '<tr>' +
                                                        '<th>Columna</th>' +
                                                        '<th>Tipo</th>' +
                                                        '<th>Tama&ntilde;o</th>' +
                                                        '<th>Precisi&oacute;n</th>' +
                                                        '<th>Nulo</th>' +
                                                        '<th class="adjust_width">Opciones</th>' +
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