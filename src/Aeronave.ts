import { TipoAeronave } from "./Enums";
import { Peca } from "./Peca";
import { Etapa } from "./Etapa";
import { Teste } from "./Teste"; 

export class Aeronave {
    readonly codigo: string;
    public modelo: string;
    public tipo: TipoAeronave;
    public capacidade: number;
    public alcance: number;

    public pecas: Peca[];
    public etapas: Etapa[];
    public testes: Teste[];

    constructor(codigo: string, modelo: string, tipo: TipoAeronave, capacidade: number, alcance: number) {
        this.codigo = codigo;
        this.modelo = modelo;
        this.tipo = tipo;
        this.capacidade = capacidade;
        this.alcance = alcance;

        this.pecas = [];
        this.etapas = [];
        this.testes = []; 
    }

    
    public adicionarTeste(teste: Teste): void {
        this.testes.push(teste);
        console.log(`Teste de '${teste.tipo}' adicionado à aeronave ${this.codigo}.`);
    }

    public adicionarPeca(peca: Peca): void {
        this.pecas.push(peca);
        console.log(`Peça '${peca.nome}' adicionada à aeronave ${this.codigo}.`);
    }

    public adicionarEtapa(etapa: Etapa): void {
        this.etapas.push(etapa);
        console.log(`Etapa '${etapa.nome}' adicionada ao plano de produção da aeronave ${this.codigo}.`);
    }
    
    
    public detalhes(): void {
        console.log(`\n--- Ficha Técnica da Aeronave: ${this.codigo} ---`);
        
    }

    
    public salvar(): void {
        console.log(`[Aeronave] Salvando dados da aeronave ${this.codigo}... (lógica a ser implementada)`);
    }

    
    public carregar(): void {
        console.log(`[Aeronave] Carregando dados da aeronave ${this.codigo}... (lógica a ser implementada)`);
    }
}