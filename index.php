<?php
/*
 * Sneyder Navia
 * fabiansneyder@gmail.com
 * Copyright 2013
 */
?>
<html>
    <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Proyecto Base De Datos II</title>
        <link href="assets/css/styles.css" rel="stylesheet" media="screen">
        <link href="assets/bootstrap/css/bootstrap.min.css" rel="stylesheet" media="screen">
        <link href="assets/css/override.css" rel="stylesheet" media="screen">
    </head>
    <body>
        <div data-toggle="tooltip" data-placement="right" data-original-title="Herramientas" id="float_toolbar_launch">
            <span class="glyphicon glyphicon-new-window"></span>
        </div>
        <div id="float_toolbar" class="lol">
            <ul class="dropdown-menu" role="menu">
                <li role="presentation" class="dropdown-header">Herramientas</li>
                <li role="presentation" data-toggle="tooltip" data-placement="right" data-original-title="Genear un backup de toda la base de datos"><a id="aBackup" role="menuitem" tabindex="-1" href="#">Generar Backup</a></li>
                <li role="presentation" data-toggle="tooltip" data-placement="right" data-original-title="Ver el script SQL de creacion de la tabla"><a id="aGetSQLTable" role="menuitem" tabindex="-1" href="#">Ver SQL</a></li>
            </ul>
        </div>
        <div id="main_wrap">
            <div class="navbar navbar-inverse navbar-fixed-top">
                <div class="container">
                    <div class="navbar-header">
                        <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
                            <span class="icon-bar"></span>
                            <span class="icon-bar"></span>
                            <span class="icon-bar"></span>
                        </button>
                        <a class="navbar-brand" href="javascript:">DB Admin</a>
                    </div>
                    <div class="collapse navbar-collapse">
                        <ul id="main_menu" class="nav navbar-nav">
                            <li><a href="javascript:" data-for="index">Inicio</a></li>
                            <li class="dropdown active">
                                <a class="dropdown-toggle" data-toggle="dropdown" href="#">
                                    Tablas
                                    <span class="caret"></span>
                                </a>
                                <ul id="navbar_tables" class="dropdown-menu" role="menu"></ul>
                            </li>
                            <li><a href="javascript:" data-for="acercade.html">Acerca de...</a></li>
                        </ul>
                    </div>
                </div>
            </div>
            <div id="main_panel" class="container">
                <div class="page-header main_title">
                    <h2>Administraci&oacute;n De Bases De Datos Oracle</h2>
                </div>
                <div class="content">
                    <div id="columns_table_panel" class="panel panel-primary panel_db"></div>
                    <div id="constraints_table_panel" class="panel panel-primary panel_db"></div>
                    <div id="sql_table_panel" class="panel-group" id="panel_db"></div>
                </div>
            </div>
        </div>
        <div id="main_footer">
            <div class="container">
                <p class="credit">Sneyder Navia Urbano <span>&COPY;</span> 2013</p>
            </div>
        </div>
        <div id="modal_panel" class="modal-backdrop fade in" tabindex="-1">
        </div>
        <!-- INCLUDE JS FILES -->
        <script src="assets/libraries/keypress-1.0.8.min.js"></script>
        <script src="assets/libraries/jquery.10.js"></script>
        <script src="assets/libraries/jquery.jsonp.js"></script>
        <script src="assets/libraries/jquery.widget.js"></script>
        <script src="assets/libraries/jquery.effects.min.js"></script>
        <script src="assets/bootstrap/js/bootstrap.min.js"></script>
        <script src="assets/libraries/tbProgressBar.js"></script>
        <script src="assets/js/Global.js"></script>
        <script src="assets/js/setup.js"></script>
        <script src="assets/libraries/xstrap/xBootstrapModal.js"></script>
        <script src="assets/libraries/xstrap/xBootstrapAlert.js"></script>
        <script src="assets/libraries/xstrap/xBootstrapConfirm.js"></script>
        <script src="assets/js/functions.js"></script>
        <script src="assets/js/index.js"></script>
    </body>
</html>