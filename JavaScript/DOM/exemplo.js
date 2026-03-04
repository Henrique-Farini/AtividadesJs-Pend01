document.getElementById("conteudo").innerHTML = "<p>Olá, mundo DOM! (Código HTML = innerHeight.HTML) </p>" ; // Altera o conteúdo do elemento com id "conteudo" para um parágrafo com texto

document.getElementById("mensagem").textContent = "Texto simples, sem html (Código JavaScript = textContent)"; // Altera o conteúdo do elemento com id "mensagem" para um texto simples, sem interpretar tags HTML 

document.getElementById("foto").setAttribute("src", "https://i.pinimg.com/736x/54/af/b9/54afb9b9af8fbb769564e620c66ca036.jpg"); // Altera o atributo "src" da imagem com id "foto" para a URL fornecida

let url = document.getElementById("link").getAttribute("href"); // Obtém o valor do atributo "href" do elemento com id "link"
console.log(url); // Exibe o valor do atributo "href" no console

document.getElementById("caixa").style.backgroundColor = "pink"; // Altera a cor de fundo do elemento com id "caixa" para rosa

document.getElementById("alerta").classList.add("destaque"); // Adiciona a classe "destaque" ao elemento com id "alerta"

document.getElementById("alert").classList.remove("oculto");

let novoParagrafo = document.createElement("p");
novoParagrafo.textContent = "Este elemento foi criado pelo JavaScript.";
document.getElementById("container").appendChild(novoParagrafo)

let NovoItem = document.createElement("li");
NovoItem.textContent = "Item novo";
document.getElementById("list").appendChild(NovoItem)

let item = document.getElementById("item1");
document.getElementById("lista").removeChild(item);





