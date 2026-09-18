const huntButton = document.querySelector('#hunt-button');
const locateButton = document.querySelector('#locate-button');
const buttonLabel = document.querySelector('#button-label');
const statusMessage = document.querySelector('#status-message');
const locationLabel = document.querySelector('#location-label');
const foundCount = document.querySelector('#found-count');
const distanceCount = document.querySelector('#distance-count');
const streakCount = document.querySelector('#streak-count');
const inventoryGrid = document.querySelector('#inventory-grid');
const emptyInventory = document.querySelector('#empty-inventory');
const inventoryTotal = document.querySelector('#inventory-total');
const captureScreen = document.querySelector('#capture-screen');
const capturePokemon = document.querySelector('#capture-pokemon');
const captureName = document.querySelector('#capture-name');
const captureType = document.querySelector('#capture-type');
const backMapButton = document.querySelector('#back-map-button');
const catchDock = document.querySelector('#catch-dock');
const pokeball = document.querySelector('#pokeball');

const defaultPosition = [-23.5505, -46.6333];
let playerPosition = [...defaultPosition];
let map;
let playerMarker;
let creatureLayer;
let captures = 0;
let totalDistance = 0;
let activeCreature;
let isDraggingPokeball = false;
let capturedPokemon = [];

function createMap() {
    map = L.map('map', { zoomControl: false }).setView(playerPosition, 15);
    L.control.zoom({ position: 'bottomright' }).addTo(map);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors',
        maxZoom: 19
    }).addTo(map);
    creatureLayer = L.layerGroup().addTo(map);
    setPlayerMarker();
}

function setPlayerMarker() {
    const playerIcon = L.divIcon({
        className: 'player-marker-wrapper',
        html: '<span class="player-marker"><span></span></span>',
        iconSize: [28, 28],
        iconAnchor: [14, 14]
    });

    if (playerMarker) playerMarker.setLatLng(playerPosition);
    else playerMarker = L.marker(playerPosition, { icon: playerIcon, zIndexOffset: 1000 }).addTo(map);
}

function updateLocation(position) {
    playerPosition = [position.coords.latitude, position.coords.longitude];
    locationLabel.textContent = 'Sua localização atual';
    setPlayerMarker();
    map.setView(playerPosition, 16);
}

function locatePlayer() {
    if (!navigator.geolocation) {
        locationLabel.textContent = 'Localização aproximada';
        return;
    }

    navigator.geolocation.getCurrentPosition(updateLocation, () => {
        locationLabel.textContent = 'Localização aproximada';
    });
}

