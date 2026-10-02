const apiUrl = 'https://pokeapi.co/api/v2/pokemon';
const tcgApiUrl = 'https://api.pokemontcg.io/v2/cards?q=supertype:pokemon&pageSize=250&select=name,tcgplayer,cardmarket';
const pokemonCacheKey = 'pokes-nft-pokemon-cache-v1';
const cacheDuration = 1000 * 60 * 30;
const pokemonGrid = document.querySelector('#pokemon-grid');
const loadingMessage = document.querySelector('#loading-message');
const resultsLabel = document.querySelector('#results-label');
const searchInput = document.querySelector('#search-input');
const sortFilter = document.querySelector('#sort-filter');
const priceFilter = document.querySelector('#price-filter');
const priceValue = document.querySelector('#price-value');
const typeFilter = document.querySelector('#type-filter');
const statFilters = {
    hp: document.querySelector('#hp-filter'),
    attack: document.querySelector('#attack-filter'),
    defense: document.querySelector('#defense-filter'),
    speed: document.querySelector('#speed-filter')
};
const statValues = {
    hp: document.querySelector('#hp-value'),
    attack: document.querySelector('#attack-value'),
    defense: document.querySelector('#defense-value'),
    speed: document.querySelector('#speed-value')
};
const filterOpen = document.querySelector('#filter-open');
const filterClose = document.querySelector('#filter-close');
const filterApply = document.querySelector('#filter-apply');
const filterClear = document.querySelector('#filter-clear');
const filterPanel = document.querySelector('#filter-panel');
const filterBackdrop = document.querySelector('#filter-backdrop');
const loadMoreButton = document.querySelector('#load-more');
const dialog = document.querySelector('#pokemon-dialog');
const dialogContent = document.querySelector('#dialog-content');
const closeDialog = document.querySelector('#close-dialog');
const toast = document.querySelector('#toast');
const heroPrice = document.querySelector('#hero-price');

const typeNames = {
    normal: 'Normal', fire: 'Fogo', water: 'Água', electric: 'Elétrico', grass: 'Planta',
    ice: 'Gelo', fighting: 'Lutador', poison: 'Veneno', ground: 'Terra', flying: 'Voador',
    psychic: 'Psíquico', bug: 'Inseto', rock: 'Pedra', ghost: 'Fantasma', dragon: 'Dragão',
    dark: 'Sombrio', steel: 'Metal', fairy: 'Fada'
};

const statNames = {
    hp: 'Vida', attack: 'Ataque', defense: 'Defesa',
    'special-attack': 'Ataque especial', 'special-defense': 'Defesa especial', speed: 'Velocidade'
};

let pokemonList = [];
let visibleAmount = 16;
let selectedType = 'all';
let selectedPrice = 500;
let selectedSort = 'default';
let selectedStats = { hp: 0, attack: 0, defense: 0, speed: 0 };

function capitalize(name) {
    return name.charAt(0).toUpperCase() + name.slice(1);
}

function getImage(pokemon) {
    return pokemon.sprites.other?.['official-artwork']?.front_default || pokemon.sprites.front_default;
}

function getPrice(pokemon) {
    return Number(pokemon.marketPrices?.tcgPlayer || getFallbackPrice(pokemon)).toFixed(2);
}

function getMarketPrices(pokemon) {
    const tcgPrice = pokemon.marketPrices?.tcgPlayer || getFallbackPrice(pokemon);
    const cardmarketPrice = pokemon.marketPrices?.cardmarket || getFallbackPrice(pokemon) * 0.92;
    const tcgPrices = `US$ ${tcgPrice.toFixed(2).replace('.', ',')}`;
    const cardmarketPrices = `€ ${cardmarketPrice.toFixed(2).replace('.', ',')}`;
    return { tcgPrices, cardmarketPrices };
}

function getFallbackPrice(pokemon) {
    return Math.max(1.99, Number(((Number(pokemon.base_experience || 50) / 9) + (pokemon.id % 37) / 3).toFixed(2)));
}

async function fetchCachedJson(url, cacheKey) {
    try {
        const saved = JSON.parse(sessionStorage.getItem(cacheKey) || 'null');
        if (saved && Date.now() - saved.savedAt < cacheDuration) return saved.data;
    } catch (error) {
        sessionStorage.removeItem(cacheKey);
    }

    const response = await fetch(url);
    if (!response.ok) throw new Error(`Falha ao consultar ${url}`);
    const data = await response.json();
    try {
        sessionStorage.setItem(cacheKey, JSON.stringify({ savedAt: Date.now(), data }));
    } catch (error) {
        console.warn('Não foi possível armazenar o cache local.', error);
    }
    return data;
}

function typeLabel(type) {
    return typeNames[type] || capitalize(type);
}

function getStat(pokemon, statName) {
    return pokemon.stats.find((item) => item.stat.name === statName)?.base_stat || 0;
}

