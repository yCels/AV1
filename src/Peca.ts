import { TipoPeca, StatusPeca } from "./Enums";

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

    
    public salvar(): void {
        console.log(`[Peca] Salvando dados da peça ${this.nome}... (lógica a ser implementada)`);
    }

    
    public carregar(): void {
        console.log(`[Peca] Carregando dados da peça ${this.nome}... (lógica a ser implementada)`);
    }
}