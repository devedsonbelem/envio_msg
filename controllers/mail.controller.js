const Mail = require("../models/Mail.model");

exports.sendMail = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Objeto não pode ser vazio!"
    });
  }

  const mail = new Mail({
    from: req.body.from,
    subject: req.body.subject,
    msg: req.body.msg
  });

  Mail.send(mail, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Erro ao enviar e-mail."
      });
    else res.send(data);
  });
};
