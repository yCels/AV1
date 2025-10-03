"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Etapa = void 0;
const Enums_1 = require("./Enums");
class Etapa {
    nome;
    prazo;
    status;
    funcionarios;
    constructor(nome, prazo) {
        this.nome = nome;
        this.prazo = prazo;
        this.status = Enums_1.StatusEtapa.PENDENTE;
        this.funcionarios = [];
    }
    // Nome do método alinhado ao diagrama
    iniciar() {
        console.log(`A etapa '${this.nome}' foi iniciada.`);
        this.status = Enums_1.StatusEtapa.EM_ANDAMENTO;
    }
    // Nome do método alinhado ao diagrama
    finalizar() {
        console.log(`A etapa '${this.nome}' foi concluída.`);
        this.status = Enums_1.StatusEtapa.CONCLUIDA;
    }
    // Nome do método alinhado ao diagrama
    associarFuncionario(funcionario) {
        const funcionarioJaExiste = this.funcionarios.find(f => f.id === funcionario.id);
        if (funcionarioJaExiste) {
            console.log(`Atenção: O funcionário ${funcionario.nome} já está alocado nesta etapa.`);
        }
        else {
            this.funcionarios.push(funcionario);
            console.log(`Funcionário ${funcionario.nome} associado com sucesso à etapa '${this.nome}'.`);
        }
    }
    listarFuncionarios() {
        console.log(`-> Listando funcionários da etapa ${this.nome}:`);
        this.funcionarios.forEach(f => console.log(` - ${f.nome}`));
        return this.funcionarios;
    }
    // Método adicionado conforme o diagrama
    salvar() {
        console.log(`[Etapa] Salvando dados da etapa ${this.nome}... (lógica a ser implementada)`);
    }
    carregar() {
        console.log(`[Etapa] Carregando dados da etapa ${this.nome}... (lógica a ser implementada)`);
    }
}
exports.Etapa = Etapa;
