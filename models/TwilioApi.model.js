const { encrypt, decrypt } = require('../helper/crypto');
const Twilio = require('twilio')(decrypt({iv: process.env.ACCOUNT_SID_IV, content: process.env.ACCOUNT_SID_CON}), process.env.AUTH_TOKEN);

const TwilioApi  = function(twilioApi) {
    this.phoneNumber = twilioApi.phoneNumber;
    this.code = twilioApi.code;
    this.msg = twilioApi.msg;
}

TwilioApi.verify = (twilioApi, result) => {
    Twilio.verify.services(process.env.SERVICE_ID).verifications.create({
    to: twilioApi.phoneNumber, channel: process.env.TWILIO_CHANNEL
    }).then(data => {
        let resp = { to: data.to, status: data.status, valid: data.valid }
        result(null, { data: resp, status: 200, msg: "Sucesso ao enviar código!" });
    }).catch(e => { console.error('Error:', e.code, e.message); });
}

TwilioApi.check = (twilioApi, result) => {
    console.log("Verificando o código: ", twilioApi)
    Twilio.verify.services(process.env.SERVICE_ID).verificationChecks.create({
        to: twilioApi.phoneNumber, code: twilioApi.code
    }).then((data) => {
        console.log("Código Verificado!");
        let resp = { to: data.to, status: data.status, valid: data.valid }
        result(null, { data: resp, status: 200, msg: "Sucesso ao validar código!" });
    })
}

TwilioApi.sendWhatsappMessage = (twilioApi, result) => {
    Twilio.messages
        .create({
            from: 'whatsapp:+1111111111111',
            body: 'Mensagem de teste do site FuiClonado, favor ignorar!',
            to: 'whatsapp:+11111111111'
        })
        .then(message => {
            console.log("")
          console.log(message.sid)
        });
}

TwilioApi.sendSMSMessage = (twilioApi, result) => {
    console.log("VALOR DE TWILIO API: ", twilioApi)
    const bindingOpts = {
        identity: '00000001', // We recommend using a GUID or other anonymized identifier for Identity.
        bindingType: 'sms',
        address: twilioApi.phoneNumber
    };

    const notificationOpts = {
        identity: '00000001', // We recommend using a GUID or other anonymized identifier for Identity.
        body: twilioApi.msg,
        // body: 'Knok-Knok! This is your first Notify SMS',
    };

    Twilio.notify
        .services(process.env.SMS_SERVICE_ID)
        .bindings.create(bindingOpts)
        .then(binding => console.log(binding.sid))
        .catch(error => console.log(error))
        .done();
    
    Twilio.notify
        .services(process.env.SMS_SERVICE_ID)
        .notifications.create(notificationOpts)
        .then(notification => console.log(notification.sid))
        .catch(error => console.log(error));
}

TwilioApi.sendSMSMessageOnly = (twilioApi, result) => {
    const sender = decrypt({iv: process.env.TWILIO_IV, content: process.env.TWILIO_CON})
    console.log("VALOR DE TWILIO API: ", twilioApi)

    const targetPhone = twilioApi.phoneNumber[0];
    const isLastPhone = targetPhone === twilioApi.phoneNumber[twilioApi.phoneNumber.length -1] ? true : false

    if (twilioApi.phoneNumber.length > 1) {
        console.log("Enviando para telefone: ", targetPhone)
        Twilio.messages.create({
            body: twilioApi.msg,
            from: sender,
            to: targetPhone
        }).then(message => {
            console.log(message.sid)

            if (!isLastPhone) {
                let novoArray = arraySemItemcorrente(twilioApi.phoneNumber, targetPhone)
                enviarMsg(novoArray, twilioApi.msg, sender, result)
            }

        })
        .catch(error => console.log(error));
    }
    else {
        console.log("Enviando para telefone: ", targetPhone)
        Twilio.messages.create({
            body: twilioApi.msg,
            from: sender,
            to: targetPhone
        }).then(message => { 
            console.log(message.sid) 
            result(null, { status: 200, msg: "Mensagens enviadas com sucesso!" });
        }).catch(error => console.log(error));
    }
}

function enviarMsg(novoArray, msg, sender, result) {
    console.log('VALOR DE ARRAY: ', novoArray)
    const targetPhone = novoArray[0];
    const isLastPhone = targetPhone === novoArray[novoArray.length -1] ? true : false

    if (novoArray.length > 1) {
        console.log("Enviando para telefone: ", targetPhone)
        Twilio.messages.create({
            body: msg,
            from: sender,
            to: targetPhone
        }).then(message => {
            console.log(message.sid)

            if (!isLastPhone) {
                let array = arraySemItemcorrente(novoArray, targetPhone)
                enviarMsg(array, msg, sender)
            }

        })
        .catch(error => console.log(error));
    }
    else {
        console.log("Enviando para telefone: ", targetPhone)
        Twilio.messages.create({
            body: msg,
            from: sender,
            to: targetPhone
        }).then(message => { 
            console.log(message.sid)
            result(null, { status: 200, msg: "Mensagens enviadas com sucesso!" });
        }).catch(error => console.log(error));
    }
}

function arraySemItemcorrente(array, itemCorrente) {
    let novoArray = []

    for (let index = 0; index < array.length; index++) {
        const item = array[index];
        
        if (item !== itemCorrente)
            novoArray.push(item)
    }

    return novoArray
}

module.exports = TwilioApi;
