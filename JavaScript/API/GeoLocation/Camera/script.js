const video = document.querySelector('#camera');

navigator.mediaDevices.getUserMedia({ video: true })
    .then(function(stream) {
        video.srcObject = stream;
    })
    .catch(function(erro) {
        console.error("Erro na câmera:", erro.name, erro.message);
    });
