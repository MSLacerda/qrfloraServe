    var bcrypt = require('bcrypt');
    /*importa javascript web token */
    var jwt = require('jsonwebtoken');
    var confEmail = require('../config/emailpass');
    var nodemailer = require('nodemailer');
    module.exports.register = function(application, req, res) {

        var User = application.app.models.user;

        var salt = bcrypt.genSaltSync(10);
        var password = bcrypt.hashSync(req.body.password, salt);
        var user = new User({
            name: req.body.name,
            email: req.body.email,
            password: password,
            img: req.body.img,
            admin: false,
            token: ""
        });
        user.save(function(err, user) {
            if (err) {
                response = {
                    "Error": true,
                    "Message": err
                }
                return res.status(500).json(response);
            }
            response = {
                "Error": false,
                "Message": "User added with success"
            }

            var transporte = nodemailer.createTransport({
                service: 'Gmail', // Como mencionei, vamos usar o Gmail
                auth: {
                    user: confEmail.email, // Basta dizer qual o nosso usuário
                    pass: confEmail.pass // e a senha da nossa conta
                }
            });

            // Após configurar o transporte chegou a hora de criar um e-mail
            // para enviarmos, para isso basta criar um objeto com algumas configurações
            var email = {
                from: confEmail.email, // Quem enviou este e-mail
                to: req.body.email, // Quem receberá
                subject: 'Ativação da conta', // Um assunto bacana :-) 
                html: '<h3>Obrigado por seu cadastro</h2>' +
                    '<br>Por favor acesse o link: <a href="http://floramap.pe.hu/valida/' +
                    user.id +
                    '>Validar</a>' // O conteúdo do e-mail
            };

            // Pronto, tudo em mãos, basta informar para o transporte
            // que desejamos enviar este e-mail
            transporte.sendMail(email, function(err, info) {
                if (err)
                    throw err; // Oops, algo de errado aconteceu.
                console.log('Email enviado! Leia as informações adicionais: ', info);
            });

            return res.status(200).json(response);
        })




    }

    module.exports.me = function(application, req, res) {
        var User = application.app.models.user;

        User.findOne({
            id: req.params.id
        }, function(err, user) {
            var resUser;
            if (err) {
                response = {
                    "Error": true,
                    "Message": err
                }
                return res.status(500).json(response);
            }
            if (!user) {
                response = {
                    "Error": true,
                    "Message": "Error de busca"
                }
                return res.status(400).json(response);
            }
            resUser = {
                nome: user.name,
                email: user.email,
                admin: user.admin
            }
            return res.status(200).json(resUser);
        })
    }

    module.exports.login = function(application, req, res) {
        var User = application.app.models.user;
        var config = require('../config/config');

        console.log(req.body);
        User.findOne({
            email: req.body.email
        }, function(err, user) {
            if (err) {
                response = {
                    "Error": true,
                    "Message": err
                }
                return res.status(500).json(response);
            }

            if (!user) {
                response = {
                    "Error": true,
                    "Message": "Autenticação Falha"
                }
                return res.status(400).json(response);
            }


            var resulPass = bcrypt.compareSync(req.body.password, user.password);

            if (!resulPass) {
                response = {
                    "Error": true,
                    "Message": "Autenticação Falha"
                };
                return res.status(400).json(response);
            }

            var token = jwt.sign(user, config.secret, {
                expiresIn: 2592e+9
            });

            response = {
                success: "Ok",
                token: token,
                id: user.id
            }

            return res.status(200).json(response);
        })
    }