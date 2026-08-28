const produto = document.querySelector('#produtos');
const carrinho = document.querySelector('#carrinho');

//event = objeto fornecido pelo navegador que contém informações sobre o evento que ocorreu
//dataTransfer = propriedade do objeto event que permite transferir dados entre elementos durante operações de arrastar e soltar
produto.addEventListener("dragstart", function (event) {
    event.dataTransfer.setData("text", event.target.id);
});

//mudar o padrão
carrinho.addEventListener("dragover", function (event) {
    event.preventDefault();
    console.log("Pode soltar aqui no carrinho!");
});


carrinho.addEventListener("drop", function (event) {
    event.preventDefault();

    const id = event.dataTransfer.getData("text");
    const elemento = document.getElementById(id);
    carrinho.appendChild(elemento);
});
