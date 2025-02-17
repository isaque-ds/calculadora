// Elementos do DOM
let display = document.getElementById('display-text');
let ligar = document.getElementById('on');
let limpar = document.getElementById('limpar');
let botaoVirgula = document.getElementById('botaoVirgula');
let botao0 = document.getElementById('botao0');
let botao1 = document.getElementById('botao1');
let botao2 = document.getElementById('botao2');
let botao3 = document.getElementById('botao3');
let botao4 = document.getElementById('botao4');
let botao5 = document.getElementById('botao5');
let botao6 = document.getElementById('botao6');
let botao7 = document.getElementById('botao7');
let botao8 = document.getElementById('botao8');
let botao9 = document.getElementById('botao9');

// Variáveis de controle da calculadora
let valorAnterior = 0;        // Armazena o primeiro número da operação
let operacaoAtual = null;     // Armazena qual operação está sendo realizada (+, -, *, /)
let novoNumero = true;        // Controla se deve iniciar um novo número ou concatenar

// Liga/Reinicia a calculadora
function ligarCalculadora() {
    display.innerHTML = "0";
    valorAnterior = 0;
    operacaoAtual = null;
    novoNumero = true;
}

// Limpa o display e reinicia as variáveis
function limparDisplay() {
    display.innerHTML = '0';
    valorAnterior = 0;
    operacaoAtual = null;
    novoNumero = true;
}

// Adiciona vírgula decimal ao número
function inserirVirgula() {
    if (!display.innerHTML.includes(',')) {  // Evita mais de uma vírgula
        if (display.innerHTML === "" || novoNumero) {
            display.innerHTML = "0,";  // Se estiver vazio, começa com "0,"
        } else {
            display.innerHTML += ",";  // Senão, apenas adiciona a vírgula
        }
        novoNumero = false;
    }
}

// Insere números no display
function inserirNumero(numero) {
    if (novoNumero) {
        display.innerHTML = numero;  // Se for novo número, substitui o display
    } else {
        display.innerHTML += numero; // Senão, concatena ao número existente
    }
    novoNumero = false;
}

// Inverte o sinal do número (positivo/negativo)
function plusMinus() {
    let valor = parseFloat(display.innerHTML.replace(',', '.'));
    display.innerHTML = (-valor).toString().replace('.', ',');
}

// Calcula a porcentagem do número
function porcento() {
    let valor = parseFloat(display.innerHTML.replace(',', '.'));
    display.innerHTML = (valor / 100).toString().replace('.', ',');
}

// Função genérica para operações (+, -, *, /)
function realizarOperacao(operador) {
    let valorAtual = parseFloat(display.innerHTML.replace(',', '.'));

    // Se já existe uma operação em andamento, calcula o resultado intermediário
    if (operacaoAtual && !novoNumero) {
        calcularResultado();
    } else {
        valorAnterior = valorAtual;
    }

    operacaoAtual = operador;
    // Mostra o primeiro número e o operador no display
    display.innerHTML = valorAnterior.toString().replace('.', ',') + ' ' + operador + ' ';
    novoNumero = false; // Permite concatenar o próximo número
}

// Funções específicas para cada operação
function somar() {
    realizarOperacao('+');
}

function subtrair() {
    realizarOperacao('-');
}

function multiplicar() {
    realizarOperacao('*');
}

function dividir() {
    realizarOperacao('/');
}

// Calcula o resultado da operação
function calcularResultado() {
    let expressao = display.innerHTML.split(' ');
    if (expressao.length < 3) return; // Verifica se tem número, operador e número

    // Extrai os números e o operador da expressão
    let primeiroNumero = parseFloat(expressao[0].replace(',', '.'));
    let operador = expressao[1];
    let segundoNumero = parseFloat(expressao[2].replace(',', '.'));
    let resultado = 0;

    // Realiza a operação apropriada
    switch (operador) {
        case '+':
            resultado = primeiroNumero + segundoNumero;
            break;
        case '-':
            resultado = primeiroNumero - segundoNumero;
            break;
        case '*':
            resultado = primeiroNumero * segundoNumero;
            break;
        case '/':
            if (segundoNumero === 0) {
                display.innerHTML = 'Erro';  // Evita divisão por zero
                novoNumero = true;
                return;
            }
            resultado = primeiroNumero / segundoNumero;
            break;
        default:
            return;
    }

    // Mostra o resultado e prepara para próxima operação
    display.innerHTML = resultado.toString().replace('.', ',');
    valorAnterior = resultado;
    novoNumero = true;
}

// Finaliza a operação atual e mostra o resultado
function igual() {
    if (operacaoAtual === null) return;  // Só calcula se houver uma operação
    calcularResultado();
    operacaoAtual = null;
}
