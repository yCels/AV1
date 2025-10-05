import { TipoTeste, ResultadoTeste } from "./Enums";
import * as fs from 'fs';
import * as path from 'path';

export class Teste {
    public tipo: TipoTeste;
    public resultado: ResultadoTeste;

    constructor(tipo: TipoTeste, resultado: ResultadoTeste) {
        this.tipo = tipo;
        this.resultado = resultado;
    }


    static salvarTodos(testes: Teste[]): void {
        const caminhoArquivo = path.join(__dirname, '..', 'dados', 'testes.json');
        try {
            const dadosJson = JSON.stringify(testes, null, 2);
            fs.writeFileSync(caminhoArquivo, dadosJson, 'utf-8');
        } catch (err) {
            console.error('Erro ao salvar os testes:', err);
        }
    }


    static carregar(): Teste[] {

        const caminhoArquivo = path.join(__dirname, '..', 'dados', 'testes.json');
        try {
            if (!fs.existsSync(caminhoArquivo)) {
                return [];
            }

            const dadosJson = fs.readFileSync(caminhoArquivo, 'utf-8');
            const testesDados = JSON.parse(dadosJson);

            // Converte os dados brutos em instâncias da classe Teste
            return testesDados.map((dado: any) => new Teste(dado.tipo, dado.resultado));

        } catch (err) {
            console.error(`Erro ao carregar os testes: ${err}`);
            return [];
        }
    }
}