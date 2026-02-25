
    let botao = document.getElementById("botao");
    botao.addEventListener("click", function() {
        alert("Olá! Dom");
    });


    document.getElementById("escuro")
    .addEventListener("click", function() {
        document.body.classList.toggle("dark-mode");
        
    }); 


    
const butao = document.querySelector("#escuro");


butao.addEventListener('click', function() {
   
    if (this.innerText === "☼︎") {
        this.innerText = "☾";
    } else {
        this.innerText = "☼︎";
    }
});




