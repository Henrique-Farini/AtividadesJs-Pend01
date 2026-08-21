class Produto { 
    constructor(nome, preco, categoria, desconto) { 
        this.nome = nome; 
        this.preco = preco; 
        this.categoria = categoria; 
        this.desconto = desconto; 
        this.precoComDesconto = 0;
    } 

    aplicarDesconto() { 
        this.precoComDesconto = this.preco - (this.preco * this.desconto / 100); 
    } 
} 

class Loja { 
    constructor() { 
        this.produtos = []; 
         this.carregarLocalStorage(); 
    } 

    adicionarProduto(produto) { 
        this.produtos.push(produto); 
         this.localStorageSalvar()
        this.exibirTodos();  
    } 

    
    excluirUm(index) {
        this.produtos.splice(index, 1); 
        this.localStorageSalvar(); 
        this.exibirTodos(); 
    }

    localStorageSalvar() {
        localStorage.setItem("produtos", JSON.stringify(this.produtos));
    }

     carregarLocalStorage() {
    const dadosSalvos = localStorage.getItem("produtos");
    if (dadosSalvos) {
      this.produtos = JSON.parse(dadosSalvos);
      this.exibirTodos(); 
    }
  }

    excluirTodos() { 
        this.produtos = []; 
        this.exibirTodos();
    } 

    exibirTodos() {
        const resultado = document.querySelector('#resultado'); 
         if (!resultado) return;
        resultado.innerHTML = ""; 

        this.produtos.forEach((produto, index) => {
            resultado.innerHTML += ` 
                <div style="border-bottom: 1px solid #ccc; padding: 10px 0;">
                    <p>Nome: ${produto.nome}</p> 
                    <p>Preço: R$ ${produto.preco.toFixed(2)}</p> 
                    <p>Categoria: ${produto.categoria}</p> 
                    <p>Desconto: ${produto.desconto}%</p> 
                    <p>Preço com desconto: R$ ${produto.precoComDesconto.toFixed(2)}</p> 
                    <button onclick="loja.excluirUm(${index})">Excluir</button>
                </div>
            `; 
        });
    }
} 

const loja = new Loja(); 
const nome = document.querySelector('#nome'); 
const preco = document.querySelector('#preco'); 
const categoria = document.querySelector('#categoria'); 
const desconto = document.querySelector('#desconto'); 
const botaoCadastrar = document.querySelector('#botaoCadastrar'); 
const botaoExcluirTodos = document.querySelector('#botaoExcluirTodos'); 

botaoCadastrar.addEventListener('click', function() { 
    if (nome.value === "" || preco.value === "" || categoria.value === "" || desconto.value === "") { 
        alert("Preencha todos os campos!"); 
        return; 
    } 

    const produto = new Produto( 
        nome.value, 
        parseFloat(preco.value), 
        categoria.value, 
        parseFloat(desconto.value) 
    ); 

    produto.aplicarDesconto(); 
    
    loja.adicionarProduto(produto); 
    loja.localStorageSalvar();

    nome.value = ""; 
    preco.value = ""; 
    categoria.value = ""; 
    desconto.value = ""; 
}); 

botaoExcluirTodos.addEventListener('click', function() { 
    loja.excluirTodos(); 
});
