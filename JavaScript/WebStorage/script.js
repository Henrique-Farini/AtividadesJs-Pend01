const nome = document.querySelector("#nome");
const botaoSalvar = document.querySelector("#salvar");
const botaoRecuperar = document.querySelector("#botaoRecuperar");
const botaoExcluir = document.querySelector("#excluir");

const resultado = document.querySelector("#resultado");

//Salvar
botaoSalvar.addEventListener("click", function () {
  localStorage.setItem("nome", nome.value);
  resultado.innerHTML = "Nome salvo!";
});

//Recuperar
botaoRecuperar.addEventListener("click", function () {
  const nomeSalvo = localStorage.getItem("nome");
  resultado.textContent = `Nome armazenado/recuperado: ${nomeSalvo}`;
});

//Excluir
botaoExcluir.addEventListener("click", function () {
    localStorage.removeItem("nome");
    resultado.textContent = "Nome excluído!";
});