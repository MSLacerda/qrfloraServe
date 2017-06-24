module.exports.email = function(req, res, next) {

    var confEmail = require('../config/emailpass');

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
            req.body.id +
            '>Validar</a>' // O conteúdo do e-mail
    };

    // Pronto, tudo em mãos, basta informar para o transporte
    // que desejamos enviar este e-mail
    transporte.sendMail(email, function(err, info) {
        if (err)
            throw err; // Oops, algo de errado aconteceu.
        console.log('Email enviado! Leia as informações adicionais: ', info);
    });
}