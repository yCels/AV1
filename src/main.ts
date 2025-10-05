import * as readline from 'readline';
import { Aeronave } from './Aeronave';
import { Funcionario } from './Funcionario';
import { Peca } from './Peca';
import { Etapa } from './Etapa';
import { Teste } from './Teste';
import { TipoAeronave, TipoPeca, NivelPermissao, TipoTeste, ResultadoTeste, StatusPeca, StatusEtapa } from './Enums';
import { Relatorio } from './Relatorio';


const aeronaves: Aeronave[] = Aeronave.carregar();
const funcionarios: Funcionario[] = Funcionario.carregar();
const pecas: Peca[] = Peca.carregar();
const etapas: Etapa[] = Etapa.carregar();
const testes: Teste[] = Teste.carregar();
// salva o  usuario atual do bagui
let usuarioLogado: Funcionario | null = null;


const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function perguntar(pergunta: string): Promise<string> {
    return new Promise((resolve) => {
        rl.question(pergunta, (resposta) => {
            resolve(resposta);

        })
    })
}

//func para logar 

async function realizarLogin(): Promise<void> {
    console.log('\n--- Autenticação AeroCode ---');
    const usuario = await perguntar('Digite seu usuário: ');
    const senha = await perguntar('Digite sua senha: ');

    // procura o funcionário pelo nome de usuário
    const funcionarioEncontrado = funcionarios.find(f => f.usuario === usuario);

    if (funcionarioEncontrado && funcionarioEncontrado.autenticarUsuario(usuario, senha)) {
        usuarioLogado = funcionarioEncontrado;
        console.log(`\nBem-vindo, ${usuarioLogado.nome}! Nível de acesso: ${usuarioLogado.nivelPermissao}`);
        await menuPrincipal(); // 
    } else {
        console.log('Usuário ou senha inválidos. Tente novamente.');
        await realizarLogin();
    }
}

