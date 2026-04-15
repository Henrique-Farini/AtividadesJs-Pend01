document.addEventListener("input", function(e) {
    if (e.target.classList.contains("telefone")) {

        let telefone = e.target;

        let valor = telefone.value.replace(/\D/g, "");

        valor = valor.substring(0, 11);

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

function scrollErro(elemento) {
    elemento.scrollIntoView({
        behavior: "smooth",
        block: "center"
    });
    elemento.focus();
}

$(function() {

    $.getJSON('https://servicodados.ibge.gov.br/api/v1/localidades/estados/', function (uf) {

        let options = '<option value="">Selecione o estado</option>';

        uf.sort((a, b) => a.nome.localeCompare(b.nome));

        for (let i = 0; i < uf.length; i++) { 
            options += `<option data-id="${uf[i].id}" value="${uf[i].nome}">${uf[i].nome}</option>`;
        }

        $("#uf").html(options);
    });

    $("#uf").change(function () {

        let estadoSelecionado = $(this).find("option:selected");

        if (estadoSelecionado.val()) {

            let id = estadoSelecionado.attr('data-id');

            $.getJSON(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${id}/municipios`, function (city) {

                let options = '<option value="" disabled selected>Selecione a cidade</option>';

                for (let i = 0; i < city.length; i++) {
                    options += `<option value="${city[i].nome}">${city[i].nome}</option>`;
                }

                $("#city").html(options);
            });

        } else {
            $("#city").html('<option value="" disabled selected>Selecione sua cidade</option>');
        }
    });

});

let cepInput = document.getElementById("cep");

cepInput.addEventListener("input", function() {

    let cep = cepInput.value.replace(/\D/g, "");

    if (cep.length > 5) {
        cepInput.value = cep.substring(0,5) + "-" + cep.substring(5,8);
    } else {
        cepInput.value = cep;
    }

    if (cep.length === 0) {
        endereco.value = "";
        uf.selectedIndex = 0;
        cidade.innerHTML = '<option value="">Selecione a cidade</option>';
        return;
    }

    if (cep.length === 8) {

        cepInput.classList.add("carregando");

        fetch(`https://viacep.com.br/ws/${cep}/json/`)
            .then(res => res.json())
            .then(dados => {

                cepInput.classList.remove("carregando");

                if (dados.erro) {
                    mensagem.style.color = "red";
                    mensagem.textContent = "CEP não encontrado";
                    scrollErro(cepInput);
                    return;
                }

                endereco.value = dados.logradouro || "";

                let optionsUF = uf.options;
                for (let i = 0; i < optionsUF.length; i++) {
                    if (optionsUF[i].value === dados.uf) {
                        uf.selectedIndex = i;
                        break;
                    }
                }

                $("#uf").trigger("change");

                setTimeout(() => {
                    let optionsCidade = cidade.options;

                    for (let i = 0; i < optionsCidade.length; i++) {
                        if (optionsCidade[i].value === dados.localidade) {
                            cidade.selectedIndex = i;
                            break;
                        }
                    }
                }, 500);

            })
            .catch(() => {
                cepInput.classList.remove("carregando");
                mensagem.style.color = "red";
                mensagem.textContent = "Erro ao buscar CEP";
                scrollErro(cepInput);
            });
    }
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
            <button type="button" class="add-telefone">+</button>
            <button type="button" class="remove-telefone">🗑</button>
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

    let valido = true;
    mensagem.textContent = "";

    let telefones = document.querySelectorAll(".telefone");

    for (let tel of telefones) {
        if (tel.value.trim().length < 14) {
            mensagem.style.color = "red";
            mensagem.textContent = "Preencha todos os telefones corretamente";
            valido = false;
            return;
        }
    }

    if (uf.value === "") {
        mensagem.style.color = "red";
        mensagem.textContent = "Selecione um estado";
        return;
    }

    
    if (!cidade.value) {
        mensagem.style.color = "red";
        mensagem.textContent = "Selecione uma cidade";
        return;
    }

    
    if (endereco.value.trim() === "") {
        mensagem.style.color = "red";
        mensagem.textContent = "Digite o endereço";
        return;
    }


    if (numero.value.trim() === "") {
        mensagem.style.color = "red";
        mensagem.textContent = "Digite o número";
        return;
    }

    
    if (valido) {
        mensagem.style.color = "green";
        mensagem.textContent = "Cadastro concluído com sucesso!";
        cepInput.value = "";

        // limpar telefones
        telefones.forEach(t => t.value = "");

        endereco.value = "";
        numero.value = "";
        complemento.value = "";

        uf.selectedIndex = 0;
        cidade.innerHTML = '<option value="">Estado primeiro</option>';

        setTimeout(() => {
            mensagem.textContent = "";
        }, 3000);
    }
});