function getTotalStats(pokemon) {
    return pokemon.stats.reduce((total, stat) => total + stat.base_stat, 0);
}

function filteredPokemon() {
    const query = searchInput.value.trim().toLowerCase();
    const filteredItems = pokemonList.filter((pokemon) => {
        const matchesName = pokemon.name.includes(query);
        const matchesType = selectedType === 'all' || pokemon.types.some((item) => item.type.name === selectedType);
        const price = Number(getPrice(pokemon));
        const matchesPrice = price <= selectedPrice;
        const matchesStats = Object.entries(selectedStats).every(([statName, minimum]) => getStat(pokemon, statName) >= minimum);
        return matchesName && matchesType && matchesPrice && matchesStats;
    });

    if (selectedSort === 'price-asc') return filteredItems.sort((first, second) => Number(getPrice(first)) - Number(getPrice(second)));
    if (selectedSort === 'price-desc') return filteredItems.sort((first, second) => Number(getPrice(second)) - Number(getPrice(first)));
    return filteredItems;
}

function renderCards() {
    const items = filteredPokemon();
    pokemonGrid.innerHTML = '';
    resultsLabel.textContent = `${items.length} ${items.length === 1 ? 'resultado' : 'resultados'} encontrados`;
    loadMoreButton.hidden = visibleAmount >= items.length;

    if (!items.length) {
        pokemonGrid.innerHTML = '<p class="loading-message">Nenhum Pokemon encontrado. Tente outro nome ou tipo.</p>';
        return;
    }

    items.slice(0, visibleAmount).forEach((pokemon, index) => {
        const primaryType = pokemon.types[0].type.name;
        const card = document.createElement('article');
        card.className = 'pokemon-card';
        card.style.animationDelay = `${index * 45}ms`;
        card.innerHTML = `
            <div class="card-image"><img src="${getImage(pokemon)}" alt="${capitalize(pokemon.name)}" loading="lazy"></div>
            <div class="card-topline"><span><i class="type-dot"></i>${typeLabel(primaryType)}</span><span>#${String(pokemon.id).padStart(3, '0')}</span></div>
            <h3 class="pokemon-name">${capitalize(pokemon.name)}</h3>
            <div class="card-stats"><strong>Força total <b>${getTotalStats(pokemon)}</b></strong><span>Vida ${getStat(pokemon, 'hp')}</span><span>Ataque ${getStat(pokemon, 'attack')}</span><span>Defesa ${getStat(pokemon, 'defense')}</span></div>
            <div class="card-bottom"><span class="price"><strong>${getMarketPrices(pokemon).tcgPrices}</strong><small>Cardmarket ${getMarketPrices(pokemon).cardmarketPrices}</small></span><button class="buy-button" data-pokemon-id="${pokemon.id}" type="button">Comprar agora <span>↗</span></button></div>
        `;
        card.addEventListener('click', (event) => {
            if (event.target.closest('.buy-button')) {
                purchasePokemon(pokemon);
                return;
            }
            showDetails(pokemon);
        });
        pokemonGrid.appendChild(card);
    });
}

function purchasePokemon(pokemon) {
    showToast(`${capitalize(pokemon.name)} foi selecionado para compra pelo TCGPlayer.`);
}

function showToast(message) {
    toast.textContent = message;
    toast.classList.add('visible');
    window.clearTimeout(showToast.timer);
    showToast.timer = window.setTimeout(() => toast.classList.remove('visible'), 2600);
}

function showDetails(pokemon) {
    const stats = pokemon.stats.slice(0, 4);
    dialogContent.innerHTML = `
        <div class="dialog-layout">
            <div class="dialog-art"><img src="${getImage(pokemon)}" alt="${capitalize(pokemon.name)}"></div>
            <div class="dialog-info">
                <p class="eyebrow">FICHA DO TREINADOR</p>
                <h2 class="dialog-name">${capitalize(pokemon.name)}</h2>
                <span class="dialog-id">POKÉMON #${String(pokemon.id).padStart(3, '0')} · ${pokemon.height / 10}M</span>
                <div class="detail-types">${pokemon.types.map((item) => `<span>${typeLabel(item.type.name)}</span>`).join('')}</div>
                <div class="detail-stats">${stats.map((stat) => `<div class="detail-stat"><span>${statNames[stat.stat.name] || stat.stat.name}</span><div class="stat-bar"><i style="width:${Math.min(stat.base_stat, 100)}%"></i></div><b>${stat.base_stat}</b></div>`).join('')}</div>
                <div class="market-source-prices"><span>TCGPlayer <strong>${getMarketPrices(pokemon).tcgPrices}</strong></span><span>Cardmarket <strong>${getMarketPrices(pokemon).cardmarketPrices}</strong></span></div>
                <button class="dialog-buy" data-dialog-buy="${pokemon.id}" type="button">Comprar agora <span>↗</span></button>
            </div>
        </div>
    `;
    dialogContent.querySelector('.dialog-buy').addEventListener('click', () => {
        purchasePokemon(pokemon);
        dialog.close();
    });
    dialog.showModal();
}

