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

const nome = document.querySelector('#nome'); 
const preco = document.querySelector('#preco'); 
const categoria = document.querySelector('#categoria'); 
const desconto = document.querySelector('#desconto'); 
const botaoCadastrar = document.querySelector('#botaoCadastrar'); 

botaoCadastrar.addEventListener('click', function() { 

    const produto = new Produto(
        nome.value, 
        parseFloat(preco.value), 
        categoria.value, 
        parseFloat(desconto.value)
    ); 

    produto.aplicarDesconto(); 
    produto.exibirNaTela(); 

});