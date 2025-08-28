/* ==============================================
   📚 EJERCICIOS PARA ESTUDIANTES - POKEAPP
   ==============================================
   
   ¡Bienvenido estudiante! 👋
   
   En este archivo encontrarás ejercicios prácticos para aprender
   a consumir APIs y manipular el DOM. Sigue las instrucciones
   y completa el código donde veas los comentarios TODO.
   
   🎯 OBJETIVOS:
   - Aprender a usar fetch() para consultar APIs
   - Manejar promesas con async/await
   - Procesar datos JSON de una API
   - Crear elementos HTML dinámicamente
   - Manejar errores de red
   
   📖 RECURSOS ÚTILES:
   - Documentación PokeAPI: https://pokeapi.co/docs/v2
   - MDN fetch(): https://developer.mozilla.org/es/docs/Web/API/Fetch_API
   - MDN async/await: https://developer.mozilla.org/es/docs/Learn/JavaScript/Asynchronous/Async_await
   
============================================== */

// 🌐 URL base de la PokeAPI - ¡Esta ya está lista!
const POKEAPI_BASE_URL = 'https://pokeapi.co/api/v2/pokemon/';
const loadingElement = document.getElementById('loading');
const pokemonContainer = document.getElementById('pokemon-container');
const errorElement = document.getElementById('error');
const loadMoreButton = document.getElementById('load-more');

// Variables para controlar la paginación
let start = 1;
let limit = 50;

// 🔹 Función principal para cargar Pokémon
async function loadPokemon() {
    try {
        // Mostrar loading solo si es la primera carga
        if (start === 1) showLoading();

        const pokemonPromises = [];
        for (let i = start; i < start + limit; i++) {
            pokemonPromises.push(fetchPokemonData(i));
        }

        const pokemonList = await Promise.all(pokemonPromises);

        // Apilar Pokémon sin borrar los anteriores
        renderPokemonCards(pokemonList, true);

        showPokemonContainer();

        start += limit; // Avanzamos el rango para la próxima tanda

    } catch (error) {
        console.error('Error al cargar los Pokemon:', error);
        showError();
    }
}

// 🔹 Render de tarjetas, soporta apilar
function renderPokemonCards(pokemonList, append = false) {
    if (!append) pokemonContainer.innerHTML = ''; // limpia solo si es la primera tanda

    pokemonList.forEach(pokemon => {
        const card = createPokemonCard(pokemon);
        pokemonContainer.appendChild(card);
    });
}

// 🔹 Consumir la API de Pokémon
async function fetchPokemonData(pokemonId) {
    try {
        const response = await fetch(POKEAPI_BASE_URL + pokemonId);

        if (!response.ok) throw new Error(`Error HTTP: ${response.status}`);

        const pokemonData = await response.json();

        return {
            id: pokemonData.id,
            name: pokemonData.name,
            height: pokemonData.height,
            weight: pokemonData.weight,
            types: pokemonData.types.map(type => type.type.name),
            sprite: pokemonData.sprites.other['official-artwork'].front_default || pokemonData.sprites.front_default,
            defensa: pokemonData.stats[2].base_stat,
            ataque: pokemonData.stats[1].base_stat,
            velocidad: pokemonData.stats[5].base_stat,
        };

    } catch (error) {
        console.error('Error al obtener datos de Pokémon:', error);
        throw error;
    }
}

// 🔹 Crear tarjeta individual de Pokémon
function createPokemonCard(pokemon) {
    const card = document.createElement('div');
    card.className = 'pokemon-card';

    const heightInMeters = (pokemon.height / 10).toFixed(1);
    const weightInKg = (pokemon.weight / 10).toFixed(1);

    const typeBadges = pokemon.types.map(type => 
        `<span class="type-badge type-${type}">${type}</span>`
    ).join('');

    card.innerHTML = `
        <div class="pokemon-id">#${pokemon.id.toString().padStart(3, '0')}</div>
        <div class="pokemon-image">
            <img src="${pokemon.sprite}" alt="${pokemon.name}" loading="lazy">
        </div>
        <h2 class="pokemon-name">${pokemon.name}</h2>
        <div class="pokemon-height-weight">
            <div class="stat">
                <div class="stat-label">Altura</div>
                <div class="stat-value">${heightInMeters}m</div>
            </div>
            <div class="stat">
                <div class="stat-label">Peso</div>
                <div class="stat-value">${weightInKg}kg</div>
            </div>
        </div>
        <div class="pokemon-types">${typeBadges}</div>
        <div class="pokemon-stats">
            <div class="stat">
                <div class="stat-label">Defensa</div>
                <div class="stat-value">${pokemon.defensa}</div>
            </div>
            <div class="stat">
                <div class="stat-label">Ataque</div>
                <div class="stat-value">${pokemon.ataque}</div>
            </div>
            <div class="stat">
                <div class="stat-label">Velocidad</div>
                <div class="stat-value">${pokemon.velocidad}</div>
            </div>
        </div>
    `;

    return card;
}

// 🔹 Funciones de visibilidad
function showLoading() {
    loadingElement.classList.remove('hidden');
    pokemonContainer.classList.add('hidden');
    errorElement.classList.add('hidden');
}

function showPokemonContainer() {
    loadingElement.classList.add('hidden');
    pokemonContainer.classList.remove('hidden');
    errorElement.classList.add('hidden');
}

function showError() {
    loadingElement.classList.add('hidden');
    pokemonContainer.classList.add('hidden');
    errorElement.classList.remove('hidden');
}

// 🔹 Manejo de errores de imágenes
function handleImageError(img) {
    img.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIwIiBoZWlnaHQ9IjEyMCIgdmlld0JveD0iMCAwIDEyMCAxMjAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMjAiIGhlaWdodD0iMTIwIiBmaWxsPSIjRjVGN0ZBIi8+CjxwYXRoIGQ9Ik02MCA4MEw0MCA0MEg4MEw2MCA4MFoiIGZpbGw9IiNDM0NGRTIiLz4KPHRleHQgeD0iNjAiIHk9IjEwMCIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjEyIiBmaWxsPSIjNjY2IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj5JbWFnZW4gbm8gZGlzcG9uaWJsZTwvdGV4dD4KPC9zdmc+';
    img.alt = 'Imagen no disponible';
}

// 🔹 Event listeners
document.addEventListener('DOMContentLoaded', loadPokemon);

loadMoreButton.addEventListener('click', function (e) {
    e.preventDefault(); // evita que recargue la página
    loadPokemon();
});

document.addEventListener('error', function(e) {
    if (e.target.tagName === 'IMG') {
        handleImageError(e.target);
    }
}, true);


/* ==============================================
   🎯 INSTRUCCIONES PARA COMPLETAR:
   ==============================================
   
   1. Lee cada ejercicio cuidadosamente
   2. Busca los comentarios TODO
   3. Completa el código siguiendo las pistas
   4. Prueba tu código en el navegador
   5. Si algo no funciona, revisa la consola del navegador (F12)
   
   💡 PISTAS ADICIONALES:
   
   - Para probar tu código, abre index.html en el navegador
   - Abre las herramientas de desarrollador (F12) para ver la consola
   - Si ves errores en rojo, léelos para entender qué está mal
   - La PokeAPI es gratuita y no requiere API key
   - Los datos se obtienen en formato JSON
   
   🏆 RETOS EXTRA (opcional):
   
   1. Cambia el número de Pokemon a mostrar (de 5 a 10)
   2. Añade más estadísticas (velocidad, ataque, defensa)
   3. Crea un botón para cargar Pokemon aleatorios
   4. Añade un campo de búsqueda por nombre
   
============================================== */
