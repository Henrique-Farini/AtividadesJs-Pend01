console.log("---------------Atividade de Funções---------------");

//------------------------------------------------------------------------------------------//
function saudacao() {
console.log("Olá! Bem-vindo ao nosso site.");
}

saudacao();

function nome(nome) {
    console.log("olá, " + nome + "!");
}

nome("Henrique")

//----------------------------------------------------------------------------------------------------------//

//ex 7//
function calcularImc(peso, altura) {
    let imc = peso / (altura ** 2);
    return imc;
}
let peso = 70; // em kg
let altura = 1.75; // em metros
console.log("Seu IMC é:", calcularImc(peso, altura));


//ex 8//
function verificarParouImpar(numero) {
    if (numero % 2 === 0 ) {
        return "Par";
    } else {
        return "Ímpar";
    }
}

let numero = Number(prompt("Digite um número:"));
console.log("O número é:", verificarParouImpar(numero));

//------------------------------------------------------------------------------------------//
function iMc() {
    const form = document.createElement('form');

    const inputPeso = document.createElement('input');
    inputPeso.type = 'number';
    inputPeso.placeholder = 'Peso (kg)';
    inputPeso.required = true;

    const inputAltura = document.createElement('input');
    inputAltura.type = 'number';
    inputAltura.placeholder = 'Altura (m)';
    inputAltura.step = '0.01';
    inputAltura.required = true;

    const botao = document.createElement('button');
    botao.type = 'submit';
    botao.innerText = 'Calcular IMC';

    const resultado = document.createElement('p');

    form.append(inputPeso, inputAltura, botao, resultado);
    document.body.appendChild(form);

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const peso = Number(inputPeso.value);
        const altura = Number(inputAltura.value);

        const imc = peso / (altura * altura);

        resultado.innerText = `Seu IMC é ${imc.toFixed(2)}`;
    });
}

iMc();
//------------------------------------------------------------------------------------------//

//----------------------------------FUNÇÕES NATIVAS----------------------------------//

