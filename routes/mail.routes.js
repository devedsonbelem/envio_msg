module.exports = app => {
    const mail = require("../controllers/mail.controller");
      
    app.post("/sendMail", mail.sendMail);
};