async function fetchCreature() {
    const creatureId = Math.floor(Math.random() * 151) + 1;
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${creatureId}`);
    if (!response.ok) throw new Error('Não foi possível consultar a PokeAPI.');
    return response.json();
}

function formatName(name) {
    return name.charAt(0).toUpperCase() + name.slice(1);
}

function placeCreature(creature) {
    const angle = Math.random() * Math.PI * 2;
    const distance = 0.001 + Math.random() * 0.003;
    const latitude = playerPosition[0] + Math.cos(angle) * distance;
    const longitude = playerPosition[1] + Math.sin(angle) * distance;
    const typeName = formatName(creature.types[0].type.name);
    const creatureIcon = L.divIcon({
        className: 'creature-marker-wrapper',
        html: `<span class="creature-marker"><img src="${creature.sprites.front_default}" alt="${formatName(creature.name)}"></span>`,
        iconSize: [100, 114],
        iconAnchor: [50, 100],
        popupAnchor: [0, -100]
    });

    const marker = L.marker([latitude, longitude], { icon: creatureIcon }).addTo(creatureLayer);
    const captureButton = `<button class="capture-popup-button" type="button" data-capture="${creature.id}">Abrir captura</button>`;
    marker.bindPopup(`<strong>${formatName(creature.name)}</strong><br><span>${typeName} · pronto para a captura</span>${captureButton}`).openPopup();
    map.flyTo([latitude, longitude], 17, { duration: 0.8 });
    activeCreature = { creature, marker, typeName, distance: Math.round(distance * 111000) };
}

function captureCreature() {
    if (!activeCreature) return;

    const { creature, marker, typeName, distance } = activeCreature;
    captures += 1;
    totalDistance += distance;
    foundCount.textContent = captures;
    distanceCount.textContent = `${totalDistance} m`;
    streakCount.textContent = String(Math.min(captures + 1, 99)).padStart(2, '0');
    capturedPokemon.unshift({ name: creature.name, typeName, image: creature.sprites.front_default });
    renderInventory();
    statusMessage.textContent = `${formatName(creature.name)} foi capturado a ${distance} m de você.`;
    marker.closePopup();
    creatureLayer.removeLayer(marker);
    activeCreature = null;
    closeCaptureScreen();
}

function renderInventory() {
    emptyInventory.hidden = true;
    inventoryTotal.textContent = `${String(capturedPokemon.length).padStart(2, '0')}/06`;
    inventoryGrid.querySelectorAll('.inventory-item').forEach((item) => item.remove());
    if (capturedPokemon.length === 0) {
        for (let slot = 0; slot < 6; slot += 1) {
            const emptySlot = document.createElement('div');
            emptySlot.className = 'inventory-item empty-slot';
            emptySlot.innerHTML = '<span>+</span><small>vazio</small>';
            inventoryGrid.appendChild(emptySlot);
        }
        return;
    }
    capturedPokemon.slice(0, 6).forEach((pokemon) => {
        const item = document.createElement('div');
        item.className = 'inventory-item';
        item.innerHTML = `<img src="${pokemon.image}" alt="${formatName(pokemon.name)}"><strong>${formatName(pokemon.name)}</strong><span>${pokemon.typeName}</span>`;
        inventoryGrid.appendChild(item);
    });
}

function openCaptureScreen() {
    if (!activeCreature) return;
    const { creature, typeName } = activeCreature;
    capturePokemon.src = creature.sprites.other?.['official-artwork']?.front_default || creature.sprites.front_default;
    capturePokemon.alt = formatName(creature.name);
    captureName.textContent = formatName(creature.name);
    captureType.textContent = typeName;
    captureScreen.hidden = false;
    catchDock.hidden = false;
    activeCreature.marker.closePopup();
    window.setTimeout(() => map.invalidateSize(), 50);
}

function closeCaptureScreen() {
    captureScreen.hidden = true;
    catchDock.hidden = true;
    resetPokeball();
}

function resetPokeball() {
    pokeball.classList.remove('dragging', 'success', 'miss');
    pokeball.style.left = '';
    pokeball.style.top = '';
}

function movePokeball(event) {
    if (!isDraggingPokeball) return;
    pokeball.style.left = `${event.clientX - 34}px`;
    pokeball.style.top = `${event.clientY - 34}px`;
}

function dropPokeball(event) {
    if (!isDraggingPokeball) return;
    isDraggingPokeball = false;
    pokeball.releasePointerCapture(event.pointerId);
    pokeball.classList.remove('dragging');

    const targetBounds = capturePokemon.getBoundingClientRect();
    if (!activeCreature || !targetBounds.width) return resetPokeball();
    const targetCenter = {
        x: targetBounds.left + targetBounds.width / 2,
        y: targetBounds.top + targetBounds.height / 2
    };
    const distanceToTarget = Math.hypot(event.clientX - targetCenter.x, event.clientY - targetCenter.y);

    if (distanceToTarget < 170) {
        pokeball.classList.add('success');
        window.setTimeout(captureCreature, 350);
    } else {
        pokeball.classList.add('miss');
        statusMessage.textContent = 'Quase! Arraste a Pokébola até o Pokémon.';
        window.setTimeout(resetPokeball, 450);
    }
}

function startPokeballDrag(event) {
    if (!activeCreature) return;
    event.preventDefault();
    isDraggingPokeball = true;
    pokeball.setPointerCapture(event.pointerId);
    pokeball.classList.add('dragging');
    movePokeball(event);
    statusMessage.textContent = 'Leve a Pokébola até o Pokémon...';
}

async function hunt() {
    huntButton.disabled = true;
    buttonLabel.textContent = 'Procurando...';
    statusMessage.textContent = 'Consultando a PokeAPI...';

    try {
        const creature = await fetchCreature();
        if (activeCreature) creatureLayer.removeLayer(activeCreature.marker);
        activeCreature = null;
        closeCaptureScreen();
        placeCreature(creature);
        statusMessage.textContent = `${formatName(creature.name)} apareceu no mapa. Clique nele para capturar.`;
    } catch (error) {
        statusMessage.textContent = 'Não foi possível concluir a busca. Tente novamente.';
        console.error(error);
    } finally {
        huntButton.disabled = false;
        buttonLabel.textContent = 'Explorar área';
    }
}

huntButton.addEventListener('click', hunt);
locateButton.addEventListener('click', locatePlayer);
backMapButton.addEventListener('click', closeCaptureScreen);
pokeball.addEventListener('pointerdown', startPokeballDrag);
pokeball.addEventListener('pointermove', movePokeball);
pokeball.addEventListener('pointerup', dropPokeball);
pokeball.addEventListener('pointercancel', dropPokeball);
document.addEventListener('click', (event) => {
    if (event.target.closest('.capture-popup-button')) openCaptureScreen();
});
renderInventory();
createMap();
locatePlayer();