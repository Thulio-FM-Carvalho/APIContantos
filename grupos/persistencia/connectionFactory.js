var mysql  = require('mysql'); //Importando o módulo MYSQL

//Criando uma função que cria a conexão MYSQL
function createDBConnection(){
        return mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '',
            database: 'apicontatos',
            port: 3307
        });
}

module.exports = function() {
    return createDBConnection;
}