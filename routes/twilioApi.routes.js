module.exports = app => {
    const twilioApi = require("../controllers/twilioApi.controller");
      
    app.post("/verifyNumber", twilioApi.verifyBySMS);
    app.post("/checkCodeNumber", twilioApi.checkSMSCode)
    app.post("/sendWhatsappMessage", twilioApi.sendMessage)
    app.post("/sendSMSMessage", twilioApi.sendSMSMessage)
    app.post("/sendSMSMessageOnly", twilioApi.sendSMSMessageOnly)
};