import { TipoAeronave } from "./Enums";
import { Peca } from "./Peca";
import { Etapa } from "./Etapa";
import { Teste } from "./Teste";
import { Funcionario } from "./Funcionario";
import * as fs from 'fs';
import * as path from 'path';

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
        console.log(`   Modelo: ${this.modelo} | Tipo: ${this.tipo}`);
        console.log(`   Capacidade: ${this.capacidade} | Alcance: ${this.alcance} km`);

        console.log('\n   --- Peças Associadas ---');
        this.pecas.forEach(p => console.log(`   - ${p.nome} (Status: ${p.status})`));

        console.log('\n   --- Etapas de Produção ---');
        this.etapas.forEach(e => console.log(`   - ${e.nome} (Status: ${e.status})`));

        console.log('\n   --- Testes Realizados ---');
        this.testes.forEach(t => console.log(`   - Teste ${t.tipo}: ${t.resultado}`));
        console.log('-------------------------------------------');


    }

    static salvarTodos(aeronaves: Aeronave[]): void {
        const caminhoArquivo = path.join(__dirname, '..', 'dados', 'aeronaves.json');
        try {
            const dadosJson = JSON.stringify(aeronaves, null, 2);
            fs.writeFileSync(caminhoArquivo, dadosJson, 'utf-8');
        } catch (err) {
            console.error('Erro ao salvar as aeronaves:', err);
        }
    }



    static carregar(): Aeronave[] {
        const caminhoArquivo = path.join(__dirname, '..', 'dados', 'aeronaves.json');

        try {
            if (!fs.existsSync(caminhoArquivo)) {
                return [];
            }

            const dadosJson = fs.readFileSync(caminhoArquivo, 'utf-8');
            const aeronavesDados = JSON.parse(dadosJson);

           
            return aeronavesDados.map((dado: any) => {
                const aeronave = new Aeronave(dado.codigo, dado.modelo, dado.tipo, dado.capacidade, dado.alcance);


                aeronave.pecas = (dado.pecas || []).map((p: any) => {
                    const peca = new Peca(p.nome, p.tipo, p.fornecedor);
                    peca.status = p.status; 
                    return peca;
                });

                aeronave.etapas = (dado.etapas || []).map((e: any) => {
                    const etapa = new Etapa(e.nome, new Date(e.prazo));
                    etapa.status = e.status; 
                    etapa.funcionarios = (e.funcionarios || []).map((func: any) =>
                        new Funcionario(
                            func.id, func.nome, func.telefone, func.endereco,
                            func.usuario, func.senha_hash, func.nivelPermissao
                        )
                    );
                    return etapa;
                });

                aeronave.testes = (dado.testes || []).map((t: any) => new Teste(t.tipo, t.resultado));

                return aeronave;
            });
        } catch (err) {
            console.error(`Erro ao carregar as aeronaves: ${err}`);
            return [];
        }
    }

}
