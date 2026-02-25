let agora = new Date();
console.log(agora);

function mostrarDataeHora() {
    let data = new Date();

    console.log("(Mostra o dia)                 data.getDate():", data.getDate());
    console.log("(Mostra o Mês)                 data.getMonth():", data.getMonth() + 1  );
    console.log("(Mostra o Ano)                data.getFullYear():", data.getFullYear());
    console.log("(Mostra a Hora)                 data.getHours():", data.getHours());
    console.log("(Mostra os Minutos)                 data.getMinutes():", data.getMinutes());

}

mostrarDataeHora();

console.log("Desafio: ", agora.toLocaleTimeString(), agora.toLocaleDateString('en-GB'));


//------------------------------------------------------------------------------------------//

//Objeto Math//
console.log("Valor de PI:", Math.PI);

function calcularOperacoes(numero) {
    console.log("Raiz quadrada:", Math.sqrt(numero));
    console.log("Arredondamento para o inteiro mais próximo:", Math.round(numero));
    console.log("Arredondamento para cima:", Math.ceil(numero));
    console.log("Arredondamento para baixo:", Math.floor(numero));

}

calcularOperacoes(7.5);

//DESAFIO//
function calcularOperacoesDesafio(numero) {
    console.log("Valor absoluto:", Math.abs(numero));
    console.log("Quadrado:", Math.pow(numero, 2));
}
calcularOperacoesDesafio(10);

//------------------------------------------------------------------------------------------//

function analisarTexto(texto) {
    console.log("Tamanho do texto ", texto.length);
    console.log("Maiúscula", texto.toUpperCase());
    console.log("Minúsculo", texto.toLowerCase());


}

analisarTexto("JavaScript");

function oQueFazEssaFuncao(frase) {
    console.log("frase.includes('JavaScript'):", frase.includes("JavaScript"));
}

oQueFazEssaFuncao("Eu adoro JavaScript!");

function eEssaAqui(nome, curso) {
    console.log("Olá, " + nome + "! Bem-vindo ao curso de " + curso + ".");
}
console.log(eEssaAqui("Henrique", "Front-End"));