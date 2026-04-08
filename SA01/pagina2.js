document.addEventListener("input", function(e) {
    if (e.target.classList.contains("telefone")) {

        let telefone = e.target;

        let valor = telefone.value.replace(/\D/g, ""); 
        let formato = valor.length > 10 ? "(00) 00000-0000" : "(00) 0000-0000"; 
        
        let valorFormatado = "";
        let indiceMascara = 0;

        for (let i = 0; i < valor.length && indiceMascara < formato.length; i++) {
            if (formato[indiceMascara] === "0") {
                valorFormatado += valor[i];
                indiceMascara++;
            } else {
                valorFormatado += formato[indiceMascara];
                indiceMascara++;
                i--; 
            }
        }

        telefone.value = valorFormatado;
    }
});


$(function() {

    $.getJSON('https://servicodados.ibge.gov.br/api/v1/localidades/estados/', function (uf) {

    let options = '<option value="">Selecione o estado</option>';

        uf.sort(function(a, b) {
            return a.nome.localeCompare(b.nome);
        });

        for (let i = 0; i < uf.length; i++) { 
            options += '<option data-id="' + uf[i].id + '" value="' + uf[i].nome + '">' + uf[i].nome + '</option>'; 
        }

        $("#uf").html(options);
    });


    $("#uf").change(function () {

        let estadoSelecionado = $(this).find("option:selected");

        if (estadoSelecionado.val()) {

            let id = estadoSelecionado.attr('data-id');

            $.getJSON('https://servicodados.ibge.gov.br/api/v1/localidades/estados/' + id + '/municipios', function (city) {

                let options = '<option value="" disabled selected>Selecione a cidade</option>';

                for (let i = 0; i < city.length; i++) {
                    options += '<option value="' + city[i].nome + '">' + city[i].nome + '</option>';
                }

                $("#city").html(options);
            });

        } else {
            $("#city").html('<option value="" disabled selected>Selecione sua cidade</option>');
        }
    });

});


let botao = document.getElementById("validar");
let mensagem = document.getElementById("mensagem");

let endereco = document.getElementById("endereco");
let numero = document.getElementById("numero");
let complemento = document.getElementById("complemento");

let uf = document.getElementById("uf");
let cidade = document.getElementById("city");

document.addEventListener("click", function(e) {
    if (e.target.closest(".add-telefone")) {

        let container = document.getElementById("telefones");
        let total = document.querySelectorAll(".telefone-item").length;

        if (total >= 3) {
            alert("Máximo de 3 telefones!");
            return;
        }

        let novoCampo = document.createElement("div");
        novoCampo.classList.add("telefone-item");

        novoCampo.innerHTML = `
            <input type="text" class="telefone" placeholder="Telefone">
            <button type="button" class="add-telefone">
                <i class="bi bi-plus-circle"></i>
            </button>
            <button type="button" class="remove-telefone">
                <i class="bi bi-trash"></i>
            </button>
        `;

        container.appendChild(novoCampo);
    }

    if (e.target.closest(".remove-telefone")) {

        let item = e.target.closest(".telefone-item");
        let total = document.querySelectorAll(".telefone-item").length;

        if (total > 1) {
            item.remove();
        } else {
            alert("Deixe pelo menos um telefone!");
        }
    }
});

botao.addEventListener("click", function(e) {
    e.preventDefault();

    let telefones = document.querySelectorAll(".telefone");

for (let tel of telefones) {
    if (tel.value.trim().length < 14) {
        mensagem.style.color = "red";
        mensagem.textContent = "Preencha todos os telefones corretamente";
        return;
    }
}
    if (uf.value === "") {
        mensagem.style.color = "red";
        mensagem.textContent = "Selecione um estado";
        valido = false;
        return;
    }
    if (!cidade.value) {
        mensagem.style.color = "red";
        mensagem.textContent = "Selecione uma cidade";
        valido = false;
        return;
    }
    if (endereco.value.trim() === "") {
            mensagem.style.color = "red";
        mensagem.textContent = "Digite o endereço";
        valido = false;
        return;
    }
    if (numero.value.trim() === "") {
    mensagem.style.color = "red";
        mensagem.textContent = "Digite o número";
        valido = false;
        return;
    }

    if (valido) {
           mensagem.style.color = "green";
            mensagem.textContent = "Cadastro concluído com sucesso!";
        telefone.value = "";
    endereco.value = "";
        numero.value = "";
        complemento.value = "";

                 uf.value = "";
        cidade.innerHTML = '<option value="" disabled selected>Estado primeiro</option>';

    setTimeout(function() {
            mensagem.textContent = "";
        }, 3000);
    }

    if (valido) {
    mensagem.style.color = "green";
    mensagem.textContent = "Cadastro concluído com sucesso!";
    telefone.value = "";
    endereco.value = "";
    numero.value = "";
    complemento.value = "";
    uf.selectedIndex = 0;
    cidade.innerHTML = '<option value="">Estado primeiro</option>';
}
});