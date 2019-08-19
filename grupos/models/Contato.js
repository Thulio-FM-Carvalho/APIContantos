module.exports = class Contato {
    constructor (nomeContato, numeroTelefone){
        this.nomeContato = nomeContato;
        this.numeroTelefone = numeroTelefone;
    }

    getNomeContato(){
        return this.nomeContato;
    }

    getNumeroTelefone(){
        return this.numeroTelefone;
    }

    setNomeContato(nomeContato){
        this.nomeContato = nomeContato;
    }

    setNumeroTelefone(numeroTelefone){
        this.numeroTelefone = numeroTelefone;
    }

}