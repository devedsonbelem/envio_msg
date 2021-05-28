const ContatosGmail = require("../models/ContatosGmail.model");

exports.getContatosGmail = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Objeto não pode ser vazio!"
        });
    }

    const contatosGmail = new ContatosGmail({
        url: req.body.url,
        tokenType: req.body.tokenType,
        accessToken: req.body.accessToken
    });

    ContatosGmail.getContatos(contatosGmail, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Erro ao obter teste."
        });
        else res.send(data);
    })
}