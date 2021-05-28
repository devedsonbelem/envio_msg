const express = require("express");
const bodyParser = require("body-parser");
const cors = require('cors')
require('dotenv').config()

const app = express();

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header("Access-Control-Allow-Credentials", "true");
  res.header('Access-Control-Allow-Methods',  'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'X-Requested-With,   Content-Type, X-Codingpedia, Authorization');
  next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({ apiStatus: "ok" });
});

require("./routes/numeroClonado.routes")(app);
require("./routes/mail.routes")(app);
require("./routes/contatosGmail.routes")(app);
require("./routes/vonageApi.routes")(app);
require("./routes/twilioApi.routes")(app);
require("./routes/usuario.routes")(app);

const PORT = process.env.PORT || 21000
var server = app.listen(PORT, () => {
    console.log('Start port ' + PORT)
    console.log('Servidor iniciado na porta ' + PORT)
});

server.timeout = 300000;