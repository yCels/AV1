"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Peca = void 0;
const Enums_1 = require("./Enums");
class Peca {
    nome;
    tipo;
    fornecedor;
    status;
    constructor(nome, tipo, fornecedor) {
        this.nome = nome;
        this.tipo = tipo;
        this.fornecedor = fornecedor;
        this.status = Enums_1.StatusPeca.EM_PRODUCAO;
    }
    atualizarStatus(novoStatus) {
        console.log(`Status da peça '${this.nome}' atualizado de '${this.status}' para '${novoStatus}'.`);
        this.status = novoStatus;
    }
    salvar() {
        console.log(`[Peca] Salvando dados da peça ${this.nome}... (lógica a ser implementada)`);
    }
    carregar() {
        console.log(`[Peca] Carregando dados da peça ${this.nome}... (lógica a ser implementada)`);
    }
}
exports.Peca = Peca;
