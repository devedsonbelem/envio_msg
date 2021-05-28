const nodemailer = require('nodemailer');

const Mail  = function(mail) {
    this.from = mail.from;
    this.subject = mail.subject;
    this.msg = mail.msg;
}

Mail.send = (mail, result) => {
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'fuiclonadowpp@gmail.com',
            pass: 'Adminfc2020'
        }
    });

    var mailOptions = {
        from: mail.from,
        to: 'william.escm@gmail.com',
        subject: mail.subject,
        text: mail.msg
    };

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
            result(null, { status: 500, msg: "Falha no transporter ao enviar e-mail!" });
        } else {
            console.log('Email enviado: ' + info.response);
            result(null, { status: 200, msg: "Enviado!" });
        }
    });    
}

module.exports = Mail;
