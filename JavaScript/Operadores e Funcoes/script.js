console.log("Olá, JavaScript!");

let a = 10;
let b = 3;
let contador = 5;


console.log("Soma:", a + b);
console.log("Subtração:", a - b);
console.log("Multiplicação:", a * b);
console.log("Divisão:", a / b);
console.log("Módulo:", a % b);
console.log("Incremento:", ++contador);
console.log("Decremento:", --contador);
console.log("Exponenciação:", a ** b);

//----------------------------------------------------------------------------------------------------------//

let um = 10
let dois = 20
let tres = 6

function media( um, dois, tres){
    return result = (um + dois + tres) / 3;
}
console.log("A média é:", media(um, dois, tres));

function restdiv( um, tres){
    return result2 = um % tres
}
console.log("O resto da divisão é:", restdiv(um, tres));

//----------------------------------------------------------------------------------------------------------//

let x = 10;
let y = "10";

console.log("Igualdade:", x == y);
console.log("Estritamente Igual:", x === y);
console.log("Desigualdade:", x != y);
console.log("Estritamente Desigual:", x !== y);
console.log("Maior que:", x > 5);
console.log("Menor que:", x < 15);
console.log("Maior ou Igual a:", x >= 10);
console.log("Menor ou Igual a:", x <= 20);

//------------------------------------------04/02/26--------------------------------------------------------//
//ex 3//
let idade = 17;
if (idade >= 18) {
    console.log("Você é maior de idade.");
}
else {
    console.log("Você é menor de idade.");
}

//ex 4//
let numero1 = 7;
let numero2 = 1;
if (numero1 > numero2) {
    console.log("O maior número é:", numero1);
}
else if (numero2 > numero1) {
    console.log("O maior número é:", numero2);
}
else if (numero1 === numero2) {
    console.log("Os números são iguais.");
}

//exemplos operadores lógicos//


let idade1 = 20;
let possuiCarteira = true;
if (idade1 >= 18 && possuiCarteira) {
    console.log("Você pode dirigir.");  // E/AND lógico =  && //
}
else {
    console.log("Você não pode dirigir.");
}

let chovendo = false;
let guardachuva = true;
console.log("Levar guarda-chuva?", chovendo || guardachuva); // OU/OR lógico =  || //

let ligado = true;
console.log("O dispositivo está desligado?", !ligado);  // Negação lógica =  ! //

//ex 5//

let nota = 10;
let frequencia = 75;

if (nota >= 7 && frequencia >= 75) {
    console.log("Aprovado");
}
else {
    console.log("Reprovado");
}

//ex 6 verificar acesso com login ou token//
let temLogin = false;
let temToken = true;
if (temLogin || temToken) {
    console.log("Acesso concedido");
}
else {
    console.log("Acesso negado");
}

