import { NivelPermissao } from "./Enums";

export class Funcionario {
    readonly id: string;
    public nome: string;
    public telefone: string;
    public endereco: string;
    public usuario: string;
    private senha_hash: string;
    public nivelPermissao: NivelPermissao;

    constructor(id: string, nome: string, telefone: string, endereco: string, usuario: string, senha_hash: string, nivel: NivelPermissao) {
        this.id = id;
        this.nome = nome;
        this.telefone = telefone;
        this.endereco = endereco;
        this.usuario = usuario;
        this.senha_hash = senha_hash;
        this.nivelPermissao = nivel;
    }

    
    public autenticarUsuario(usuario: string, senha_hash_fornecida: string): boolean {
        console.log("-> Lógica de autenticação a ser implementada!");
        return this.usuario === usuario && this.senha_hash === senha_hash_fornecida;
    }

    public salvar(): void {
        console.log(`[Funcionario] Salvando dados de ${this.nome}... (lógica a ser implementada)`);
    }

   
    public carregar(): void {
        console.log(`[Funcionario] Carregando dados de ${this.nome}... (lógica a ser implementada)`);
    }
}