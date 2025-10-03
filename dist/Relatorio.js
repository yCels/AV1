"use strict";
// src/Relatorio.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.Relatorio = void 0;
class Relatorio {
    gerarRelatorio(aeronave) {
        console.log(`\n<<<<< RELATÓRIO FINAL DE PRODUÇÃO >>>>>`);
        console.log(`AERONAVE CÓDIGO: ${aeronave.codigo}`);
        console.log(`MODELO: ${aeronave.modelo}`);
        console.log(`-----------------------------------------`);
        aeronave.detalhes();
        console.log(`<<<<< FIM DO RELATÓRIO >>>>>\n`);
    }
    salvarEmArquivo() {
        console.log(`[Relatorio] Salvando relatório em arquivo... (lógica a ser implementada)`);
    }
}
exports.Relatorio = Relatorio;
