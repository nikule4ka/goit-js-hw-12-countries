import './styles.css';
import oneCountryId from './templates/country.hbs';
import countriesId from './templates/countries.hbs';
import debounce from 'lodash.debounce'
import API from './js/fetchCountries';
import getRefs from "./js/refs";

const refs = getRefs();

refs.searchForm.addEventListener('input', debounce(onSearch, 500));

function onSearch(e) {
	e.preventDefault();

	
	const searchQuery = refs.searchForm.value;

	API.fetchCountries(searchQuery)
		.then(checkFindItems)
		.catch(onFetchError)
}

function checkFindItems(country) {
	refs.cardContainer.innerHTML = '';

	if (country.length > 10) {
		 alert('Something wrong');
	} else if (country.length > 1 && country.lenth <= 10) {
		renderCountriesList(country);
	} else {
		renderCountryCard(country);
	}
};
function renderCountriesList(country) {
	const markup = countriesId(country);
	refs.cardContainer.insertAdjacentHTML('beforeend', markup);
};

function renderCountryCard(country) {
	const markupIdCard = oneCountryId(country);
	
	refs.cardContainer.insertAdjacentHTML('beforeend', markupIdCard);
};




function onFetchError(error) {
	if (error === 404) {
		alert('Nothing found')
	} else {
		alert('something happend. Try later')
	}
};





