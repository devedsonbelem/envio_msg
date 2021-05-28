const Usuario = require("../models/Usuario.model");

exports.testeApi = (req, res) => {
  Usuario.testeApi(req.params.numero, (err, data) => {
    if (err)
      res.send({status: 500, msg: "Número não informado"})
    else res.send(data);
  });
};


exports.create = (req, res) => {
  console.log(req.body);
  if (!req.body) {
    res.status(400).send({
      message: "Objeto não pode ser vazio!"
    });
  }

  const usuario = new Usuario({
    nome: req.body.nome,
    cpf: req.body.cpf,
    numero: req.body.numero,
    email: req.body.email,
    termo: req.body.termo,
  });

  Usuario.create(usuario, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Erro ao criar registro de Usuario."
      });
    else res.send(data);
  });
};

exports.findNumber = (req, res) => {
  Usuario.findByNumber(req.params.numero, (err, data) => {
    if (err)
      res.send({status: 500, msg: "Número não encontrado"})
    else res.send(data);
  });
};

exports.deleteNumber = (req, res) => {
  Usuario.deleteByNumber(req.params.numero, (err, data) => {
    if (err)
      res.send({status: 500, msg: "Número não encontrado"})
    else res.send(data);
  });
};