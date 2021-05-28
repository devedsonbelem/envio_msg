const TwilioApi = require("../models/TwilioApi.model");

exports.verifyBySMS = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Objeto não pode ser vazio!"
        });
    }

    const twilioApi = new TwilioApi({
        phoneNumber: req.body.phoneNumber,
    });

    TwilioApi.verify(twilioApi, (err, data) => {
        // if (err)
        //     res.status(500).send({
        //         message:
        //             err.message || "Erro ao obter teste."
        // });
        // else 
        res.send(data);
    })
}

exports.checkSMSCode = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Objeto não pode ser vazio!"
        });
    }

    const twilioApi = new TwilioApi({
        phoneNumber: req.body.phoneNumber,
        code: req.body.code
    });

    TwilioApi.check(twilioApi, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Erro ao obter teste."
        });
        else res.send(data);
    })
}

exports.sendMessage = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Objeto não pode ser vazio!"
        });
    }

    const twilioApi = new TwilioApi({
        phoneNumber: req.body.phoneNumber,
        code: req.body.code
    });

    TwilioApi.sendWhatsappMessage(twilioApi, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Erro ao obter teste."
        });
        else res.send(data);
    })
}

exports.sendSMSMessage = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Objeto não pode ser vazio!"
        });
    }

    const twilioApi = new TwilioApi({
        phoneNumber: req.body.phoneNumber,
        msg: req.body.msg
    });

    TwilioApi.sendSMSMessage(twilioApi, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Erro ao obter teste."
        });
        else res.send(data);
    })
}

exports.sendSMSMessageOnly = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Objeto não pode ser vazio!"
        });
    }

    const twilioApi = new TwilioApi({
        phoneNumber: req.body.phoneNumber,
        msg: req.body.msg
    });

    TwilioApi.sendSMSMessageOnly(twilioApi, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Erro ao obter teste."
        });
        else res.send(data);
    })
}