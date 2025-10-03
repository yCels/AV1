import { StatusEtapa } from "./Enums";
import { Funcionario } from "./Funcionario";

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

    // Nome do método alinhado ao diagrama
    public iniciar(): void {
        console.log(`A etapa '${this.nome}' foi iniciada.`);
        this.status = StatusEtapa.EM_ANDAMENTO;
    }

    // Nome do método alinhado ao diagrama
    public finalizar(): void {
        console.log(`A etapa '${this.nome}' foi concluída.`);
        this.status = StatusEtapa.CONCLUIDA;
    }
    
    // Nome do método alinhado ao diagrama
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

    // Método adicionado conforme o diagrama
    public salvar(): void {
        console.log(`[Etapa] Salvando dados da etapa ${this.nome}... (lógica a ser implementada)`);
    }

    
    public carregar(): void {
        console.log(`[Etapa] Carregando dados da etapa ${this.nome}... (lógica a ser implementada)`);
    }
}