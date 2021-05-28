const sql = require("./db");

const NumeroClonado  = function(numeroClonado) {
  this.id = numeroClonado.id;
  this.nome = numeroClonado.nome;
  this.cpf = numeroClonado.cpf;
  this.numero = numeroClonado.numero;
  this.email = numeroClonado.email;
  this.termo = numeroClonado.termo;
}

NumeroClonado.testeApi = (numero, result) => {
  console.log("Valor de numero: ", numero)
  let mensagem = "Numero: " + numero + ". A Api está funcionando!";
  result(null, { status: 200 , msg: mensagem});
  return;
}

NumeroClonado.create = (novoNumeroClonado, result) => {
  let query = `INSERT INTO numerosClonados (nome,cpf,numero,email,termo) VALUES ('${novoNumeroClonado.nome}','${novoNumeroClonado.cpf}','${novoNumeroClonado.numero}','${novoNumeroClonado.email}','${novoNumeroClonado.termo}')`;
  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
  
    console.log("Novo Numero Clonado cadastrado: ", { id: res.insertId, ...novoNumeroClonado });
    result(null, { id: res.insertId, status: 200, ...novoNumeroClonado });
  });        
}

NumeroClonado.findByNumber = (numero, result) => {
  sql.query(`SELECT * FROM numerosClonados WHERE numero LIKE '%${numero}%'`, (err, res) => {
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

NumeroClonado.deleteByNumber = (numero, result) => {
  sql.query(`SELECT * FROM numerosClonados WHERE numero LIKE '%${numero}%'`, (err, res) => {
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

      sql.query(`DELETE FROM numerosClonados WHERE id IN (${values})`, (err, res) => {
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

module.exports = NumeroClonado;
