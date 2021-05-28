module.exports = app => {
    const vonageApi = require("../controllers/vonageApi.controller");
      
    app.post("/verify", vonageApi.verifyBySMS);
    app.post("/checkCode", vonageApi.checkSMSCode)
};