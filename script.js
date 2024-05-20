const apiUrl = 'https://pokeapi.co/api/v2/pokemon?limit=1277';
const typeUrl = 'https://pokeapi.co/api/v2/type';
const pageSize = 10;
let currentPage = 1;
let pokemonList = [];
let filteredPokemonList = [];
let selectedTypes = new Set();

// fetching the pokemon list
async function fetchPokemon() {
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        pokemonList = data.results;

        filterPokemonByType();
        setupPagination();
    } catch (error) {
        console.error('Error fetching Pokemon:', error);
    }
}

// fetching the pokemon types
async function fetchPokemonTypes() {
    try {
        const response = await fetch(typeUrl);
        const data = await response.json();
        displayTypeFilters(data.results);
    } catch (error) {
        console.error('Error fetching Pokdmon types:', error);
    }
}

// display the types as check boxes
function displayTypeFilters(types) {
    const typeFiltersContainer = document.getElementById('typeFilters');
    typeFiltersContainer.innerHTML = '';
    types.forEach(type => {
        const filterItem = document.createElement('div');
        filterItem.className = 'filter-item';

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.id = type.name;
        checkbox.name = type.name;
        checkbox.value = type.name;

        const label = document.createElement('label');
        label.htmlFor = type.name;
        label.textContent = type.name;

        checkbox.addEventListener('change', () => {
            if (checkbox.checked) {
                selectedTypes.add(type.name);
            } else {
                selectedTypes.delete(type.name);
            }
            currentPage = 1;
            filterPokemonByType();
            setupPagination();
            displayPage(currentPage);
        });

        filterItem.appendChild(checkbox);
        filterItem.appendChild(label);
        typeFiltersContainer.appendChild(filterItem);
    });
}

// fetch the pokemon abilities, stats, and types
async function fetchPokemonDetails(url) {
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching Pokdmon details:', error);
        return null;
    }
}

// display the page of pokemon
async function displayPage(page) {
    const startIndex = (page - 1) * pageSize;
    const endIndex = page * pageSize;
    const pokemonSubset = filteredPokemonList.slice(startIndex, endIndex);

    const pokemonContainer = document.getElementById('pokemonList');
    pokemonContainer.innerHTML = ''; 

    // loop through the subset of Pokemon and display them
    for (const pokemon of pokemonSubset) {
        const pokemonData = await fetchPokemonDetails(pokemon.url);
        // check if the pokemon data is available
        if (pokemonData) {
            const pokemonDiv = document.createElement('div');
            pokemonDiv.className = 'pokemon';
            pokemonDiv.dataset.url = pokemon.url;

            const pokemonName = document.createElement('h3');
            pokemonName.textContent = pokemonData.name;

            const pokemonImage = document.createElement('img');
            pokemonImage.src = pokemonData.sprites.front_default;
            pokemonImage.alt = pokemonData.name;

            pokemonDiv.appendChild(pokemonImage);
            pokemonDiv.appendChild(pokemonName);

            pokemonContainer.appendChild(pokemonDiv);

            pokemonDiv.addEventListener('click', () => showPokemonDetails(pokemonData));
        }
    }
    updatePokemonCount();
}

// update the pokemon count display
function updatePokemonCount() {
    const pokemonCountContainer = document.getElementById('pokemonCount');
    const totalPokemon = filteredPokemonList.length;
    const displayedPokemon = Math.min(pageSize, totalPokemon - (currentPage - 1) * pageSize);
    pokemonCountContainer.textContent = `Showing ${displayedPokemon} of ${totalPokemon} Pokemon`;
}

// pagination controls
function setupPagination() {
    const paginationContainer = document.getElementById('paginationControls');
    paginationContainer.innerHTML = '';

    const totalPages = Math.ceil(filteredPokemonList.length / pageSize);
    const maxPagesToShow = 5;
    let startPage = currentPage - Math.floor(maxPagesToShow / 2);
    let endPage = currentPage + Math.floor(maxPagesToShow / 2);

    // ensure the pagination controls don't go out of bounds
    if (startPage < 1) {
        startPage = 1;
        endPage = Math.min(maxPagesToShow, totalPages);
    } else if (endPage > totalPages) {
        endPage = totalPages;
        startPage = Math.max(1, totalPages - maxPagesToShow + 1);
    }

    // create a button for each page
    for (let i = startPage; i <= endPage; i++) {
        const pageButton = document.createElement('button');
        pageButton.textContent = i;
        if (i === currentPage) {
            pageButton.disabled = true;
        }

        // add an event listener to each button to display the corresponding page
        pageButton.addEventListener('click', () => {
            currentPage = i;
            displayPage(currentPage);
            setupPagination();
        });

        paginationContainer.appendChild(pageButton);
    }
}

// show the pokemon details in a modal
function showPokemonDetails(pokemon) {
    const modal = document.getElementById('pokemonModal');
    const modalContent = document.getElementById('modalContent');

    modalContent.innerHTML = `
        <h2>${pokemon.name}</h2>
        <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
        <p><strong>Type:</strong> ${pokemon.types.map(type => type.type.name).join(', ')}</p>
        <p><strong>Abilities:</strong> ${pokemon.abilities.map(ability => ability.ability.name).join(', ')}</p>
        <p><strong>Stats:</strong></p>
        <ul>
            ${pokemon.stats.map(stat => `<li>${stat.stat.name}: ${stat.base_stat}</li>`).join('')}
        </ul>
    `;

    modal.style.display = 'block';

    // close modal when clicking on the close button
    document.querySelector('.close-button').addEventListener('click', () => {
        modal.style.display = 'none';
    });

    // close modal when clicking outside of the modal
    window.addEventListener('click', (event) => {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    });
}

// filtering the pokemon by types
async function filterPokemonByType() {
    filteredPokemonList = [];

    // If no types are selected, display all pokemon
    if (selectedTypes.size === 0) {
        filteredPokemonList = [...pokemonList];
    } else {
        for (const pokemon of pokemonList) {
            const pokemonData = await fetchPokemonDetails(pokemon.url);
            if (pokemonData && pokemonData.types.some(type => selectedTypes.has(type.type.name))) {
                filteredPokemonList.push(pokemon);
            }
        }
    }

    displayPage(currentPage);
    setupPagination();
}
fetchPokemon();
fetchPokemonTypes();
