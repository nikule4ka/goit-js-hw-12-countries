import './styles.css';
import oneCountryId from './templates/country.hbs';
import countriesId from './templates/countries.hbs';
import debounce from 'lodash.debounce'
import API from './js/fetchCountries';
import getRefs from "./js/refs";
import errorsNotifications from './js/notifications'

const refs = getRefs();

refs.searchForm.addEventListener('input', debounce(onSearch, 500));

function onSearch() {
	
	const searchQuery = refs.searchForm.value;

	if (!searchQuery) {
		return
	}

	API.fetchCountries(searchQuery)
		.then(checkFindItems)
		.catch(onFetchError)
}

function checkFindItems(country) {
	refs.cardContainer.innerHTML = '';

	if (country.length > 10) {
		return errorsNotifications(
			'Nothing was found for your request.',
			'Please enter another request!',
		)
	}
	if (country.length > 1 || country.lenth <= 10) {
		 renderCountriesList(country);
	}
	if (country.length === 1) {
		// console.log(renderCountryCard(country[0]))
		 renderCountryCard(country);
	}
};

function renderCountryCard(country) {
	const markupIdCard = oneCountryId(country);
	refs.cardContainer.insertAdjacentHTML('beforeend', markupIdCard);
	
};

function renderCountriesList(country) {
	const markup = countriesId(country);
	refs.cardContainer.insertAdjacentHTML('beforeend', markup);
};


function onFetchError(error) {
	if (error === 404) {
		alert('Nothing found')
	} else {
		alert('something happend. Try later')
	}
};





