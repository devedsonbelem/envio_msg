var http = require('https');
var xml2js = require('xml2js');

const ContatosGmail = function(token) {
    this.url = token.url;
    this.tokenType = token.tokenType;
    this.accessToken = token.accessToken;
}

ContatosGmail.getContatos = (token, result) => {
    const options = {
        hostname: 'www.google.com',
        path: '/m8/feeds/contacts/default/full/',
        method: 'GET',
        headers: {
            'Authorization': `${token.tokenType} ${token.accessToken}`,
            'Content-Type': 'application/json',
        }
    }

    http.get(options, (resp) => {
    let data = '';

    resp.on('data', (chunk) => {
        data += chunk;
    });

    resp.on('end', () => {
        var jsonData
        xml2js.parseString(data, (err, result) => {
            if(err) { throw err; }
            jsonData = JSON.stringify(result, null, 4);            
        });
        
        result(null, { data: JSON.parse(jsonData).feed.entry, status: 200, msg: "Sucesso ao obter contatos do Google!" });
    });

    }).on("error", (err) => {
        result(null, { data: err, status: 500, msg: "Falha ao obter os contatos do Google!" });
    });
}

module.exports = ContatosGmail;