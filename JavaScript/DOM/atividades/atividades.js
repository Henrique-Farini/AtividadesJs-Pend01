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

//atividade 5
let txt = document.getElementById("ainserir");
let adicionar = document.getElementById("adicionar");
let lista = document.getElementById("lista")

adicionar.addEventListener("click", function() {
    let itemnalista = document.createElement("li")
    itemnalista.textContent = txt.value;
    lista.appendChild(itemnalista);
    txt.value = '';
    //atividade 6
    itemnalista.addEventListener("click", function() {
    // Substitui o confirm nativo pelo SweetAlert2
    Swal.fire({
        title: 'Deseja remover?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sim, remover!', // Altere aqui o texto do OK
        cancelButtonText: 'Cancelar'        // Altere aqui o texto do Cancelar
    }).then((result) => {
        // Se o usuário clicou no botão de confirmação
        if (result.isConfirmed) {
            lista.removeChild(itemnalista);
            // Opcional: mostrar um alerta de sucesso
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
        if (nome.value === "") {
            nomes.style.color = "red";
            nomes.textContent = "O campo nome é obrigatório";
            return;
        }
    };
