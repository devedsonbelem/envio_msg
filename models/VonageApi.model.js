const Nexmo = require('nexmo');

const VonageApi  = function(vonageApi) {
    this.apiKey = vonageApi.apiKey;
    this.apiSecret = vonageApi.apiSecret;
    this.verifyRequestNumber = vonageApi.verifyRequestNumber;
    this.vonageBrandName = vonageApi.vonageBrandName;
    this.verifyRequestId = vonageApi.verifyRequestId;
    this.code = vonageApi.code;
}

VonageApi.verify = (vonageApi, result) => {
    const nexmo = new Nexmo(
        {
            apiKey: vonageApi.apiKey,
            apiSecret: vonageApi.apiSecret,
        },
        {
            debug: true,
        }
    );

    nexmo.verify.request(
        {
            number: vonageApi.verifyRequestNumber,
            brand: vonageApi.vonageBrandName,
        },
        (err, result) => {
            if (err) {
                console.error(err);
                // result(null, { status: 500, msg: "Falha ao enviar SMS!" });
            } else {
                verifyRequestId = result.request_id;
                console.log(`request_id: ${verifyRequestId}`);
                // result(null, { status: 200, msg: "SMS enviado!", requestId: verifyRequestId });
            }
        }
    );  
}

VonageApi.check = (vonageApi, result) => {
    const nexmo = new Nexmo(
        {
            apiKey: vonageApi.apiKey,
            apiSecret: vonageApi.apiSecret,
        },
        {
            debug: true,
        }
    );

    nexmo.verify.check(
        {
            request_id: vonageApi.verifyRequestId,
            code: vonageApi.code,
        },
        (err, result) => {
            if (err) {
                console.error(err);
                // result(null, { status: 500, msg: "Falha ao verificar o SMS!" });
            } else {
                if (result.status == 0) {
                    // User provided correct code, so create a session for that user
                    // req.session.user = {
                    //     number: verifyRequestNumber,
                    // };
                    console.log("SMS Verificado!")
                    // result(null, { status: 200, msg: "SMS verificado!", number: vonageApi.verifyRequestNumber });
                }
            }
        }
    );
}



module.exports = VonageApi;
