

function fetchCountries(searchQuery) {
	return fetch(`https://restcountries.eu/rest/v2/name/${searchQuery}`).then(response => response.json()).then(country => country);
}	

export default {fetchCountries}