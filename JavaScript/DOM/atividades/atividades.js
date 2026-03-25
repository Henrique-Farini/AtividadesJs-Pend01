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
    contadorzim++; 
    contarclique.textContent = "Cliques: " + contadorzim; 
});

//atividade 5
let txt = document.getElementById("ainserir");
let adicionar = document.getElementById("adicionar");
let lista = document.getElementById("lista");

adicionar.addEventListener("click", function() {

    if (txt.value.trim() === "") {
        return; 
    }

    let itemnalista = document.createElement("li");
    itemnalista.textContent = txt.value;
    lista.appendChild(itemnalista);
    txt.value = '';

    //atividade 6
    itemnalista.addEventListener("click", function() {
        Swal.fire({
            title: 'Deseja remover?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sim, remover!',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                lista.removeChild(itemnalista);
                Swal.fire('Removido!', 'O item saiu da lista.', 'success');
            }
        });
    });
});

//HARD
let nome = document.getElementById("nome");
let enviar = document.getElementById("enviar");
let nomes = document.getElementById("paragrafo");

enviar.onclick = function() {
    if (nome.value.trim() === "") {
        nomes.style.color = "red";
        nomes.textContent = "O campo nome é obrigatório e não aceita apenas espaços";
        return;
    }
    else {
    nomes.style.color = 'green';
    nomes.textContent = "Nome enviado com sucesso";
    }
};

//Validação de Campos

//