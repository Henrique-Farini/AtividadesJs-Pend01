//--------Função que mostra a hora atual--------------------//

function mostrarHoraAtual() {
    let agora = new Date();
    console.log("Hora atual: ", agora.toLocaleTimeString());
}
mostrarHoraAtual();


//--------------------//Recebe dois números: Soma e Média---------------------//

function SomaeMedia(numero1, numero2) {
    let soma = numero1 + numero2
    console.log("Soma:", soma);
    let media = soma / 2
    console.log("Média: ", media);

}
let numero1 = Number(prompt("Digite o primeiro número:"));
let numero2 = Number(prompt("Digite o segundo número:"));
SomaeMedia(numero1, numero2);

//--------------------//Receba um nome e mostre: Quantidade de letras, nome em Maiúsculo ---------------------//

function nome(nome) {
    console.log("Quantidade de letras: ", nome.length )
    console.log("Nome em Maiúsculo: ", nome.toUpperCase())
}
let entradaNome = prompt("Digite seu nome:");
nome(entradaNome);


//-------------------------//Recebe uma frase e verifica se contém a palavra HTML//-----------//

function verificaFrase(frase) {
    if (frase.includes("HTML")) {
        console.log("A frase contém a palavra (HTML)");
    } else {
        console.log("A frase NÃO contém a palavra (HTML)");
    }
}

let entradaUsuario = prompt("Digite uma frase:"); 
verificaFrase(entradaUsuario);
