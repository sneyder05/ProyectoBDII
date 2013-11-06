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
    </head>
    <body>
        <div class="navbar navbar-fixed-top navbar-inverse" role="navigation">
            <div class="container">
                <div class="navbar-header">
                    <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                    </button>
                    <a class="navbar-brand" href="#">DB Admin</a>
                </div>
                <div class="collapse navbar-collapse">
                    <ul class="nav navbar-nav">
                        <ul id="main_menu" class="nav navbar-nav">
                            <li class="active"><a href="javascript:" data-for="index">Inicio</a></li>
                            <li><a href="javascript:" data-for="acercade.html">Acerca de...</a></li>
                        </ul>
                    </ul>
                </div><!-- /.nav-collapse -->
            </div><!-- /.container -->
        </div><!-- /.navbar -->

        <div id="main_panel" class="container">
            <div class="page-header main_title">
                <h1>Administraci&oacute;n Bases De Datos Oracle</h1>
            </div>
            <div class="row row-offcanvas row-offcanvas-right">
                <div class="col-xs-12 col-sm-9">
                    <div class="content">
                        Bienvenido...
                    </div>
                </div>
                <div id="admin_panel" class="col-xs-6 col-sm-3 sidebar-offcanvas" id="sidebar" role="navigation">
                    <div class="well sidebar-nav">
                        <ul class="nav">
                            <li class="title">Tablas</li>
                            <li><a href="#">Sin Registros</a></li>
                        </ul>
                    </div>
                </div>
                
            </div>
            <hr>
            <footer>
                <p>Sneyder Navia Urbano <span>&COPY;</span> 2013</p>
            </footer>
            <div id="modal_panel" class="modal-backdrop fade in" tabindex="-1"></div>
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
        <script src="assets/js/functions.js"></script>
        <script src="assets/js/index.js"></script>
    </body>
</html>