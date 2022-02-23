const catchApi = () => {
  fetch("https://restcountries.com/v3.1/all")
    .then((res) => res.json())
    .then((data) => getCountryData(data));
};
catchApi();

const getCountryData = (countries) => {
  const cardContainer = document.querySelector(".card-container");
  countries.map((country) => {
    // console.log(country);

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
                <button onclick="getMore('${country.name.common}')"  class="btn btn-primary btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop">Learn More</button>

                
    `;
  });
};

// ==============Learn More Handler=========
function getMore(name) {
  fetch(`https://restcountries.com/v3.1/name/${name}`)
    .then((res) => res.json())
    .then((data) => getMoreData(data[0], name));
}
const getMoreData = (data, name) => {
  const cardDiv = document.querySelector(".card");
  const modalDiv = document.createElement("div");
  modalDiv.innerHTML = `<div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="staticBackdropLabel">More Information About <strong>${name}</strong></h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" ariapx-1 py-2 -label="Close"></button>
      </div>
      <div class="modal-body">
  <div class="rounded px-1 py-2 bg-light d-flex justify-content-between">
    <span class="fw-bold text-primary d-block">Capital:</span>
    <span>${data.capital[0]}</span>
  </div>
  <div class="d-flex justify-content-between">
    <span class="px-1 py-2 fw-bold text-primary d-block">Continents:</span>
    <span>${data.continents[0]}}</span>
  </div>
  <div class="rounded px-1 py-2 bg-light d-flex justify-content-between">
    <span class="fw-bold text-primary d-block">Subregion:</span>
    <span>${data.subregion}</span>
  </div>
  <div class="d-flex justify-content-between">
    <span class="px-1 py-2 fw-bold text-primary d-block">Currencies:</span>
    <span>${data.capital[0]}</span>
  </div>
  <div class="rounded px-1 py-2 bg-light d-flex justify-content-between">
    <span class="fw-bold text-primary d-block">Capital:</span>
    <span>${Object.values(data.currencies)[0].name}
        (${Object.values(data.currencies)[0].symbol})</span>
  </div>
  <div class="d-flex justify-content-between">
    <span class="px-1 py-2 fw-bold text-primary d-block">Independent Status:</span>
    <span>${data.independent}</span>
  </div>
  <div class="rounded px-1 py-2 bg-light d-flex justify-content-between">
    <span class="fw-bold text-primary d-block">Week Start On:</span>
    <span>${data.startOfWeek}</span>
  </div>
  <div class="d-flex justify-content-between">
    <span class="px-1 py-2 fw-bold text-primary d-block">Time Zone:</span>
    <span>${data.timezones[0]}</span>
  </div>
  <div class="rounded px-1 py-2 bg-light d-flex justify-content-between">
    <span class="fw-bold text-primary d-block">Top Level Domain:</span>
    <span>${data.tld[0]}</span>
  </div>
</div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        
      </div>
    </div>
  </div>
</div>
              </div>
            </div>`;
  cardDiv.appendChild(modalDiv);
  console.log(data);
};

// ============== Search Handler ============
const searchFieldElem = document.getElementById("search-field");
const searchBtnElem = document.querySelector(".search-btn");
searchBtnElem.addEventListener("click", () => {
  if (searchFieldElem.value != "") {
    const cardContainerClear = document.querySelector(".card-container");
    cardContainerClear.textContent = "";
    console.log(searchFieldElem.value);
    fetch(`https://restcountries.com/v3.1/name/${searchFieldElem.value}`)
      .then((res) => res.json())
      .then((data) => searchCountryData(data[0]))
      .catch((error) =>
        alert("Please Input Correct Spelling Of The Country Name")
      );
  }
});

const searchCountryData = (data) => {
  console.log(data);

  const cardContainer = document.querySelector(".card-container");
  // ======append html element=========
  const colMd3 = document.createElement("div");
  colMd3.classList.add("col-md-4", "mb-5");
  cardContainer.appendChild(colMd3);
  // ======append html element end=========
  colMd3.innerHTML = `
      <div class="card" style="width: 18rem">
                <img src="${data.flags.svg}" class="card-img-top" alt="..." />
                <div class="card-body">
                  <h5 class="fw-bold card-title">${data.name.common}</h5>
                  <p class="card-text">Official Name: ${data.name.official}<br> Population: ${data.population}<br>
                  Short Name: ${data.cca2}<br> Short Name 2: ${data.cioc}</p>
                  <button onclick="getMore('${data.name.common}')"  class="btn btn-primary btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop">Learn More</button>`;
};
