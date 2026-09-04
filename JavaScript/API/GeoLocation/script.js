const video = document.querySelector('#camera');
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
