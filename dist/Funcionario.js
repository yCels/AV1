"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Funcionario = void 0;
class Funcionario {
    id;
    nome;
    telefone;
    endereco;
    usuario;
    senha_hash;
    nivelPermissao;
    constructor(id, nome, telefone, endereco, usuario, senha_hash, nivel) {
        this.id = id;
        this.nome = nome;
        this.telefone = telefone;
        this.endereco = endereco;
        this.usuario = usuario;
        this.senha_hash = senha_hash;
        this.nivelPermissao = nivel;
    }
    autenticarUsuario(usuario, senha_hash_fornecida) {
        console.log("-> Lógica de autenticação a ser implementada!");
        return this.usuario === usuario && this.senha_hash === senha_hash_fornecida;
    }
    salvar() {
        console.log(`[Funcionario] Salvando dados de ${this.nome}... (lógica a ser implementada)`);
    }
    carregar() {
        console.log(`[Funcionario] Carregando dados de ${this.nome}... (lógica a ser implementada)`);
    }
}
exports.Funcionario = Funcionario;
