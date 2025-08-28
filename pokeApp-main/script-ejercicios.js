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

// 🎯 Elementos del DOM - ¡Estos también están listos!
const loadingElement = document.getElementById('loading');
const pokemonContainer = document.getElementById('pokemon-container');
const errorElement = document.getElementById('error');

/* ==============================================
   📝 EJERCICIO 1: FUNCIÓN PRINCIPAL
   ==============================================
   
   Esta función debe coordinar todo el proceso de carga.
   
   PASOS A SEGUIR:
   1. Mostrar el estado de carga
   2. Crear un array para almacenar promesas
   3. Usar un bucle para crear 5 promesas (Pokemon IDs 1-5)
   4. Esperar a que todas las promesas se resuelvan
   5. Renderizar las tarjetas
   6. Mostrar el contenedor de Pokemon
   7. Manejar errores mostrando el mensaje de error
   
============================================== */

async function loadPokemon() {
    try {
        // TODO 1.1: Mostrar el estado de carga
        // PISTA: Usa la función showLoading() que ya está definida más abajo
        showLoading();
        
        // TODO 1.2: Crear un array vacío para almacenar las promesas
        // PISTA: const nombreArray = [];
        const pokemonPromises = [];
        
        // TODO 1.3: Crear un bucle for que vaya del 1 al 5
        // Dentro del bucle, añade al array las promesas de fetchPokemonData(i)
        // PISTA: usa nombreArray.push(fetchPokemonData(i))
        for (let i = 1; i <= 5; i++) {
            pokemonPromises.push(fetchPokemonData(i));
        }
        
        // TODO 1.4: Esperar a que todas las promesas se resuelvan
        // PISTA: Usa Promise.all() con await
        const pokemonList = await Promise.all(pokemonPromises);
        
        // TODO 1.5: Renderizar las tarjetas con los datos obtenidos
        // PISTA: Usa la función renderPokemonCards() que ya está definida más abajo
        renderPokemonCards(pokemonList);
        
        // TODO 1.6: Mostrar el contenedor de Pokemon
        // PISTA: Usa la función showPokemonContainer() que ya está definida más abajo
        showPokemonContainer();
        
    } catch (error) {
        // TODO 1.7: Manejar errores
        // PISTA: Muestra el error en consola y usa showError()
        console.error('Error al cargar los Pokemon:', error);
        showError();
    }
}

/* ==============================================
   📝 EJERCICIO 2: CONSUMIR LA API
   ==============================================
   
   Esta es la función MÁS IMPORTANTE del proyecto.
   Aquí aprenderás a hacer peticiones HTTP a una API.
   
   La PokeAPI devuelve datos en este formato:
   {
     "id": 1,
     "name": "bulbasaur",
     "height": 7,
     "weight": 69,
     "types": [
       {
         "type": {
           "name": "grass"
         }
       }
     ],
     "sprites": {
       "other": {
         "official-artwork": {
           "front_default": "https://..."
         }
       },
       "front_default": "https://..."
     }
   }
   
============================================== */

async function fetchPokemonData(pokemonId) {
    try {
        // TODO 2.1: Hacer una petición fetch a la API
        // PISTA: const response = await fetch(POKEAPI_BASE_URL + pokemonId);
        // ¿Por qué usamos await? ¡Porque fetch() devuelve una promesa!
        
        /* ESCRIBE TU CÓDIGO AQUÍ */
        
        
        // TODO 2.2: Verificar si la respuesta es exitosa
        // PISTA: if (!response.ok) { throw new Error(`Error HTTP: ${response.status}`); }
        
        /* ESCRIBE TU CÓDIGO AQUÍ */
        
        
        // TODO 2.3: Convertir la respuesta a JSON
        // PISTA: const pokemonData = await response.json();
        // ¿Por qué usamos await? ¡Porque .json() también devuelve una promesa!
        
        /* ESCRIBE TU CÓDIGO AQUÍ */
        
        
        // TODO 2.4: Extraer y devolver solo los datos que necesitamos
        // PISTA: Devuelve un objeto con: id, name, height, weight, types, sprite
        // Para types: pokemonData.types.map(type => type.type.name)
        // Para sprite: pokemonData.sprites.other['official-artwork'].front_default || pokemonData.sprites.front_default
        
        /* ESCRIBE TU CÓDIGO AQUÍ */
        return {
            // id: ?,
            // name: ?,
            // height: ?,
            // weight: ?,
            // types: ?,
            // sprite: ?
        };
        
    } catch (error) {
        // TODO 2.5: Manejar errores
        // PISTA: Muestra el error en consola y relanza el error con throw
        
        /* ESCRIBE TU CÓDIGO AQUÍ */
        
        
    }
}

/* ==============================================
   📝 EJERCICIO 3: RENDERIZAR TARJETAS
   ==============================================
   
   Esta función toma un array de Pokemon y crea las tarjetas HTML.
   
============================================== */

function renderPokemonCards(pokemonList) {
    // TODO 3.1: Limpiar el contenedor
    // PISTA: pokemonContainer.innerHTML = '';
    
    /* ESCRIBE TU CÓDIGO AQUÍ */
    
    
    // TODO 3.2: Crear una tarjeta para cada Pokemon
    // PISTA: Usa forEach() para recorrer pokemonList
    // Dentro del forEach, usa createPokemonCard() y appendChild()
    
    /* ESCRIBE TU CÓDIGO AQUÍ */
    
    
}

/* ==============================================
   🎨 FUNCIONES YA COMPLETADAS
   ==============================================
   
   Estas funciones ya están terminadas para que puedas
   enfocarte en los ejercicios principales.
   
============================================== */

// ✅ Función para crear una tarjeta individual de Pokemon (YA COMPLETADA)
function createPokemonCard(pokemon) {
    const card = document.createElement('div');
    card.className = 'pokemon-card';
    
    // Convertir altura de decímetros a metros y peso de hectogramos a kg
    const heightInMeters = (pokemon.height / 10).toFixed(1);
    const weightInKg = (pokemon.weight / 10).toFixed(1);
    
    // Crear los badges de tipos
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
        
        <div class="pokemon-types">
            ${typeBadges}
        </div>
    `;
    
    return card;
}

// ✅ Funciones para manejar la visibilidad de elementos (YA COMPLETADAS)
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

// ✅ Función para manejar errores de carga de imágenes (YA COMPLETADA)
function handleImageError(img) {
    img.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIwIiBoZWlnaHQ9IjEyMCIgdmlld0JveD0iMCAwIDEyMCAxMjAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMjAiIGhlaWdodD0iMTIwIiBmaWxsPSIjRjVGN0ZBIi8+CjxwYXRoIGQ9Ik02MCA4MEw0MCA0MEg4MEw2MCA4MFoiIGZpbGw9IiNDM0NGRTIiLz4KPHRleHQgeD0iNjAiIHk9IjEwMCIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjEyIiBmaWxsPSIjNjY2IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj5JbWFnZW4gbm8gZGlzcG9uaWJsZTwvdGV4dD4KPC9zdmc+';
    img.alt = 'Imagen no disponible';
}

// ✅ Event listeners (YA COMPLETADOS)
document.addEventListener('DOMContentLoaded', loadPokemon);

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
