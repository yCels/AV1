import { NivelPermissao } from "./Enums";
import * as fs from 'fs';
import * as path from 'path';


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


    static salvarTodos(funcionarios: Funcionario[]): void {
        const caminhoArquivo = path.join(__dirname, '..', 'dados', 'funcionarios.json');
        try {
            const dadosJson = JSON.stringify(funcionarios, null, 2);
            fs.writeFileSync(caminhoArquivo, dadosJson, 'utf-8');
        } catch (err) {
            console.error('Erro ao salvar os funcionários:', err);
        }
    }

    static carregar(): Funcionario[] {
        const caminhoArquivo = path.join(__dirname, '..', 'dados', 'funcionarios.json');

        try {
            if (!fs.existsSync(caminhoArquivo)) {
                return []; 
            }

            const dadosJson = fs.readFileSync(caminhoArquivo, 'utf-8');
            const funcionariosDados = JSON.parse(dadosJson);

           
            return funcionariosDados.map((dado: any) => new Funcionario(
                dado.id, dado.nome, dado.telefone, dado.endereco,
                dado.usuario, dado.senha_hash, dado.nivelPermissao
            ));
        } catch (err) {
            console.error(`Erro ao carregar os funcionários: ${err}`);
            return [];
        }
    }

}
