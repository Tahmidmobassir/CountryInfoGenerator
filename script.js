const searchBtn = document.getElementById("searchBtn");
const searchInput = document.getElementById("searchInput");
const countriesContainer = document.getElementById("countriesContainer");

searchBtn.addEventListener("click", () => {
  const countryName = searchInput.value.trim();
  if (countryName !== "") {
    fetchCountryData(countryName);
  }
});

function fetchCountryData(country) {
  fetch(`https://restcountries.com/v3.1/name/${country}`)
    .then((response) => {
      if (!response.ok) throw new Error("Country not found");
      return response.json();
    })
    .then((data) => {
      displayCountries(data);
    })
    .catch((error) => {
      console.error("Error fetching countries:", error);
      countriesContainer.innerHTML = `<p>Country not found!</p>`;
    });
}

function displayCountries(countries) {
  countriesContainer.innerHTML = ""; 

  countries.forEach((country) => {
    const countryCard = document.createElement("div");
    countryCard.className = "country-card";

    const currency = country.currencies
      ? Object.values(country.currencies).map((c) => c.name).join(", ")
      : "N/A";

    countryCard.innerHTML = `
      <img src="${country.flags.svg}" alt="Flag of ${country.name.common}" class="country-flag">
      <h3 class="country-name">${country.name.common}</h3>
      <p class="country-info"><strong>Capital:</strong> ${country.capital ? country.capital[0] : "N/A"}</p>
      <p class="country-info"><strong>Currency:</strong> ${currency}</p>
      <p class="country-info"><strong>Region:</strong> ${country.region}</p>
      <p class="country-info"><strong>Subregion:</strong> ${country.subregion || "N/A"}</p>
      <p class="country-info"><strong>Population:</strong> ${country.population.toLocaleString()}</p>
      <p class="country-info"><strong>Area:</strong> ${country.area.toLocaleString()} km²</p>
    `;

    countriesContainer.appendChild(countryCard);
  });
}
