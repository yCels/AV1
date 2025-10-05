import { TipoPeca, StatusPeca } from "./Enums";
import * as fs from 'fs';
import * as path from 'path';

export class Peca {
    public nome: string;
    public tipo: TipoPeca;
    public fornecedor: string;
    public status: StatusPeca;

    constructor(nome: string, tipo: TipoPeca, fornecedor: string) {
        this.nome = nome;
        this.tipo = tipo;
        this.fornecedor = fornecedor;
        this.status = StatusPeca.EM_PRODUCAO;
    }

    public atualizarStatus(novoStatus: StatusPeca): void {
        console.log(`Status da peça '${this.nome}' atualizado de '${this.status}' para '${novoStatus}'.`);
        this.status = novoStatus;
    }


    static salvarTodos(pecas: Peca[]): void {
        const caminhoArquivo = path.join(__dirname, '..', 'dados', 'pecas.json');
        try {
            const dadosJson = JSON.stringify(pecas, null, 2);
            fs.writeFileSync(caminhoArquivo, dadosJson, 'utf-8');
        } catch (err) {
            console.error('Erro ao salvar as peças:', err);
        }
    }



    static carregar(): Peca[] {
        const caminhoArquivo = path.join(__dirname, '..', 'dados', 'pecas.json');

        try {
            if (!fs.existsSync(caminhoArquivo)) {
                return [];
            }

            const dadosJson = fs.readFileSync(caminhoArquivo, 'utf-8');
            const pecasDados = JSON.parse(dadosJson);

            
            return pecasDados.map((dado: any) => {
                
                const peca = new Peca(dado.nome, dado.tipo, dado.fornecedor);
                peca.status = dado.status;
                return peca;
            });
        } catch (err) {
            console.error(`Erro ao carregar as peças: ${err}`);
            return [];
        }
    }

}