var app = require('./app/config/server');

app.listen(process.env.PORT || 3000, function() {
    console.log('Servidor Online');
});