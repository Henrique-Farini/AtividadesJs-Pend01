const apiUrl = 'https://pokeapi.co/api/v2/pokemon';
const galleryGrid = document.querySelector('#gallery-grid');
const galleryLoading = document.querySelector('#gallery-loading');

function capitalize(name) {
    return name.charAt(0).toUpperCase() + name.slice(1);
}

function getImage(id) {
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
}

function renderGallery(pokemonList) {
    pokemonList.forEach((pokemon, index) => {
        const image = document.createElement('div');
        image.className = `gallery-image gallery-image-${(index % 5) + 1}`;
        const pokemonId = pokemon.url.split('/').filter(Boolean).pop();
        image.innerHTML = `<img src="${getImage(pokemonId)}" alt="${capitalize(pokemon.name)}" loading="lazy">`;
        galleryGrid.appendChild(image);
    });
    galleryLoading.hidden = true;
}

async function loadGallery() {
    try {
        const response = await fetch(`${apiUrl}?limit=251&offset=0`);
        if (!response.ok) throw new Error('Falha ao carregar a galeria.');
        const listData = await response.json();
        renderGallery(listData.results);
    } catch (error) {
        galleryLoading.textContent = 'Não foi possível carregar a galeria. Verifique sua conexão e atualize a página.';
        console.error(error);
    }
}

loadGallery();
