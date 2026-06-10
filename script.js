/*
Projeto: Calculadora Web
Desenvolvedor: Amanda Elizabeth Silva Cruz
Ano: 2026
Descrição: Calculadora completa desenvolvida para portfólio
*/

const tela = document.getElementById('tela');
const historicoEl = document.getElementById('historico');
const botaoTema = document.getElementById('trocarTema');

let valorAtual = '0';
let historicoSalvo = JSON.parse(localStorage.getItem('historicoCalc')) || [];

atualizarTela();
mostrarHistoricoSalvo();

function adicionarValor(valor) {
    if (valor === '.' && valorAtual.includes('.')) return;

    if (valorAtual === '0' && valor === '-') {
        valorAtual = '-';
    }
    else if (valorAtual === '0' && valor !== '.') {
        valorAtual = valor;
    }
    else {
        valorAtual += valor;
    }

    atualizarTela();
}

function limparTudo() {
    valorAtual = '0';
    historicoEl.textContent = '';
    atualizarTela();
}

function apagarUm() {
    if (valorAtual.length === 1 || (valorAtual.length === 2 && valorAtual.startsWith('-'))) {
        valorAtual = '0';
    } else {
        valorAtual = valorAtual.slice(0, -1);
    }
    atualizarTela();
}

function calcularPorcentagem() {
    let valor = Number(valorAtual);
    let resultado = valor / 100;
    valorAtual = String(resultado);
    atualizarTela();
}

function calcular() {
    let conta = valorAtual;
    historicoEl.textContent = conta + ' =';

    try {
        if (conta.includes('/0')) {
            valorAtual = 'Erro: Divisão por 0';
        } else {
            let resultado = eval(conta);
            valorAtual = String(resultado);
            salvarHistorico(conta, resultado);
        }
    } catch (erro) {
        valorAtual = 'Erro';
    }

    atualizarTela();
}

function atualizarTela() {
    tela.textContent = valorAtual;
}

botaoTema.addEventListener('click', () => {
    document.body.classList.toggle('escuro');
});

function salvarHistorico(conta, resultado) {
    historicoSalvo.push({ conta, resultado });
    localStorage.setItem('historicoCalc', JSON.stringify(historicoSalvo));
}

function mostrarHistoricoSalvo() {
    if (historicoSalvo.length > 0) {
        let ultima = historicoSalvo[historicoSalvo.length - 1];
        historicoEl.textContent = `${ultima.conta} = ${ultima.resultado}`;
    }
}

document.addEventListener('keydown', (e) => {
    if (!isNaN(e.key)) {
        adicionarValor(e.key);
    }

    if (['+', '-', '*', '/'].includes(e.key)) {
        adicionarValor(e.key);
    }

    if (e.key === '.' || e.key === ',') {
        adicionarValor('.');
    }

    if (e.key === 'Enter') {
        calcular();
    }

    if (e.key === 'Backspace') {
        apagarUm();
    }

    if (e.key === 'Escape') {
        limparTudo();
    }

    if (e.key === '%') {
        calcularPorcentagem();
    }
});
// Aviso: Projeto desenvolvido por Amanda Elizabeth Silva Cruz - Todos os direitos reservados
document.addEventListener('contextmenu', function(e) {
    // Não bloqueia nada, só avisa — pode clicar normalmente
    console.log("%cProjeto feito por Amanda Elizabeth Silva Cruz", "color: blue; font-size: 14px; font-weight: bold;");
});