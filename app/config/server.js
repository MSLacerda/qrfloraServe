var dataCtrl = require("mongoose");
/*importa arquivos de configuração */
var config = require('./config');
/* importar o módulo do framework express */
var express = require('express');
/* importar o módulo do body-parser */
var bodyParser = require('body-parser');
/* importar o módulo do express-validator */
var expressValidator = require('express-validator');
var config = require('./config');
var load = require('express-load');



/* iniciar o objeto do express */
var app = null;
app = express();
console.log(config.database);
require('./dbConnection.js')(config.database);


// /* setar as variáveis 'view engine' e 'views' do express */
// app.set('view engine', 'ejs');
// app.set('views', './app/views');


/* configurar o middleware body-parser */
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization, x-access-token');
    next();
});

/* configurar o middleware express-validator */
app.use(expressValidator());

/* efetua o autoload das rotas, dos models e dos controllers para o objeto app */

load('models', { cwd: 'app' })
    .then('controllers')
    .then('routes')
    .into(app);


/* exportar o objeto app */
module.exports = app;