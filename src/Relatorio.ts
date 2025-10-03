// src/Relatorio.ts

import { Aeronave } from "./Aeronave";

export class Relatorio {
    
    
    public gerarRelatorio(aeronave: Aeronave): void {
        console.log(`\n<<<<< RELATÓRIO FINAL DE PRODUÇÃO >>>>>`);
        console.log(`AERONAVE CÓDIGO: ${aeronave.codigo}`);
        console.log(`MODELO: ${aeronave.modelo}`);
        console.log(`-----------------------------------------`);
        
        aeronave.detalhes(); 
        console.log(`<<<<< FIM DO RELATÓRIO >>>>>\n`);
    }

    
    public salvarEmArquivo(): void {
        console.log(`[Relatorio] Salvando relatório em arquivo... (lógica a ser implementada)`);
    }
}