const BASE_URL = 'https://restcountries.com/v3.1/name';

export function fetchCountries(name) {
  const URL = `${BASE_URL}/${name}?fields=name,capital,population,flags,languages`;
  return fetch(URL).then(resp => {
    console.log(resp);
    if (!resp.ok) {
      throw new Error("Failed");
    }
    return resp.json();
  });
}
