"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Teste = void 0;
class Teste {
    tipo;
    resultado;
    constructor(tipo, resultado) {
        this.tipo = tipo;
        this.resultado = resultado;
    }
    salvar() {
        console.log(`[Teste] Salvando resultado do teste ${this.tipo}... (lógica a ser implementada)`);
    }
    carregar() {
        console.log(`[Teste] Carregando resultado do teste ${this.tipo}... (lógica a ser implementada)`);
    }
}
exports.Teste = Teste;
