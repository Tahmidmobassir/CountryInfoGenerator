const searchBtn = document.getElementById("searchBtn");
const searchInput = document.getElementById("searchInput");

searchBtn.addEventListener("click", () => {
  const countryName = searchInput.value.trim();
  if (countryName !== "") {
    fetchCountryData(countryName);
  }
});
