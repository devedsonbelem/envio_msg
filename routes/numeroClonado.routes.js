module.exports = app => {
    const numeroClonado = require("../controllers/numeroClonado.controller");
      
    app.post("/numeroClonado", numeroClonado.create);
    app.get("/numeroClonado/:numero", numeroClonado.findNumber);
    app.delete("/numeroClonado/:numero", numeroClonado.deleteNumber);
    app.get("/numeroClonadoTeste/:numero", numeroClonado.testeApi);
};
  