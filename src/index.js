import './css/styles.css';
import { fetchCountries } from './fetchCountries';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix';

const DEBOUNCE_DELAY = 300;


const input = document.querySelector('#search-box');
const list = document.querySelector('.country-list');
const box = document.querySelector('.country-info');



input.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));

function onInput(evt) {
    evt.preventDefault();
    const inputValue = evt.target.value.trim();

    if (!inputValue) {
       resetMarkup(list);
       resetMarkup(box);
       return;
     }
    
    fetchCountries(inputValue).then((data) => {
        if (data.length > 10) {
            Notify.warning(
              'Too many matches found. Please enter a more specific name.'
            )
                resetMarkup(list);
                return;
        } else if (data.length >= 2 && data.length <= 10) {
            resetMarkup(list);
            list.innerHTML = listMarkup(data);
            resetMarkup(box);
            return;
        } else {
            resetMarkup(list);
            list.innerHTML = boxMarkup(data);
            resetMarkup(box);
            return;
        }
    }).catch(() => {
        resetMarkup(list);
        resetMarkup(box);
        Notify.failure('Oops, there is no country with that name');
        return;
    });
}

function listMarkup(arr) {
  return arr
  .map(
    ({ name: {official}, flags: {svg} }) => `<li class="country">
        <img src="${svg}" alt="${official}" width="30" height="30">
        <h3>${official}</h3>
      </li>`
  )
  .join('');
}

function boxMarkup(arr) {
    return arr
      .map(
        ({
          name: { official },
          capital,
          languages,
          population,
          flags: { svg },
        }) => `<div class="country">
     <img src="${svg}" alt="${official}" width="60" height="60">
     <h1>${official}</h1>
     </div>
     <h2>Capital: ${capital}</h2>
     <h2>Population: ${population}</h2>
     <h2>Languages: ${Object.values(languages).join(', ')}</h2>`
      )
      .join('');
}

function resetMarkup(el) {
  el.innerHTML = '';
}


