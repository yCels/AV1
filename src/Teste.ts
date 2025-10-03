import { TipoTeste, ResultadoTeste } from "./Enums";

export class Teste {
    public tipo: TipoTeste;
    public resultado: ResultadoTeste;

    constructor(tipo: TipoTeste, resultado: ResultadoTeste) {
        this.tipo = tipo;
        this.resultado = resultado;
    }

    
    public salvar(): void {
        console.log(`[Teste] Salvando resultado do teste ${this.tipo}... (lógica a ser implementada)`);
    }

    
    public carregar(): void {
        console.log(`[Teste] Carregando resultado do teste ${this.tipo}... (lógica a ser implementada)`);
    }
}