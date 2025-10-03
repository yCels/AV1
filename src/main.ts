import * as readline from 'readline';
import { Aeronave } from './Aeronave';
import { TipoAeronave } from './Enums';


const aeronaves: Aeronave[] = [];



const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function perguntar(pergunta : string) : Promise<string>{
    return new Promise((resolve) => {
        rl.question(pergunta,(resposta) => {
            resolve(resposta);

        })
    })
}

function exibirMenu(): void {
    console.log('\n--- Sistema de Gestão AeroCode ---');
    console.log('1. Cadastrar Nova Aeronave');
    console.log('2. Listar Todas as Aeronaves');
    console.log('3. Ver Detalhes de uma Aeronave');//implementar aindaa
    console.log('0. Sair do Sistema');
}


async function cadastrarAeronave(): Promise<void> {
    console.log('--- Cadastro de Nova Aeronave ---');

    const codigo = await perguntar('Digite o código da aeronave: ');
    const modelo = await perguntar('Digite o modelo: ');
    
    console.log('Escolha o tipo:');
    console.log('1. Comercial');
    console.log('2. Militar');
    const tipoInput = await perguntar('Opção: ');
    
    const tipo = tipoInput === '1' ? TipoAeronave.COMERCIAL : TipoAeronave.MILITAR;

    const capacidadeStr = await perguntar('Digite a capacidade de passageiros: ');
    const capacidade = parseInt(capacidadeStr); 

    const alcanceStr = await perguntar('Digite o alcance (km): ');
    const alcance = parseInt(alcanceStr); 

    
    const novaAeronave = new Aeronave(codigo, modelo, tipo, capacidade, alcance);
    
    
    aeronaves.push(novaAeronave);

    console.log(`\n*** Aeronave '${modelo}' cadastrada com sucesso! ***`);
}

async function menuPrincipal(): Promise<void> {
    exibirMenu();
    
     const opcao = await perguntar('Escolha uma opção: ');

    switch (opcao) {
        case '1':
            
            await cadastrarAeronave();
            menuPrincipal(); // volta 
            break;
        case '2':
            console.log('\n--- Aeronaves Cadastradas ---');
            if (aeronaves.length === 0) {
                console.log('Nenhuma aeronave cadastrada.');
            } else {
                aeronaves.forEach(a => {
                    console.log(`- Código: ${a.codigo}, Modelo: ${a.modelo}, Tipo: ${a.tipo}`);
                });
            }
            menuPrincipal(); 
            break;
        case '3':
            console.log('');
            menuPrincipal(); 
            break;
        case '0':
            console.log('Encerrando o sistema AeroCode...');
            rl.close();
            break;
        default:
            console.log('Opção inválida! Tente novamente.');
            menuPrincipal();
            break;
    }
    
}


console.log('Bem-vindo à AeroCode!');
menuPrincipal();