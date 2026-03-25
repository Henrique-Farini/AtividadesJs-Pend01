let botao = document.getElementById("validar");
let senha = document.getElementById("senha");
let email = document.getElementById("email");
let validasenha = document.getElementById("psenha");
let validamail = document.getElementById("pmail");
let senhab = document.querySelector("#botaosenha");

botao.addEventListener("click", function() {
    
    if (senha.value.trim().length === 0) {
        validasenha.style.color = "red";
        validasenha.textContent = "Preencha a senha primeiro!";
        validamail.textContent = "";
        return;
    }

    let imail = email.value.trim();

    if (imail.includes("@") && imail.includes(".") ) {
        validamail.style.color = "green";
        validamail.textContent = "Sucesso";
    } else if(imail.length > 0) {
        validamail.style.color = "red";
        validamail.textContent = "E-mail inválido";
    } else {
        validamail.style.color = "purple";
        validamail.textContent = "O campo e-mail é obrigatório";
    } 
});

senha.addEventListener("keyup", function() {
    let valor = senha.value.trim();
    let tamanho = valor.length;
    
    if (tamanho === 0) {
        validasenha.textContent = "";
        return;
    }

    if (tamanho < 6) {
        validasenha.style.color = "red";
        validasenha.textContent = "Senha fraca, utilize mais que 6 caracteres";
    } 
    else if (tamanho >= 6 && tamanho <= 10) {
        validasenha.style.color = "orange";
        validasenha.textContent = "Senha aceitável, para melhor segurança use mais que 10";
    } 
    else {
        validasenha.style.color = "green";
        validasenha.textContent = "Senha forte";
    }
});

senhab.addEventListener("click", function() {
    if (senha.type === "password") {
        senha.setAttribute('type', 'text');
        senhab.classList.replace('bi-eye-slash-fill', 'bi-eye-fill');
    } else {
        senha.setAttribute('type', 'password');
        senhab.classList.replace('bi-eye-fill', 'bi-eye-slash-fill');
    }
});
