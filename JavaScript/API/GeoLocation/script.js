const video = document.querySelector('#camera');
const canvas = document.querySelector('#canvas');
const botao = document.querySelector('#botao');
const painelFoto = document.querySelector('#painel-foto');
const contexto = canvas.getContext('2d');
const textoLatitude = document.querySelector('#latitude');
const textoLongitude = document.querySelector('#longitude');
const textoPrecisao = document.querySelector('#precisao');

navigator.geolocation.getCurrentPosition(
    function(position) {
        const lat = position.coords.latitude.toFixed(4);
        const lon = position.coords.longitude.toFixed(4);
        const precisao = position.coords.accuracy.toFixed(1);
        textoLatitude.textContent = `Latitude: ${lat}`;
        textoLongitude.textContent = `Longitude: ${lon}`;
        textoPrecisao.textContent = `Precisão: ${precisao}m`;
    },
    function(erro) {
        textoLatitude.textContent = "Latitude: Indisponível";
        textoLongitude.textContent = "Longitude: Indisponível";
        textoPrecisao.textContent = "Precisão: Indisponível";
        console.error("Erro na localização (Código " + erro.code + "): " + erro.message);
    }
);

navigator.mediaDevices.getUserMedia({ video: true })
    .then(function(stream) {
        video.srcObject = stream;
    })
    .catch(function(erro) {
        console.error("Erro na câmera:", erro.name, erro.message);
    });

botao.addEventListener('click', function() {
    if (!video.videoWidth || !video.videoHeight) {
        return;
    }

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    contexto.save();
    contexto.scale(-1, 1);
    contexto.drawImage(video, -canvas.width, 0, canvas.width, canvas.height);
    contexto.restore();
    painelFoto.hidden = false;
});
