module.exports = app => {
    const contatosGmail = require("../controllers/contatosGmail.controller");
      
    app.post("/obterContatos", contatosGmail.getContatosGmail);
};