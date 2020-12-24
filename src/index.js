import { precompile } from 'handlebars';
import { doc, resolveConfigFile } from 'prettier';
import './styles.css';
import pokemonCardsHbs from './templates/pokemons.hbs';
import API from './js/api-service';
import getRefs from "./js/refs";

const refs = getRefs();

refs.searchForm.addEventListener('submit', onSearch);

function onSearch(e) {
	e.preventDefault();

	const form = e.currentTarget;
	const searchQuery = form.elements.query.value

	API.fetchPokemonById(searchQuery)
		.then(renderPokemonCard)
		.catch(onFetchError)
		.finally(() => form.reset())	
}

function renderPokemonCard(pokemon) {
	const markup = pokemonCardsHbs(pokemon);
	refs.cardContainer.innerHTML = markup;
};

function onFetchError(error) {
	alert('Упс, что-то пошло не так, не нашли покемона :(');
}


//=================================

const options = {
	headers: {
		Authorization: 'f02d8915a16846249a14dd6bbace404f'
	}
}

fetch(`https://newsapi.org/v2/everything?q=cat&language=ru&pageSize=5&page=1`, options)
	.then(r => r.json())
	.then(console.log)