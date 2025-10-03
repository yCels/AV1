"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Aeronave = void 0;
class Aeronave {
    codigo;
    modelo;
    tipo;
    capacidade;
    alcance;
    pecas;
    etapas;
    testes;
    constructor(codigo, modelo, tipo, capacidade, alcance) {
        this.codigo = codigo;
        this.modelo = modelo;
        this.tipo = tipo;
        this.capacidade = capacidade;
        this.alcance = alcance;
        this.pecas = [];
        this.etapas = [];
        this.testes = [];
    }
    adicionarTeste(teste) {
        this.testes.push(teste);
        console.log(`Teste de '${teste.tipo}' adicionado à aeronave ${this.codigo}.`);
    }
    adicionarPeca(peca) {
        this.pecas.push(peca);
        console.log(`Peça '${peca.nome}' adicionada à aeronave ${this.codigo}.`);
    }
    adicionarEtapa(etapa) {
        this.etapas.push(etapa);
        console.log(`Etapa '${etapa.nome}' adicionada ao plano de produção da aeronave ${this.codigo}.`);
    }
    detalhes() {
        console.log(`\n--- Ficha Técnica da Aeronave: ${this.codigo} ---`);
    }
    salvar() {
        console.log(`[Aeronave] Salvando dados da aeronave ${this.codigo}... (lógica a ser implementada)`);
    }
    carregar() {
        console.log(`[Aeronave] Carregando dados da aeronave ${this.codigo}... (lógica a ser implementada)`);
    }
}
exports.Aeronave = Aeronave;
