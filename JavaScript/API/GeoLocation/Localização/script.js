const mensagem = document.getElementById("mensagem");
const latitude = document.getElementById("latitude");
const longitude = document.getElementById("longitude");
const precisao = document.getElementById("precisao");
const imagemErro = document.getElementById("erro-imagem");

function exibirErro(texto) {
    document.querySelector("main").classList.add("localizacao-negada");
    mensagem.textContent = texto;
    mensagem.classList.add("erro");
    imagemErro.hidden = false;
}

function exibirLocalizacao(position) {
    const coordenadas = position.coords;

    latitude.textContent = coordenadas.latitude.toFixed(6);
    longitude.textContent = coordenadas.longitude.toFixed(6);
    precisao.textContent = `${coordenadas.accuracy.toFixed(1)} m`;
    mensagem.textContent = "Localização obtida com sucesso.";
}

if (!navigator.geolocation) {
    exibirErro("Seu navegador não oferece suporte à geolocalização.");
} else {
    navigator.geolocation.getCurrentPosition(
        exibirLocalizacao,
        function (error) {
            const mensagens = {
                1: "Permissão de localização negada.",
                2: "Não foi possível determinar sua localização.",
                3: "A solicitação de localização expirou."
            };

            exibirErro(mensagens[error.code] || "Não foi possível obter sua localização.");
            console.error("Erro na localização:", error.message);
        },
        {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 0
        }
    );
}