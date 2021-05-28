module.exports = app => {
    const usuario = require("../controllers/usuario.controller");
      
    app.post("/usuario", usuario.create);
    app.get("/usuario/:numero", usuario.findNumber);
    app.delete("/usuario/:numero", usuario.deleteNumber);
    app.get("/usuario/:numero", usuario.testeApi);
};
  