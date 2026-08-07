//Objeto: Aluno
class
 Aluno {
    nome;
    idade;
    curso;
    matricula;

    constructor(nome, idade, curso, matricula) {
        this.nome = nome;
        this.idade = idade;
        this.curso = curso;
        this.matricula = matricula;
    }

    cursando() {
        console.log(`O aluno ${this.nome} está cursando ${this.curso}.`);
    }

    matriculado() {
        console.log(`O aluno ${this.nome} está matriculado com o número ${this.matricula}.`);
    }
    mostrarInformacoes() {
        console.log(`Informações do aluno:`);
        console.log(`Nome: ${this.nome}`);
        console.log(`Idade: ${this.idade}`);
        console.log(`Curso: ${this.curso}`);
        console.log(`Matrícula: ${this.matricula}`);
    }

}

const aluno1 = new Aluno("Henrique", 18, "Engenharia de Software", "65321");
// Saída: Aluno { nome: 'Henrique', idade: 18, curso: 'Engenharia de Software', matricula: '65321' }

const aluno2 = new Aluno("Gustavo", 18, "Engenharia de Software", "67890");
 // Saída: Aluno { nome: 'Gustavo', idade: 18, curso: 'Engenharia de Software', matricula: '67890' }

const aluno3 = new Aluno("Leonardo", 18, "Engenharia de Software", "12345");
// Saída: Aluno { nome: 'Leonardo', idade: 18, curso: 'Engenharia de Software', matricula: '12345' }

console.log("---------------------------------");
aluno1.mostrarInformacoes();
console.log("---------------------------------");
aluno2.mostrarInformacoes();
console.log("---------------------------------");
aluno3.mostrarInformacoes();
console.log("---------------------------------");
aluno1.cursando();
aluno1.matriculado();
console.log("---------------------------------");
aluno2.cursando();
aluno2.matriculado();
console.log("---------------------------------");
aluno3.cursando();
aluno3.matriculado();
console.log("---------------------------------");
