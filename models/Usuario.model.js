const sql = require("./db");

const Usuario  = function(usuario) {
  this.id = usuario.id;
  this.nome = usuario.nome;
  this.cpf = usuario.cpf;
  this.numero = usuario.numero;
  this.email = usuario.email;
  this.termo = usuario.termo;
}

Usuario.testeApi = (numero, result) => {
  console.log("Valor de numero: ", numero)
  let mensagem = "Numero: " + numero + ". A Api está funcionando!";
  result(null, { status: 200 , msg: mensagem});
  return;
}

Usuario.create = (novoUsuario, result) => {
  let query = `INSERT INTO usuarios (nome,cpf,numero,email,termo) VALUES ('${novoUsuario.nome}','${novoUsuario.cpf}','${novoUsuario.numero}','${novoUsuario.email}','${novoUsuario.termo}')`;
  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
  
    console.log("Novo Usuario cadastrado: ", { id: res.insertId, ...novoUsuario });
    result(null, { id: res.insertId, status: 200, ...novoUsuario });
  });        
}

Usuario.findByNumber = (numero, result) => {
  sql.query(`SELECT * FROM usuarios WHERE numero LIKE '%${numero}%'`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, { status: 500, msg: "Numero não encontrado"});
      return;
    }

    if (res.length) {
      console.log("Número encontrado: ", res[0]);
      result(null, { status: 200, ...res[0]});
      return;
    }

    result({ kind: "not_found" }, null);
  });
};

Usuario.deleteByNumber = (numero, result) => {
  sql.query(`SELECT * FROM usuarios WHERE numero LIKE '%${numero}%'`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, { status: 500, msg: "Numero não encontrado"});
      return;
    }
    
    if (res.length) {
      let values = ''
      let lastValue = res[res.length - 1].id

      for (let i = 0; i < res.length; i++) {        
        if (res[i].id !== lastValue)
          values += res[i].id + ', '
        else
          values += res[i].id
      }

      sql.query(`DELETE FROM usuarios WHERE id IN (${values})`, (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(null, { status: 500, msg: "ID não encontrado"});
          return;
        }
        
        result(null, { status: 200, msg: `O número: ${numero} foi recuperado`, ...res[0]});
      }); 
    } else {
      result({ kind: "not_found" }, null);
    }
  });
};

module.exports = Usuario;
