"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const readline = __importStar(require("readline"));
const Aeronave_1 = require("./Aeronave");
const Enums_1 = require("./Enums");
const aeronaves = [];
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
function perguntar(pergunta) {
    return new Promise((resolve) => {
        rl.question(pergunta, (resposta) => {
            resolve(resposta);
        });
    });
}
function exibirMenu() {
    console.log('\n--- Sistema de Gestão AeroCode ---');
    console.log('1. Cadastrar Nova Aeronave');
    console.log('2. Listar Todas as Aeronaves');
    console.log('3. Ver Detalhes de uma Aeronave'); //implementar aindaa
    console.log('0. Sair do Sistema');
}
async function cadastrarAeronave() {
    console.log('--- Cadastro de Nova Aeronave ---');
    const codigo = await perguntar('Digite o código da aeronave: ');
    const modelo = await perguntar('Digite o modelo: ');
    console.log('Escolha o tipo:');
    console.log('1. Comercial');
    console.log('2. Militar');
    const tipoInput = await perguntar('Opção: ');
    const tipo = tipoInput === '1' ? Enums_1.TipoAeronave.COMERCIAL : Enums_1.TipoAeronave.MILITAR;
    const capacidadeStr = await perguntar('Digite a capacidade de passageiros: ');
    const capacidade = parseInt(capacidadeStr);
    const alcanceStr = await perguntar('Digite o alcance (km): ');
    const alcance = parseInt(alcanceStr);
    const novaAeronave = new Aeronave_1.Aeronave(codigo, modelo, tipo, capacidade, alcance);
    aeronaves.push(novaAeronave);
    console.log(`\n*** Aeronave '${modelo}' cadastrada com sucesso! ***`);
}
async function menuPrincipal() {
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
            }
            else {
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
