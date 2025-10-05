import * as fs from 'fs';
import * as path from 'path';
import { Aeronave } from "./Aeronave";

export class Relatorio {
    
    /**
     
     * @param aeronave O objeto da aeronave.
     * @param nomeCliente O nome do cliente final.
     * @param dataEntrega A data de entrega combinada.
     */
    public gerarEsalvar(aeronave: Aeronave, nomeCliente: string, dataEntrega: Date): void {
        
       
        let conteudo = '=========================================\n';
        conteudo += '    RELATÓRIO FINAL DE PRODUÇÃO\n';
        conteudo += '=========================================\n\n';
        
        conteudo += `Cliente: ${nomeCliente}\n`;
        conteudo += `Data de Entrega: ${dataEntrega.toLocaleDateString('pt-BR')}\n\n`;
        
        conteudo += `--- Ficha Técnica da Aeronave ---\n`;
        conteudo += `Código: ${aeronave.codigo}\n`;
        conteudo += `Modelo: ${aeronave.modelo}\n`;
        conteudo += `Tipo: ${aeronave.tipo}\n`;
        conteudo += `Capacidade: ${aeronave.capacidade} passageiros\n`;
        conteudo += `Alcance: ${aeronave.alcance} km\n\n`;
        
        conteudo += `--- Peças Associadas ---\n`;
        aeronave.pecas.forEach(p => {
            conteudo += `- ${p.nome} (Fornecedor: ${p.fornecedor}) - Status: ${p.status}\n`;
        });
        
        conteudo += `\n--- Plano de Produção (Etapas) ---\n`;
        aeronave.etapas.forEach(e => {
            conteudo += `- ${e.nome} (Prazo: ${e.prazo.toLocaleDateString('pt-BR')}) - Status: ${e.status}\n`;
        });

        conteudo += `\n--- Testes Realizados ---\n`;
        aeronave.testes.forEach(t => {
            conteudo += `- Teste ${t.tipo}: ${t.resultado}\n`;
        });

        conteudo += '\n=========================================\n';
        
        
        this.salvarEmArquivo(conteudo, aeronave.codigo);
    }
    
    private salvarEmArquivo(conteudo: string, codigoAeronave: string): void {
        const diretorioRelatorios = path.join(__dirname, '..', 'relatorios');
       
        const caminhoArquivo = path.join(diretorioRelatorios, `Relatorio-${codigoAeronave}.txt`);

        try {
            if (!fs.existsSync(diretorioRelatorios)) {
                fs.mkdirSync(diretorioRelatorios, { recursive: true });
            }

            fs.writeFileSync(caminhoArquivo, conteudo, 'utf-8');
            console.log(`\n*** Relatório salvo com sucesso em: ${caminhoArquivo} ***`);

        } catch (error) {
            console.error('Erro ao salvar o relatório em arquivo:', error);
        }
    }
}