import { StatusEtapa } from "./Enums";
import { Funcionario } from "./Funcionario";
import * as fs from 'fs';
import * as path from 'path';

export class Etapa {
    public nome: string;
    public prazo: Date;
    public status: StatusEtapa;
    public funcionarios: Funcionario[];

    constructor(nome: string, prazo: Date) {
        this.nome = nome;
        this.prazo = prazo;
        this.status = StatusEtapa.PENDENTE;
        this.funcionarios = [];
    }


    public iniciar(): void {
        console.log(`A etapa '${this.nome}' foi iniciada.`);
        this.status = StatusEtapa.EM_ANDAMENTO;
    }


    public finalizar(): void {
        console.log(`A etapa '${this.nome}' foi concluída.`);
        this.status = StatusEtapa.CONCLUIDA;
    }


    public associarFuncionario(funcionario: Funcionario): void {
        const funcionarioJaExiste = this.funcionarios.find(f => f.id === funcionario.id);

        if (funcionarioJaExiste) {
            console.log(`Atenção: O funcionário ${funcionario.nome} já está alocado nesta etapa.`);
        } else {
            this.funcionarios.push(funcionario);
            console.log(`Funcionário ${funcionario.nome} associado com sucesso à etapa '${this.nome}'.`);
        }
    }


    public listarFuncionarios(): Funcionario[] {
        console.log(`-> Listando funcionários da etapa ${this.nome}:`);
        this.funcionarios.forEach(f => console.log(` - ${f.nome}`));
        return this.funcionarios;
    }


    static salvarTodos(etapas: Etapa[]): void {
        const caminhoArquivo = path.join(__dirname, '..', 'dados', 'etapas.json');
        try {
            const dadosJson = JSON.stringify(etapas, null, 2);
            fs.writeFileSync(caminhoArquivo, dadosJson, 'utf-8');
        } catch (err) {
            console.error('Erro ao salvar as etapas:', err);
        }
    }


    static carregar(): Etapa[] {
        const caminhoArquivo = path.join(__dirname, '..', 'dados', 'etapas.json');
        try {
            if (!fs.existsSync(caminhoArquivo)) {
                return [];
            }

            const dadosJson = fs.readFileSync(caminhoArquivo, 'utf-8');
            const etapasDados = JSON.parse(dadosJson);

            return etapasDados.map((dado: any) => {
                const etapa = new Etapa(dado.nome, new Date(dado.prazo));
                etapa.status = dado.status;
                
                etapa.funcionarios = dado.funcionarios.map((func: any) =>
                    new Funcionario(
                        func.id, func.nome, func.telefone, func.endereco,
                        func.usuario, func.senha_hash, func.nivelPermissao
                    )
                );
                return etapa;
            });
        } catch (err) {
            console.error(`Erro ao carregar as etapas: ${err}`);
            return [];
        }
    }

}