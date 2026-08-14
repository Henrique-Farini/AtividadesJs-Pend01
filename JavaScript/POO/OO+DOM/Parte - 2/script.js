class Produto {  
    constructor(nome, preco, categoria, desconto) { 
        this.nome = nome; 
        this.preco = preco; 
        this.categoria = categoria; 
        this.desconto = desconto; 
    } 

    aplicarDesconto() { 
        const precoComDesconto = this.preco - (this.preco * this.desconto / 100); 
        this.precoComDesconto = precoComDesconto;

    } 

    exibirNaTela() { 
        const resultado = document.querySelector('#resultado'); 

        resultado.innerHTML = ` 
            <p>Nome: ${this.nome}</p> 
            <p>Preço: R$ ${this.preco.toFixed(2)}</p> 
            <p>Categoria: ${this.categoria}</p> 
            <p>Desconto: ${this.desconto}%</p> 
            <p>Preço com desconto: R$ ${this.precoComDesconto.toFixed(2)}</p>
        `; 
    } 
}

class Loja { 
    constructor() {  
        this.produtos = [];  
    }  

    adicionarProduto(produto) {  
        this.produtos.push(produto);  
    } 
}

const loja = new Loja();     

const nome = document.querySelector('#nome'); 
const preco = document.querySelector('#preco'); 
const categoria = document.querySelector('#categoria'); 
const desconto = document.querySelector('#desconto'); 
const botaoCadastrar = document.querySelector('#botaoCadastrar'); 

botaoCadastrar.addEventListener('click', function() { 

    if (nome.value === "" || preco.value === "" || categoria.value === "" || desconto.value === "") {
        alert("Preencha todos os campos!");
        return;
    }

    const produto = new Produto(
        nome.value, parseFloat(preco.value), categoria.value, parseFloat(desconto.value)
    ); 

    loja.adicionarProduto(produto); 
    produto.aplicarDesconto(); 
    produto.exibirNaTela(); 
    
nome.value = "";
preco.value = "";
categoria.value = "";
desconto.value = "";

});

