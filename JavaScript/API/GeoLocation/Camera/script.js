const video = document.querySelector('#camera');
const canvas = document.querySelector('#canvas');
const botao = document.querySelector('#botao');
const foto = document.querySelector('#foto');

navigator.mediaDevices.getUserMedia({ video: true })
    .then(function(stream) {
        video.srcObject = stream;
    })
    .catch(function(erro) {
        console.error("Erro na câmera:", erro.name, erro.message);
    });

botao.addEventListener('click', function() {
    const contexto = canvas.getContext('2d');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    contexto.drawImage(video, 0, 0, canvas.width, canvas.height);
    foto.src = canvas.toDataURL('image/png');
});