async function loadPokemon() {
    try {
        loadingMessage.textContent = 'Carregando Pokémon e valores...';
        const [listData, tcgData] = await Promise.all([
            fetchCachedJson(`${apiUrl}?limit=251&offset=0`, 'pokes-nft-list-cache-v1'),
            fetchCachedJson(tcgApiUrl, 'pokes-nft-tcg-cache-v1').catch(() => ({ data: [] }))
        ]);
        const pricesByName = new Map();
        tcgData.data.forEach((card) => {
            const key = card.name.toLowerCase();
            const tcgValues = Object.values(card.tcgplayer?.prices || {}).map((price) => price.market || price.mid || price.low).filter(Boolean);
            const cardmarketValues = [card.cardmarket?.prices?.trendPrice, card.cardmarket?.prices?.averageSellPrice, card.cardmarket?.prices?.lowPrice].filter(Boolean);
            const current = pricesByName.get(key) || { tcgPlayer: [], cardmarket: [] };
            pricesByName.set(key, {
                tcgPlayer: current.tcgPlayer.concat(tcgValues),
                cardmarket: current.cardmarket.concat(cardmarketValues)
            });
        });
        const cachedPokemon = JSON.parse(sessionStorage.getItem(pokemonCacheKey) || 'null');
        if (cachedPokemon && Date.now() - cachedPokemon.savedAt < cacheDuration) {
            pokemonList = cachedPokemon.data;
        } else {
            pokemonList = await Promise.all(listData.results.map(async (item) => {
            const pokemon = await fetchCachedJson(item.url, `pokes-nft-detail-${item.name}`);
            const prices = pricesByName.get(pokemon.name.toLowerCase());
            pokemon.marketPrices = {
                tcgPlayer: prices?.tcgPlayer.length ? Math.min(...prices.tcgPlayer) : getFallbackPrice(pokemon),
                cardmarket: prices?.cardmarket.length ? Math.min(...prices.cardmarket) : getFallbackPrice(pokemon) * 0.92
            };
            return pokemon;
            }));
            try {
                sessionStorage.setItem(pokemonCacheKey, JSON.stringify({ savedAt: Date.now(), data: pokemonList }));
            } catch (error) {
                console.warn('Não foi possível armazenar os Pokémon no cache.', error);
            }
        }
        const pikachu = pokemonList.find((pokemon) => pokemon.name === 'pikachu');
        if (pikachu && heroPrice) heroPrice.firstChild.textContent = `${getMarketPrices(pikachu).tcgPrices} `;
        loadingMessage.hidden = true;
        renderCards();
    } catch (error) {
        loadingMessage.textContent = 'Não foi possível carregar a PokéAPI. Verifique sua conexão e atualize a página.';
        console.error(error);
    }
}

searchInput.addEventListener('input', () => {
    visibleAmount = 16;
    renderCards();
});

sortFilter.addEventListener('change', () => {
    selectedSort = sortFilter.value;
});

priceFilter.addEventListener('input', () => {
    selectedPrice = Number(priceFilter.value);
    priceValue.textContent = `US$ ${selectedPrice}`;
});

typeFilter.addEventListener('change', () => {
    selectedType = typeFilter.value;
});

Object.entries(statFilters).forEach(([statName, input]) => {
    input.addEventListener('input', () => {
        selectedStats[statName] = Number(input.value);
        statValues[statName].textContent = input.value;
    });
});

function toggleFilters(isOpen) {
    filterPanel.hidden = !isOpen;
    filterBackdrop.hidden = !isOpen;
    filterOpen.setAttribute('aria-expanded', String(isOpen));
    document.body.classList.toggle('filters-open', isOpen);
}

filterOpen.addEventListener('click', () => toggleFilters(true));
filterClose.addEventListener('click', () => toggleFilters(false));
filterBackdrop.addEventListener('click', () => toggleFilters(false));
filterApply.addEventListener('click', () => {
    visibleAmount = 16;
    renderCards();
    toggleFilters(false);
});
filterClear.addEventListener('click', () => {
    selectedSort = 'default';
    selectedPrice = 500;
    selectedType = 'all';
    sortFilter.value = 'default';
    priceFilter.value = 500;
    priceValue.textContent = 'US$ 500';
    typeFilter.value = 'all';
    Object.entries(statFilters).forEach(([statName, input]) => {
        selectedStats[statName] = 0;
        input.value = 0;
        statValues[statName].textContent = '0';
    });
    visibleAmount = 16;
    renderCards();
    toggleFilters(false);
});

loadMoreButton.addEventListener('click', () => {
    visibleAmount += 8;
    renderCards();
});

closeDialog.addEventListener('click', () => dialog.close());
dialog.addEventListener('click', (event) => {
    if (event.target === dialog) dialog.close();
});

loadPokemon();
