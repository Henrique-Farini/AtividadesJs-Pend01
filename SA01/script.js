let botao = document.getElementById("validar");
let nome = document.getElementById("nome");
let email = document.getElementById("email");
let senha = document.getElementById("senha");
let senha2 = document.getElementById("senha2");
let nomes = document.getElementById("pnome");
let validamail = document.getElementById("pmail");
let validasenha = document.getElementById("psenha");
let validasenha2 = document.getElementById("psenha2");
let botaoSenha = document.getElementById("botaosenha");
let botaoSenha2 = document.getElementById("botaosenha2");
let mascaraEmail = /\w+@\w+\.\w{2,}/;
let temNumero = /\d/;
let temLetra = /[a-zA-Z]/;
let mensagem = document.getElementById("mensagem");

botao.addEventListener("click", function(event) {
    event.preventDefault();

    let valido = true;

    let valorNome = nome.value.trim();

    if (valorNome === "") {
        nomes.style.color = "red";
        nomes.textContent = "O nome é obrigatório";
        valido = false;
    } 
    else if (valorNome.length < 3) {
        nomes.style.color = "orange";
        nomes.textContent = "Nome muito curto";
        valido = false;
    } 
    else {
        nomes.style.color = "green";
        nomes.textContent = "Nome válido";
    }

    let valorEmail = email.value.trim();

    if (valorEmail === "") {
        validamail.style.color = "red";
        validamail.textContent = "O e-mail é obrigatório";
        valido = false;
    } 
    else if (!mascaraEmail.test(valorEmail)) {
        validamail.style.color = "red";
        validamail.textContent = "E-mail inválido";
        valido = false;
    } 
    else {
        validamail.style.color = "green";
        validamail.textContent = "E-mail válido";
    }
let valorSenha = senha.value.trim();

if (valorSenha === "") {
    validasenha.style.color = "red";
    validasenha.textContent = "Digite uma senha";
    valido = false;
} 
else if (valorSenha.length < 6) {
    validasenha.style.color = "red";
    validasenha.textContent = "Senha fraca";
    valido = false;
} 
else if (!temNumero.test(valorSenha) || !temLetra.test(valorSenha)) {
    validasenha.style.color = "orange";
    validasenha.textContent = "Use letras e números";
    valido = false;
} 
else if (valorSenha.length <= 10) {
    validasenha.style.color = "orange";
    validasenha.textContent = "Senha válida";
} 
else {
    validasenha.style.color = "green";
    validasenha.textContent = "Senha forte";
}
    let valorSenha2 = senha2.value.trim();

    if (valorSenha2 === "") {
        validasenha2.style.color = "red";
        validasenha2.textContent = "Confirme a senha";
        valido = false;
    } 
    else if (valorSenha2 !== valorSenha) {
        validasenha2.style.color = "red";
        validasenha2.textContent = "As senhas não coincidem";
        valido = false;
    } 
    else {
        validasenha2.style.color = "green";
        validasenha2.textContent = "Senhas iguais";
    }
       if (valido) {
    mensagem.style.color = "green";
    mensagem.textContent = "Cadastro realizado com sucesso!";
    nome.value = "";
    email.value = "";
    senha.value = "";
    senha2.value = "";
    nomes.textContent = "";
    validamail.textContent = "";
    validasenha.textContent = "";
    validasenha2.textContent = "";
      setTimeout(function() {
        window.location.href = "pagina2.html"; 
    }, 100);
}
    });

    nome.addEventListener("keyup", function() {
    let valor = nome.value.trim();

    if (valor === "") {
        nomes.textContent = ""; 
    } 
    else if (valor.length < 3) {
        nomes.style.color = "orange";
        nomes.textContent = "Nome muito curto";
    } 
    else {
        nomes.style.color = "green";
        nomes.textContent = "Nome válido";
    }
});


senha.addEventListener("keyup", function() {
    let valor = senha.value.trim();
    let tamanho = valor.length;
    let temLetrasNumeros = temNumero.test(valor) && temLetra.test(valor);

    if (tamanho === 0) {
        validasenha.textContent = "";
    } 
    else if (tamanho < 6) {
        validasenha.style.color = "red";
        validasenha.textContent = "Senha muito curta";
    } 
    else if (!temLetrasNumeros) {
        validasenha.style.color = "orange";
        validasenha.textContent = "Use letras e números";
    }
    else if (tamanho <= 10) {
        validasenha.style.color = "orange";
        validasenha.textContent = "Senha válida";
    } 
    else {
        validasenha.style.color = "green";
        validasenha.textContent = "Senha forte";
    }
});

senha2.addEventListener("keyup", function() {
    let s1 = senha.value.trim();
    let s2 = senha2.value.trim();

    if (s2 === "") {
        validasenha2.textContent = "";
    } 
    else if (s1 !== s2) {
        validasenha2.style.color = "red";
        validasenha2.textContent = "Senhas diferentes";
    } 
    else {
        validasenha2.style.color = "green";
        validasenha2.textContent = "Senhas iguais";
    }
});

email.addEventListener("keyup", function() {
    let valor = email.value.trim();

    if (valor === "") {
        validamail.textContent = "";
    } 
    else if (!mascaraEmail.test(valor)) {
        validamail.style.color = "red";
        validamail.textContent = "E-mail inválido";
    } 
    else {
        validamail.style.color = "green";
        validamail.textContent = "E-mail válido";
    }
});

botaoSenha.addEventListener("click", function() {
    if (senha.type === "password") {
        senha.type = "text";
        botaoSenha.classList.remove("bi-eye-slash-fill");
        botaoSenha.classList.add("bi-eye-fill");
    } else {
        senha.type = "password";
        botaoSenha.classList.remove("bi-eye-fill");
        botaoSenha.classList.add("bi-eye-slash-fill");
    }
});

botaoSenha2.addEventListener("click", function() {
    if (senha2.type === "password") {
        senha2.type = "text";
        botaoSenha2.classList.remove("bi-eye-slash-fill");
        botaoSenha2.classList.add("bi-eye-fill");
    } else {
        senha2.type = "password";
        botaoSenha2.classList.remove("bi-eye-fill");
        botaoSenha2.classList.add("bi-eye-slash-fill");
    }
});