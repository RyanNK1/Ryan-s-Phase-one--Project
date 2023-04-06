const searchForm = document.getElementById("search-form");
const searchInput = document.getElementById("search-input");
const propertyType = document.getElementById("property-type");
const searchResults = document.getElementById("search-results");
const apiKey = "b2342eb2c9msh56f1abc06275481p1ea73cjsn3cc76c9990bf";
const headers = {
  "X-RapidAPI-Key": apiKey,
  "X-RapidAPI-Host": "unofficial-redfin.p.rapidapi.com",
  "content-type": "application/json",
};
let searchLocation;
// searchType is defined but not used
let searchType;
const apiEndpoint = "http://localhost:3000/homes";
const queryParams = {
  region_id: "30496",
  region_type: "6",
  uipt: "1,2,3,4,7,8",
  status: "9",
};

const queryString = Object.entries(queryParams)
  .map(
    ([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
  )
  .join("&");

// Use the fetchUrl variable instead of hardcoding the URL
const fetchUrl = `${apiEndpoint}?${queryString}`;
function fetchData() {
  fetch(fetchUrl, {
    method: "GET",
    headers: headers,
  })
    .then((response) => response.json())
    .then((data) => {
      displayResults(data);
    })
    .catch((error) => {
      console.error("Error fetching search results:", error);
      searchResults.innerHTML = "<p>Unable to fetch search results.</p>";
    });
}
//<p>${homes.priceInfo.amount.value}</p>

function displayResults(results) {
  console.log(results);
  searchResults.innerHTML = "";
  const resultsContainer = document.getElementById("search-results");
  results.slice(0, 27).forEach((homes) => {
    const resultElement = document.createElement("div");
    resultElement.classList.add("search-result");
    const beds = new Object(homes.homeData.beds);

    const h2 = document.createElement("h2");
    h2.innerText = homes.homeData.propertyType;

    const p1 = document.createElement("p")
    p1.innerText = `Bedrooms:${beds.value}`

    const p2 = document.createElement("p")
    p2.innerText = `Location: ${homes.homeData.addressInfo.city}`

    const p3 = document.createElement("p")
    p3.innerText = `State: ${homes.homeData.addressInfo.state}`

    

    const image = document.createElement("img");
    image.src = homes.homeData.url;
    image.height = 150;
    image.width = 150;
    
    let likes=0;
    const button = document.createElement("button");
    button.textContent = `Like ${likes}`;
    button.addEventListener("click", () => {
      likes++;
      button.textContent = `Like ${likes}`;
      console.log(likes);
    }); 


    resultElement.append(h2, p1, p2, p3, image, button);
    resultsContainer.append(resultElement);
  });
}


  


document.addEventListener("DOMContentLoaded", () => {
  searchForm.addEventListener("submit", (event) => {
    event.preventDefault();
    // Access the value property of searchInput to get the entered text
    searchLocation = searchInput.value;
    fetchData();
  });
  // Remove the call to fetchData() here, it is not necessary
});
