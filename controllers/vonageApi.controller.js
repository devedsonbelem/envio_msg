const VonageApi = require("../models/VonageApi.model");

exports.verifyBySMS = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Objeto não pode ser vazio!"
        });
    }

    const vonageApi = new VonageApi({
        apiKey: req.body.apiKey,
        apiSecret: req.body.apiSecret,
        verifyRequestNumber: req.body.verifyRequestNumber,
        vonageBrandName: req.body.vonageBrandName,
    });

    VonageApi.verify(vonageApi, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Erro ao obter teste."
        });
        else res.send(data);
    })
}

exports.checkSMSCode = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Objeto não pode ser vazio!"
        });
    }

    const vonageApi = new VonageApi({
        apiKey: req.body.apiKey,
        apiSecret: req.body.apiSecret,
        verifyRequestNumber: req.body.verifyRequestNumber,
        vonageBrandName: req.body.vonageBrandName,
        verifyRequestId: req.body.verifyRequestId,
        code: req.body.code
    });

    VonageApi.check(vonageApi, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Erro ao obter teste."
        });
        else res.send(data);
    })
}