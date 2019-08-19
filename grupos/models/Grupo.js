var Contato = require("../models/Contato.js");

module.exports = class Grupo {
    
    //Definindo um construtor
    //Definindo as características da classe com seus respectivos valores padrão!
    constructor(nome, quantidade, descricao){
        this.nome = nome;
        this.quantidade = quantidade;
        this.descricao = descricao;
        // Object.freeze(this); //Todo objeto que será instanciado será congelado
    }

    

    getNome() {
        return this.nome;
    } 

    getQuantidade() {
        return this.quantidade;
    }

    getDescricao() {
        return this.descricao;
    }

    setNome(nome) {
        this.nome = nome;
    }

    setQuantidade(quantidade){
        this.quantidade = quantidade;
    }

    setDescricao(descricao){
        this.descricao = descricao;
    }
}

