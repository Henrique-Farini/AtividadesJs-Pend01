

class Aluno { 
  constructor(nome, idade, curso, matricula) { 
    this.nome = nome; 
    this.idade = idade; 
    this.curso = curso; 
    this.matricula = matricula; 
  } 
  estudar() { 
    console.log(`${this.nome} está estudando`); 
  } 
  apresentar() { 
    console.log(`${this.nome} está fazendo uma ótima apresentação`); 
  } 
} 

// const aluno1 = new Aluno('Henrique', 18, 'IA', '53563'); 
// aluno1.estudar(); 
// aluno1.apresentar(); 
// aluno1.exibirNaTela(); 

class Turma { 
  constructor() { 
    this.alunos = []; 
  } 
  adicionarAluno(aluno) { 
    this.alunos.push(aluno); 
  } 
  exibirNaTela() { 
    const resultado = document.querySelector('#resultado'); 
    resultado.innerHTML = ""; 
    this.alunos.forEach(aluno => { 
      resultado.innerHTML += ` 
        <div> 
          <p>Nome: ${aluno.nome}</p> 
          <p>Idade: ${aluno.idade}</p> 
          <p>Curso: ${aluno.curso}</p> 
          <p>Matrícula: ${aluno.matricula}</p> 
          <hr> 
        </div> 
      `; 
    }); 
  } 
}

const alunos = []; 
const turma = new Turma(); 
const nome = document.querySelector('#nome'); 
const idade = document.querySelector('#idade'); 
const curso = document.querySelector('#curso'); 
const matricula = document.querySelector('#matricula'); 
const botaoCadastrar = document.querySelector('#botaoCadastrar'); 
const resultado = document.querySelector('#resultado'); 

botaoCadastrar.addEventListener('click', function() { 
  const aluno = new Aluno(nome.value, idade.value, curso.value, matricula.value); 
  // aluno.estudar(); 
  // aluno.exibirNaTela(); 
  // alunos.push(aluno); 
  // console.log(alunos); 
  turma.adicionarAluno(aluno); 
  turma.exibirNaTela(); 
  // aluno.apresentar(); 
  // aluno.exibirNaTela(); 
  // console.log(aluno); 
  // console.log(aluno.nome); 
  // console.log(aluno.idade); 
  // console.log(aluno.curso); 
  // console.log(aluno.matricula); 
  // aluno.exibirNaTela(); 
}); 