//atividade 1
    let botao = document.getElementById("vermelho");
    botao.addEventListener("click", function() {
        document.getElementById("outracor").style.color = "red";
    });
      let butao = document.getElementById("azul");
    butao.addEventListener("click", function() {
        document.getElementById("outracor").style.color = "blue";
    });

//atividade 2

let mostrar = document.getElementById("mostrar");
let mensagem = document.getElementById("texto1");

mostrar.addEventListener('click', function() {
         mensagem.classList.toggle("oculto");
    
});


//atividade 3 
let caracter = document.getElementById("caracter");
let contador = document.getElementById("contador");
caracter.addEventListener("input", function () {
    let comprimento = caracter.value.length;
    contador.textContent = "Caractéres: " + comprimento;
});

//atividade 4 
let clicar = document.getElementById("clicar");
let contarclique = document.getElementById("contarclique");
let contadorzim = 0; 

clicar.addEventListener("click", function () {
    contadorzim++; // Aumenta o número
    contarclique.textContent = "Cliques: " + contadorzim; 
});
