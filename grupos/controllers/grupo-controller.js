//Classe responsável por exportar rotas 

var Grupo = require("../models/Grupo.js");

var Contato = require("../models/Contato.js");

module.exports = function(app) {
    //Criando uma rota do tipo GET
    app.get("/grupos", function(req, resp){
        console.log("Recebida a requisição de grupo na porta 3000");
        resp.send("ok"); 
    });

    //CRIANDO UMA ROTA DO TIPO GET
    //ROTA QUE IRÁ LISTAR OS DADOS DE UM GRUPO
    //TODO:
    app.get("/grupos/grupo/:id", function(req, resp) {

        var id = req.params.id;                                             //Pegando o ID
        console.log("Consultando o grupo com o id: " + id);

        var connection = app.persistencia.connectionFactory();              //Pegando a Conexão
        var grupoDao = new app.persistencia.GrupoDao(connection);           //Pegando o DAO

        //Resultado = Dados que vem do BANCO DE DADOS
        grupoDao.buscaPorId(id, function(erro, resultado) {
          if (erro) {
            console.log("Erro ao consultar no banco" + erro);
            resp.status(500).send(erro);
            return;
          }
            //stringify = Converte os valores em String JSON
            console.log("Grupo encontrado: " + JSON.stringify(resultado));
            resp.json(resultado);                                           //Devolvendo o resultado em formato de JSON
            return;
        });
        
    });

    //CRIANDO UMA ROTA DO TIPO DELETE
    //ROTA QUE IRÁ DELETAR OS DADOS DE UM GRUPO
    app.delete("/grupos/grupo/:id", function(req, resp){
        var grupo = {};
            var id = req.params.id;                                          //Recebendo uma requisição de um parâmetro ID

            grupo.id = id;                                                   //Atribuindo o ID da URL ao grupo.id
          
            var connection = app.persistencia.connectionFactory();           //Pegando a conexão
            var grupoDao = new app.persistencia.GrupoDao(connection);        //Pegando o DAO

            grupoDao.deletaPorId(grupo, function(erro){
                if (erro){
                    resp.status(500).send(erro);
                    return;
                }
            console.log("Grupo deletado!" + JSON.stringify(grupo));           //stringify = Converte os valores em String JSON
            resp.status(204).send(grupo);                                     //Status code não mais disponível
        });
    });

    //CRIANDO UMA ROTA DO TIPO PUT
    //ROTA QUE IRÁ ATUALIZAR OS DADOS
    app.put("/grupos/grupo/:id", function(req, resp){
            var grupo = {};
            
            const listaGrupo = req.body.grupo.substring(0, 150);              //Pegando um grupo a partir do corpo da pagina
            grupo.listaGrupo = listaGrupo;                                              

            const quantidade = req.body.quantidade.substring(0, 150);         //Pegando um grupo a partir do corpo da pagina
            grupo.quantidade = quantidade;

            const descricao = req.body.descricao.substring(0, 150);           //Pegando um grupo a partir do corpo da pagina
            grupo.descricao = descricao;

            var id = req.params.id;                                           //Recebendo uma requisição de um parâmetro ID
            grupo.id = id;                                                    //Atribuindo o ID da URL ao grupo.id
            grupo.status = "ATUALIZADO";

            var connection = app.persistencia.connectionFactory();            //Pegando a conexão
            var grupoDao = new app.persistencia.GrupoDao(connection);         //Pegando o DAO

            //Função que atualiza o status
            grupoDao.atualiza(grupo, function(erro){
                if (erro){
                    resp.status(500).send(erro);
                    return;
                }
            console.log("Grupo atualizado!" + JSON.stringify(grupo));          //stringify = Converte os valores em String JSON
            resp.json(grupo);                                                  //Devolvendo o resultado em formato de JSON
        });
    });

    //CRIANDO UMA ROTA DO TIPO POST
    //ROTA QUE IRÁ CRIAR UM GRUPO COM SEUS DADOS
    app.post("/grupos/grupo", function (req, resp){
        
        console.log("Recebendo uma requisição de um novo grupo!");
        
        var grupo = new Grupo(req.body.grupo, parseInt(req.body.quantidade), req.body.descricao);
        console.log(grupo);

        var contato = new Contato(req.body.nomeContato, parseInt(req.body.numeroTelefone));
        console.log(contato);
        

        //Quais são os erros de validação encontrados nessa validação
        var erros = req.validationErrors();

        if (erros){
            console.log("Erros de validação encontrados");
            resp.status(400).send(erros);
            return;
        }

        grupo.status = "CRIADO";
        grupo.data = new Date;

        var connection = app.persistencia.connectionFactory();                //Pegando a conexão
        var grupoDao = new app.persistencia.GrupoDao(connection);             //Pegando o DAO

        grupoDao.salva(grupo, function(erro, resultado){
            //Se acontecer algum erro, faça
            if(erro) {
                console.log("Erro ao inserir no banco:" + erro);
                resp.status(500).send(erro);
            } else {
                grupo.id = resultado.insertId; //Inserindo um ID
                console.log("Grupo criado!");
            }

            resp.location("/grupos/grupo" + grupo.id);

            console.log("Grupo criado!" + JSON.stringify(grupo));

            resp.status(201).json(grupo);                                     //Devolvendo o resultado em formato de JSON
        });

    });
}