function exibirMenu(): void {
    console.log('\n========= Menu Principal AeroCode =========');
    console.log(`Usuário: ${usuarioLogado?.nome} | Nível: ${usuarioLogado?.nivelPermissao}`);
    console.log('-----------------------------------------');

    console.log('--- Visualizações e Consultas ---');
    console.log('1. Listar Todas as Aeronaves');
    console.log('2. Ver Detalhes de uma Aeronave');
    console.log('3. Listar Funcionários de uma Etapa');

    const isOperadorOuSuperior = usuarioLogado?.nivelPermissao === NivelPermissao.OPERADOR || usuarioLogado?.nivelPermissao === NivelPermissao.ENGENHEIRO || usuarioLogado?.nivelPermissao === NivelPermissao.ADMINISTRADOR;
    const isEngenheiroOuSuperior = usuarioLogado?.nivelPermissao === NivelPermissao.ENGENHEIRO || usuarioLogado?.nivelPermissao === NivelPermissao.ADMINISTRADOR;
    const isAdmin = usuarioLogado?.nivelPermissao === NivelPermissao.ADMINISTRADOR;

    if (isOperadorOuSuperior) {
        console.log('\n--- Ações de Produção ---');
        console.log('4. Iniciar Etapa de Produção');
        console.log('5. Finalizar Etapa de Produção');
        console.log('6. Atualizar Status de uma Peça');
    }

    if (isEngenheiroOuSuperior) {
        
        console.log('\n--- Cadastros e Associações ---');
        console.log('7. Cadastrar Nova Aeronave');
        console.log('8. Cadastrar Nova Peça');
        console.log('9. Cadastrar Nova Etapa');
        console.log('10. Cadastrar Novo Teste');
        console.log('11. Associar Peça a uma Aeronave');
        console.log('12. Associar Etapa a uma Aeronave');
        console.log('13. Associar Teste a uma Aeronave');
        console.log('14. Associar Funcionário a uma Etapa');
    }

    if (isAdmin) {
        console.log('\n--- Administração ---');
        console.log('15. Cadastrar Novo Funcionário');
        console.log('16. Gerar Relatório Final de Entrega');
    }

    console.log('\n--- Sistema ---');
    console.log('0. Sair');
    console.log('=========================================');
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

//funcao nova pra cadastro de func
async function cadastrarFuncionario(): Promise<void> {
    console.log('\n--- Cadastro de Novo Funcionário ---');
    const id = await perguntar('Digite o ID único do funcionário: ');
    const nome = await perguntar('Digite o nome: ');
    const telefone = await perguntar('Digite o telefone: ');
    const endereco = await perguntar('Digite o endereço: ');
    const usuario = await perguntar('Digite o nome de usuário: ');
    const senha = await perguntar('Digite a senha: '); // Em um sistema real, faríamos um hash aqui
    const nivelInput = await perguntar('Nível (1-Admin, 2-Engenheiro, 3-Operador): ');
    let nivel: NivelPermissao;
    if (nivelInput === '1') nivel = NivelPermissao.ADMINISTRADOR;
    else if (nivelInput === '2') nivel = NivelPermissao.ENGENHEIRO;
    else nivel = NivelPermissao.OPERADOR;

    const novoFuncionario = new Funcionario(id, nome, telefone, endereco, usuario, senha, nivel);
    funcionarios.push(novoFuncionario);
    console.log(`\n*** Funcionário '${nome}' cadastrado com sucesso! ***`);
}

//cadastrar peca

async function cadastrarPeca(): Promise<void> {
    console.log('\n--- Cadastro de Nova Peça ---');
    const nome = await perguntar('Digite o nome da peça: ');
    const tipoInput = await perguntar('Escolha o tipo (1-Nacional, 2-Importada): ');
    const tipo = tipoInput === '1' ? TipoPeca.NACIONAL : TipoPeca.IMPORTADA;
    const fornecedor = await perguntar('Digite o nome do fornecedor: ');

    const novaPeca = new Peca(nome, tipo, fornecedor);
    pecas.push(novaPeca);
    console.log(`\n*** Peça '${nome}' cadastrada com sucesso! ***`);
}

// cadastra Etapa

async function cadastrarEtapa(): Promise<void> {
    console.log('\n--- Cadastro de Nova Etapa de Produção ---');
    const nome = await perguntar('Digite o nome da etapa (ex: Montagem da Fuselagem): ');
    const prazoStr = await perguntar('Digite o prazo de conclusão (formato AAAA-MM-DD): ');

    // Coverte a string pra objeto data
    const prazo = new Date(prazoStr);


    if (isNaN(prazo.getTime())) {
        console.log('Formato de data inválido! Use AAAA-MM-DD. A etapa não foi cadastrada.');
        return;
    }

    const novaEtapa = new Etapa(nome, prazo);
    etapas.push(novaEtapa);
    console.log(`\n*** Etapa '${nome}' cadastrada com sucesso! ***`);
}

//cadastro de teste 
async function cadastrarTeste(): Promise<void> {
    console.log('\n--- Cadastro de Novo Teste ---');

    console.log('Escolha o tipo de teste:');
    console.log(`1. ${TipoTeste.ELETRICO}`);
    console.log(`2. ${TipoTeste.HIDRAULICO}`);
    console.log(`3. ${TipoTeste.AERODINAMICO}`);
    const tipoInput = await perguntar('Opção: ');
    let tipo: TipoTeste;
    if (tipoInput === '1') tipo = TipoTeste.ELETRICO;
    else if (tipoInput === '2') tipo = TipoTeste.HIDRAULICO;
    else tipo = TipoTeste.AERODINAMICO;

    console.log('\nEscolha o resultado do teste:');
    console.log(`1. ${ResultadoTeste.APROVADO}`);
    console.log(`2. ${ResultadoTeste.REPROVADO}`);
    const resultadoInput = await perguntar('Opção: ');
    const resultado = resultadoInput === '1' ? ResultadoTeste.APROVADO : ResultadoTeste.REPROVADO;

    const novoTeste = new Teste(tipo, resultado);
    testes.push(novoTeste);
    //remove
    console.log(`\n*** Teste '${tipo}' cadastrado com sucesso! ***`);
}

//func  para mostras detelhe das aero--estava faltando
async function verDetalhesAeronave(): Promise<void> {
    const codigo = await perguntar('\nDigite o código da aeronave que deseja ver: ');
    const aeronaveEncontrada = aeronaves.find(a => a.codigo === codigo);

    if (aeronaveEncontrada) {
        aeronaveEncontrada.detalhes();
    } else {
        console.log('Aeronave não encontrada.');
    }
}

async function associarPecaAAeronave(): Promise<void> {
    console.log('\n--- Associar Peça a uma Aeronave ---');

    if (aeronaves.length === 0 || pecas.length === 0) {
        console.log('É necessário ter ao menos uma aeronave e uma peça cadastradas para realizar a associação.');
        return;
    }

    
    console.log('Aeronaves disponíveis:');
    aeronaves.forEach((a, index) => console.log(`${index + 1}. ${a.modelo} (Código: ${a.codigo})`));
    const aeroIndex = parseInt(await perguntar('Escolha o número da aeronave: ')) - 1;

  
    console.log('\nPeças disponíveis:');
    pecas.forEach((p, index) => console.log(`${index + 1}. ${p.nome}`));
    const pecaIndex = parseInt(await perguntar('Escolha o número da peça a ser associada: ')) - 1;

    //  Validar e Associar
    if (aeronaves[aeroIndex] && pecas[pecaIndex]) {
        const aeronaveEscolhida = aeronaves[aeroIndex];
        const pecaEscolhida = pecas[pecaIndex];


        aeronaveEscolhida.adicionarPeca(pecaEscolhida);

        console.log(`\n*** Peça '${pecaEscolhida.nome}' associada à aeronave '${aeronaveEscolhida.modelo}' com sucesso! ***`);

    } else {
        console.log('Seleção inválida. Operação cancelada.');
    }
}

//associar Etapa - mesma base da funcao de associar peca

async function associarEtapaAAeronave(): Promise<void> {
    console.log('\n--- Associar Etapa de Produção a uma Aeronave ---');

    if (aeronaves.length === 0 || etapas.length === 0) {
        console.log('É necessário ter ao menos uma aeronave e uma etapa cadastradas para realizar a associação.');
        return;
    }

    
    console.log('Aeronaves disponíveis:');
    aeronaves.forEach((a, index) => console.log(`${index + 1}. ${a.modelo} (Código: ${a.codigo})`));
    const aeroIndex = parseInt(await perguntar('Escolha o número da aeronave: ')) - 1;

   
    console.log('\nEtapas de Produção disponíveis:');
    etapas.forEach((e, index) => console.log(`${index + 1}. ${e.nome}`));
    const etapaIndex = parseInt(await perguntar('Escolha o número da etapa a ser associada: ')) - 1;

   
    if (aeronaves[aeroIndex] && etapas[etapaIndex]) {
        const aeronaveEscolhida = aeronaves[aeroIndex];
        const etapaEscolhida = etapas[etapaIndex];

       
        aeronaveEscolhida.adicionarEtapa(etapaEscolhida);

        console.log(`\n*** Etapa '${etapaEscolhida.nome}' associada à aeronave '${aeronaveEscolhida.modelo}' com sucesso! ***`);

    } else {
        console.log('Seleção inválida. Operação cancelada.');
    }
}

async function associarTesteAAeronave(): Promise<void> {
    console.log('\n--- Associar Teste a uma Aeronave ---');

    if (aeronaves.length === 0 || testes.length === 0) {
        console.log('É necessário ter ao menos uma aeronave e um teste cadastrados para realizar a associação.');
        return;
    }

    // 
    console.log('Aeronaves disponíveis:');
    aeronaves.forEach((a, index) => console.log(`${index + 1}. ${a.modelo} (Código: ${a.codigo})`));
    const aeroIndex = parseInt(await perguntar('Escolha o número da aeronave: ')) - 1;

    // 
    console.log('\nTestes disponíveis:');
    testes.forEach((t, index) => console.log(`${index + 1}. ${t.tipo} - ${t.resultado}`));
    const testeIndex = parseInt(await perguntar('Escolha o número do teste a ser associado: ')) - 1;

   
    if (aeronaves[aeroIndex] && testes[testeIndex]) {
        const aeronaveEscolhida = aeronaves[aeroIndex];
        const testeEscolhido = testes[testeIndex];

        
        aeronaveEscolhida.adicionarTeste(testeEscolhido);

        console.log(`\n*** Teste '${testeEscolhido.tipo}' associado à aeronave '${aeronaveEscolhida.modelo}' com sucesso! ***`);

    } else {
        console.log('Seleção inválida. Operação cancelada.');
    }
}
//associa func a etapa , pois a lista tava salvando vazia
async function associarFuncionarioAEtapa(): Promise<void> {
    console.log('\n--- Associar Funcionário a uma Etapa ---');

    if (etapas.length === 0 || funcionarios.length === 0) {
        console.log('É necessário ter ao menos uma etapa e um funcionário cadastrados para realizar a associação.');
        return;
    }


    console.log('Etapas de Produção disponíveis:');
    etapas.forEach((e, index) => console.log(`${index + 1}. ${e.nome}`));
    const etapaIndex = parseInt(await perguntar('Escolha o número da etapa: ')) - 1;


    console.log('\nFuncionários disponíveis:');
    funcionarios.forEach((f, index) => console.log(`${index + 1}. ${f.nome} (ID: ${f.id})`));
    const funcIndex = parseInt(await perguntar('Escolha o número do funcionário a ser associado: ')) - 1;


    if (etapas[etapaIndex] && funcionarios[funcIndex]) {
        const etapaEscolhida = etapas[etapaIndex];
        const funcionarioEscolhido = funcionarios[funcIndex];


        etapaEscolhida.associarFuncionario(funcionarioEscolhido);

    } else {
        console.log('Seleção inválida. Operação cancelada.');
    }
}
//alterar status da peca
async function atualizarStatusPeca(): Promise<void> {
    console.log('\n--- Atualizar Status de uma Peça ---');

    if (pecas.length === 0) {
        console.log('Nenhuma peça cadastrada para atualizar.');
        return;
    }


    console.log('Peças disponíveis:');
    pecas.forEach((p, index) => console.log(`${index + 1}. ${p.nome} (Status atual: ${p.status})`));
    const pecaIndex = parseInt(await perguntar('Escolha o número da peça que deseja atualizar: ')) - 1;

    if (pecas[pecaIndex]) {
        const pecaEscolhida = pecas[pecaIndex];


        console.log('\nEscolha o novo status:');
        console.log(`1. ${StatusPeca.EM_PRODUCAO}`);
        console.log(`2. ${StatusPeca.EM_TRANSPORTE}`);
        console.log(`3. ${StatusPeca.PRONTA}`);
        const statusInput = await perguntar('Opção: ');

        let novoStatus: StatusPeca;
        if (statusInput === '1') novoStatus = StatusPeca.EM_PRODUCAO;
        else if (statusInput === '2') novoStatus = StatusPeca.EM_TRANSPORTE;
        else novoStatus = StatusPeca.PRONTA;


        pecaEscolhida.atualizarStatus(novoStatus);

    } else {
        console.log('Seleção de peça inválida. Operação cancelada.');
    }
}




async function iniciarEtapaProducao(): Promise<void> {
    console.log('\n--- Iniciar Etapa de Produção ---');

    const codigoAeronave = await perguntar('Digite o código da aeronave cuja etapa deseja iniciar: ');
    const aeronave = aeronaves.find(a => a.codigo === codigoAeronave);

    if (!aeronave) {
        console.log('Aeronave não encontrada.');
        return;
    }

    if (aeronave.etapas.length === 0) {
        console.log('Esta aeronave não possui etapas de produção associadas.');
        return;
    }

    // Filtra apenas as etapas que ainda estão "Pendentes"
    const etapasPendentes = aeronave.etapas.filter(e => e.status === StatusEtapa.PENDENTE);

    if (etapasPendentes.length === 0) {
        console.log('Não há etapas pendentes para iniciar nesta aeronave.');
        return;
    }

    console.log('Qual etapa pendente você deseja iniciar?');
    etapasPendentes.forEach((e, index) => console.log(`${index + 1}. ${e.nome}`));

    const etapaIndex = parseInt(await perguntar('Escolha o número da etapa: ')) - 1;

    if (etapasPendentes[etapaIndex]) {

        etapasPendentes[etapaIndex].iniciar();
    } else {
        console.log('Seleção inválida.');
    }
}

async function finalizarEtapaProducao(): Promise<void> {
    console.log('\n--- Finalizar Etapa de Produção ---');
    const codigoAeronave = await perguntar('Digite o código da aeronave cuja etapa deseja finalizar: ');
    const aeronave = aeronaves.find(a => a.codigo === codigoAeronave);

    if (!aeronave) {
        console.log('Aeronave não encontrada.');
        return;
    }


    const indicePrimeiraEtapaNaoConcluida = aeronave.etapas.findIndex(e => e.status !== StatusEtapa.CONCLUIDA);


    if (indicePrimeiraEtapaNaoConcluida === -1) {
        console.log('Todas as etapas desta aeronave já foram concluídas!');
        return;
    }

    const etapaParaFinalizar = aeronave.etapas[indicePrimeiraEtapaNaoConcluida];

    // ve qual  n ta finalizada
    if (etapaParaFinalizar.status === StatusEtapa.EM_ANDAMENTO) {
        etapaParaFinalizar.finalizar();
    } else {
        console.log(`Não é possível finalizar a etapa '${etapaParaFinalizar.nome}'. O seu status é '${etapaParaFinalizar.status}'. É preciso iniciá-la primeiro.`);
    }
}


async function listarFuncionariosDeEtapa(): Promise<void> {
    console.log('\n--- Listar Funcionários de uma Etapa ---');

    if (etapas.length === 0) {
        console.log('Nenhuma etapa cadastrada.');
        return;
    }

    // 1. Escolher a Etapa
    console.log('Etapas de Produção disponíveis:');
    etapas.forEach((e, index) => console.log(`${index + 1}. ${e.nome}`));
    const etapaIndex = parseInt(await perguntar('Escolha o número da etapa para ver os funcionários: ')) - 1;

    if (etapas[etapaIndex]) {
        const etapaEscolhida = etapas[etapaIndex];


        etapaEscolhida.listarFuncionarios();

    } else {
        console.log('Seleção de etapa inválida.');
    }
}


async function gerarRelatorioFinal(): Promise<void> {
    console.log('\n--- Gerar Relatório Final de Entrega ---');

    if (aeronaves.length === 0) {
        console.log('Nenhuma aeronave cadastrada para gerar relatório.');
        return;
    }


    console.log('Aeronaves disponíveis:');
    aeronaves.forEach((a, index) => console.log(`${index + 1}. ${a.modelo} (Código: ${a.codigo})`));
    const aeroIndex = parseInt(await perguntar('Escolha o número da aeronave para o relatório: ')) - 1;

    if (aeronaves[aeroIndex]) {
        const aeronaveEscolhida = aeronaves[aeroIndex];


        const nomeCliente = await perguntar('Digite o nome do cliente: ');
        const dataEntregaStr = await perguntar('Digite a data de entrega (AAAA-MM-DD): ');
        const dataEntrega = new Date(dataEntregaStr);


        const relatorio = new Relatorio();

        relatorio.gerarEsalvar(aeronaveEscolhida, nomeCliente, dataEntrega);

    } else {
        console.log('Seleção de aeronave inválida.');
    }
}


//salvardados

function salvarDados(): void {
    console.log('\nSalvando todos os dados...');
    Aeronave.salvarTodos(aeronaves);
    Funcionario.salvarTodos(funcionarios);
    Peca.salvarTodos(pecas);
    Etapa.salvarTodos(etapas);
    Teste.salvarTodos(testes);
    console.log('Dados salvos com sucesso!');
}




async function menuPrincipal(): Promise<void> {
    exibirMenu();
    const opcao = await perguntar('Escolha uma opção: ');


    switch (opcao) {

        case '1':
            console.log('\n--- Aeronaves Cadastradas ---');
            if (aeronaves.length === 0) {
                console.log('Nenhuma aeronave cadastrada.');
            } else {
                aeronaves.forEach(a => console.log(`- Código: ${a.codigo}, Modelo: ${a.modelo}`));
            }
            break;
        case '2':
            await verDetalhesAeronave();
            break;
        case '3':
            await listarFuncionariosDeEtapa();
            break;


        case '4':
            await iniciarEtapaProducao();
            salvarDados();
            break;
        case '5':
            await finalizarEtapaProducao();
            salvarDados();
            break;
        case '6': 
            await atualizarStatusPeca();
            salvarDados();
            break;


        case '7':
            await cadastrarAeronave();
            salvarDados();
            break;
        case '8':
            await cadastrarPeca();
            salvarDados();
            break;
        case '9':
            await cadastrarEtapa();
            salvarDados();
            break;
        case '10':
            await cadastrarTeste();
            salvarDados();
            break;
        case '11':
            await associarPecaAAeronave();
            salvarDados();
            break;
        case '12':
            await associarEtapaAAeronave();
            salvarDados();
            break;
        case '13':
            await associarTesteAAeronave();
            salvarDados();
            break;
        case '14':
            await associarFuncionarioAEtapa();
            salvarDados();
            break;

        case '15':
            await cadastrarFuncionario();
            salvarDados();
            break;

        case '16':
            await gerarRelatorioFinal();
            break;

       
        case '0':
            salvarDados();
            console.log('Encerrando o sistema AeroCode...');
            rl.close();
            return; 

        default:
            console.log('Opção inválida! Tente novamente.');
            break;
    }
    await menuPrincipal(); 
}

async function iniciarSistema() {
    console.log('Bem-vindo ao Sistema de Gestão AeroCode!');
    if (funcionarios.length === 0) {
        console.log('\nNenhum funcionário cadastrado. Por favor, cadastre o primeiro administrador:');
        await cadastrarFuncionario();
        salvarDados();
    }
    await realizarLogin();
}

iniciarSistema();