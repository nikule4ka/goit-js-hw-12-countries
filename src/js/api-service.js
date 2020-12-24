const base_url = "https://pokeapi.co/api/v2"

function fetchPokemonById(pokemonId) {
	return fetch(`${base_url}/pokemon/${pokemonId}`).then(response => response.json());
}	

export default {fetchPokemonById}