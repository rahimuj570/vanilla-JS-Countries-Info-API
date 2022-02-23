const catchApi = () => {
  fetch("https://restcountries.com/v3.1/all")
    .then((res) => res.json())
    .then((data) => getCountryData(data));
};
catchApi();

const getCountryData = (countries) => {
  const cardContainer = document.querySelector(".card-container");
  countries.map((country) => {
    console.log(country);

    // ======append html element=========
    const colMd3 = document.createElement("div");
    colMd3.classList.add("col-md-4", "mb-5");
    cardContainer.appendChild(colMd3);
    // ======append html element end=========
    colMd3.innerHTML = `
    <div class="card" style="width: 18rem">
              <img src="${country.flags.svg}" class="card-img-top" alt="..." />
              <div class="card-body">
                <h5 class="fw-bold card-title">${country.name.common}</h5>
                <p class="card-text">Official Name: ${country.name.official}<br> Population: ${country.population}<br>
                Short Name: ${country.cca2}<br> Short Name 2: ${country.cioc}</p>
                <a href="#" class="btn btn-primary">Learn More</a>
              </div>
            </div>
    `;
  });
};
