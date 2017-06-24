module.exports = function(app) {
    //Rota para funções de login, envia os dados para serem autenticados
    app.post('/login', function(req, res) {
        app.controllers.user.login(app, req, res);
    });

    //Rota para registrar um no usuario
    app.post('/user', function(req, res) {
        app.controllers.user.register(app, req, res);
    });

    //Middleware para autenticar token das rotas abaixo
    app.use(app.controllers.authmiddle.authMiddle);

    //Rota para capturar dados de um determinado usuario.
    app.get('/user/:id', function(req, res) {
        app.controllers.user.me(app, req, res);
    });

    //Rota para cadastrar localizaçãp
    app.post('/loc', function(req, res) {
        app.controllers.forest.saveLoc(app, req, res);
    });
    app.get('/loc', function(req, res) {
        app.controllers.forest.getForest(app, req, res);
    });
    app.delete('/loc/:id', function(req, res) {
        app.controllers.forest.deleteTree(app, req, res);
    });

}