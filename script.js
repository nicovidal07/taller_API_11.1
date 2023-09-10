const apiUrl = 'https://finalspaceapi.com/api/v0/';
const characterUrl = `${apiUrl}character`;

// Función para mostrar los datos en la tabla
function displayCharacters(characters) {
    const characterList = document.getElementById('characterList');
    characterList.innerHTML = ''; // Limpiar la tabla antes de agregar nuevos datos
    
    characters.forEach(character => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${character.name}</td>
            <td>${character.species}</td>
            <td>${character.status}</td>
        `;
        characterList.appendChild(row);
    });
}

// Función para buscar personajes
function searchCharacter() {
    const searchInput = document.getElementById('searchInput');
    const searchTerm = searchInput.value.trim().toLowerCase();

    // Filtrar personajes en función del término de búsqueda
    const filteredCharacters = characters.filter(character => {
        return character.name.toLowerCase().includes(searchTerm);
    });

    // Mostrar los resultados en la tabla
    displayCharacters(filteredCharacters);
}

let characters = [];

// Hacer una solicitud GET para obtener todos los personajes
fetch(characterUrl)
    .then(response => {
        // Verificar si la solicitud fue exitosa
        if (!response.ok) {
            throw new Error(`Error de red: ${response.status}`);
        }
        // Parsear la respuesta JSON
        return response.json();
    })
    .then(data => {
        characters = data;
        // Mostrar todos los personajes al cargar la página
        displayCharacters(characters);
    })
    .catch(error => {
        console.error('Error al obtener datos:', error);
        // Manejar cualquier error que pueda ocurrir durante la solicitud
    });