const apiUrl = 'https://pokeapi.co/api/v2/pokemon?limit=1277';
// url to get pokemon types
const typeUrl = 'https://pokeapi.co/api/v2/type';
// number of pokemon per page
const pageSize = 10;
let currentPage = 1;
let pokemonList = [];
let filteredPokemonList = [];
let selectedTypes = new Set();

// display the pokemon list + fetch the list of pokemon
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

// get the pokemon types
async function fetchPokemonTypes() {
    try {
        const response = await fetch(typeUrl);
        const data = await response.json();
        displayTypeFilters(data.results);
    } catch (error) {
        console.error('Error fetching Pokemon types:', error);
    }
}

// display the different types as check boxes
function displayTypeFilters(types) {
    const typeFiltersContainer = document.getElementById('typeFilters');
    types.forEach(type => {
        const filterItem = document.createElement('div');
        filterItem.className = 'filter-item';

        // create a checkbox for each type
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.id = type.name;
        checkbox.name = type.name;
        checkbox.value = type.name;

        // check the checkbox if the type is selected
        const label = document.createElement('label');
        label.htmlFor = type.name;
        label.textContent = type.name;

        // add the type to the selectedTypes set when the checkbox is checked
        checkbox.addEventListener('change', () => {
            if (checkbox.checked) {
                selectedTypes.add(type.name);
            } else {
                selectedTypes.delete(type.name);
            }
            filterPokemonByType();
        });

        // append the checkbox and label to the filter item
        filterItem.appendChild(checkbox);
        filterItem.appendChild(label);
        typeFiltersContainer.appendChild(filterItem);
    });
}

// fetch the details of a pokemon
async function fetchPokemonDetails(url) {
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching Pokemon details:', error);
        return null;
    }
}

// display a page of pokemon
async function displayPage(page) {
    const startIndex = (page - 1) * pageSize;
    const endIndex = page * pageSize;
    const pokemonSubset = filteredPokemonList.slice(startIndex, endIndex);

    const pokemonContainer = document.getElementById('pokemonList');
    pokemonContainer.innerHTML = '';

    // Display each pokemon in the subset
    for (const pokemon of pokemonSubset) {
        const pokemonData = await fetchPokemonDetails(pokemon.url);
        // check if the pokemon data was fetched successfully
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

// pagination buttons
function setupPagination() {
    const paginationContainer = document.getElementById('paginationControls');
    paginationContainer.innerHTML = '';

    const totalPages = Math.ceil(filteredPokemonList.length / pageSize);
    const maxPagesToShow = 5;
    let startPage = currentPage - Math.floor(maxPagesToShow / 2);
    let endPage = currentPage + Math.floor(maxPagesToShow / 2);

    if (startPage < 1) {
        startPage = 1;
        endPage = Math.min(maxPagesToShow, totalPages);
    } else if (endPage > totalPages) {
        endPage = totalPages;
        startPage = Math.max(1, totalPages - maxPagesToShow + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
        const pageButton = document.createElement('button');
        pageButton.textContent = i;
        if (i === currentPage) {
            pageButton.disabled = true;
        }

        pageButton.addEventListener('click', () => {
            currentPage = i;
            displayPage(currentPage);
            setupPagination();
        });

        paginationContainer.appendChild(pageButton);
    }
}

// show pokemon details when clicked 
// this will pop up a modal with all the information
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

    // close the modal when clicking the x
    document.querySelector('.close-button').addEventListener('click', () => {
        modal.style.display = 'none';
    });

    // close the modal when clicking outside the modal
    window.addEventListener('click', (event) => {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    });
}

// filter pokemon by types
async function filterPokemonByType() {
    filteredPokemonList = [];

    // if no types are selected, show all pokemon
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

    // if new page, reset to page 1
    currentPage = 1;
    displayPage(currentPage);
    setupPagination();
}
fetchPokemon();
fetchPokemonTypes();
