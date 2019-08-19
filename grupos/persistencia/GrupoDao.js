function GrupoDao(connection) {
    this._connection = connection;
}

GrupoDao.prototype.salva = function(grupo ,callback) {
    this._connection.query('INSERT INTO grupos SET ?', grupo, callback);
}

//Função que salva os ?, ? com os valores dos parâmetros "grupo.status, grupo.grupoLista, grupo.descricao, grupo.quantidade, grupo.id, "
GrupoDao.prototype.atualiza = function(grupo ,callback) {
    this._connection.query('UPDATE grupos SET status = ?, grupo = ?, descricao = ?, quantidade = ? where id = ?', [grupo.status, grupo.listaGrupo, grupo.descricao, grupo.quantidade, grupo.id], callback);
}

GrupoDao.prototype.deletaPorId = function (grupo, callback) {
    this._connection.query("DELETE from grupos where id = ?",[grupo.id], callback);
}

GrupoDao.prototype.buscaPorId = function (id,callback) {
    this._connection.query("select * from grupos where id = ?",[id],callback);
}

module.exports = function(){
    return GrupoDao;
};