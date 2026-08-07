class Carro {
    //Atributos do carro 
    marca; 
    modelo;
    ano;
    cor;

    // Construtor da classe
    // O construtor é um método especial que é chamado quando uma nova instância da classe é criada. Ele é usado para inicializar os atributos do objeto com valores fornecidos como argumentos.
    constructor(marca, modelo, ano, cor) {
        // Inicializa os atributos do carro com os valores fornecidos
        
        this.marca = marca;
        this.modelo = modelo;
        this.ano = ano;
        this.cor = cor;
    }

    ligar() {
        console.log(`O carro ${this.marca} ${this.modelo} está ligado.`);
    }
    acelerar() {
        console.log(`O carro ${this.marca} ${this.modelo} está acelerando.`);
    }

} 

const carro1 = new Carro("Volkswagen", "Gol", 2022, "Branco");
console.log("Carro 1:", carro1); //  Saída: Carro { marca: 'Volkswagen', modelo: 'Gol', ano: 2022, cor: 'Branco' }

const carro2 = new Carro("Toyota", "Corolla", 2025, "Preto");
console.log("Carro 2:", carro2); // Saída: Carro { marca: 'Toyota', modelo: 'Corolla', ano: 2025, cor: 'Preto' }

const carro3 = new Carro("Honda", "Civic", 2023, "Cinza");
console.log("Carro 3:", carro3); // Saída: Carro { marca: 'Honda', modelo: 'Civic', ano: 2023, cor: 'Cinza' }

console.log("---------------------------------");
console.log("Atributos do carro 1:");
console.log("-", carro1.marca);
console.log("-", carro1.modelo);
console.log("-", carro1.ano);
console.log("-", carro1.cor);
console.log("---------------------------------");


console.log("---------------------------------");
console.log("Atributos do carro 2:");
console.log("-", carro2.marca);
console.log("-", carro2.modelo);
console.log("-", carro2.ano);
console.log("-", carro2.cor);
console.log("---------------------------------");

console.log("---------------------------------");
console.log("Atributos do carro 3:");
console.log("-", carro3.marca);
console.log("-", carro3.modelo);
console.log("-", carro3.ano);
console.log("-", carro3.cor);
console.log("---------------------------------");

console.log("---------------------------------");
console.log("Métodos do carro 1:");
carro1.ligar();
carro1.acelerar();
console.log("---------------------------------");

console.log("---------------------------------");
console.log("Métodos do carro 2:");
carro2.ligar();
carro2.acelerar();
console.log("---------------------------------");                                                                                       

console.log("---------------------------------");
console.log("Métodos do carro 3:");
carro3.ligar();
carro3.acelerar();
console.log("---------------------------------");