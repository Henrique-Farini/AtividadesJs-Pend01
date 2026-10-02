import { processarMensagem } from './cerebro.js';

const caixaChat = document.getElementById('caixa-chat');
const entradaUsuario = document.getElementById('entrada-usuario');
const btnEnviar = document.getElementById('btn-enviar');

function adicionarMensagem(texto, remetente) {
    const elementoMsg = document.createElement('div');
    elementoMsg.className = `msg ${remetente}`;
    elementoMsg.textContent = texto;
    caixaChat.appendChild(elementoMsg);
    
    caixaChat.scrollTop = caixaChat.scrollHeight;
}

function enviarMensagem() {
    const texto = entradaUsuario.value;
    if (!texto.trim()) return;

    adicionarMensagem(texto, 'user');
    entradaUsuario.value = '';

    setTimeout(() => {
        const respostaIA = processarMensagem(texto);
        adicionarMensagem(respostaIA, 'ai');
    }, 500);
}

btnEnviar.addEventListener('click', enviarMensagem);
entradaUsuario.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') enviarMensagem();
});
