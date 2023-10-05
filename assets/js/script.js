var flightListEl = document.getElementById("flight-results");

function init() {
    if (window.location.search) {
        getQString();
    }
    loadHistory();
    loadPorts();
}

function handleModal(departObj, arriveObj) {
    var departureMenu = document.getElementById("departure-airport-code");
    var arrivalMenu = document.getElementById("arrival-airport-code");
    clearModal(departureMenu);
    clearModal(arrivalMenu)
    populateModal(departObj, departureMenu);
    populateModal(arriveObj, arrivalMenu)
    displayModal();
}

function clearModal(selectMenu) {
    while (selectMenu.children.length) {
        selectMenu.removeChild(selectMenu.firstChild);
    }
}

function displayModal() {
    var btn = document.getElementById("modal-btn");
    btn.dispatchEvent(new Event('click'));
}

function populateModal(airportObj, selectEl) {
    for (var i = 0; i < airportObj.length; i++) {
        addPortCode(airportObj[i], selectEl);
    }
}
function addPortCode(codeObj, selectEl) {
    var portCode = document.createElement('option');
    portCode.textContent = `${codeObj.name} (${codeObj.code})`;
    portCode.setAttribute("data-code", codeObj.code);
    selectEl.append(portCode);
}

var departCodeField = document.getElementById("departure-airport-code");
var arriveCodeField = document.getElementById("arrival-airport-code");
function handleModalCode(event) {
    event.preventDefault();
    var source;
    var destination;
    var date;
    if (event.target.id == "code-submit") {
        source = departCodeField.selectedOptions[0].getAttribute("data-code");
        destination = arriveCodeField.selectedOptions[0].getAttribute("data-code");
        date = startDateInput.value;
        var newHistory = { source: source, destination: destination, date: date };
        var isReallyNew = true;
        for (var i = 0; i < searchHistory.length; i++) {
            if (searchHistory[i].source === newHistory.source &&
                searchHistory[i].destination === newHistory.destination &&
                searchHistory[i].date === newHistory.date) {
                isReallyNew = false;
            }
        }
        if (isReallyNew) {
            searchHistory.push(newHistory);
            addHistory(newHistory);
        }
        saveHistory();
        displayFlights(tripAdvisorAPI(source, destination, date));

    }
}

var searchHistory = [];
function saveHistory() {
    localStorage.setItem("searchHistory", JSON.stringify(searchHistory));
}
function loadHistory() {
    searchHistory = JSON.parse(localStorage.getItem("searchHistory"));
    if (!searchHistory) {
        searchHistory = [];
    }
    for (var i = 0; i < searchHistory.length; i++) {
        addHistory(searchHistory[i]);
    }
}

var historyEl = document.getElementById("search-history");
function addHistory(historicalObj) {
    var historyBox = document.createElement("li");
    historyBox.textContent = `Departure: ${historicalObj.source}\nDestination: ${historicalObj.destination}\nDate: ${historicalObj.date}`
    var removeBtn = document.createElement("button");
    removeBtn.textContent = "X";
    historyBox.setAttribute("data-src", historicalObj.source);
    historyBox.setAttribute("data-dest", historicalObj.destination);
    historyBox.setAttribute("data-date", historicalObj.date);
    historyBox.append(removeBtn);
    historyEl.append(historyBox);
}
historyEl.addEventListener("click", function (event) {
    if (event.target.tagName.toLowerCase() == "button") {
        var liEls = historyEl.children;
        for (var i = 0; i < liEls.length; i++) {
            if (liEls[i] === event.target.parentElement) {
                searchHistory.splice(i, 1);
                break;
            }
        }
        event.target.parentElement.remove();
        saveHistory();
        return;
    }
    source = event.target.getAttribute("data-src");
    dest = event.target.getAttribute("data-dest");
    date = event.target.getAttribute("data-date");
    displayFlights(tripAdvisorAPI(source, dest, date));

});

function getQString() {
    var fields = window.location.search.slice(1).split('&');
    var arg;
    for (var i = 0; i < fields.length; i++) {
        arg = fields[i].split("=");
        switch (arg[0]) {
            case 'Departure':
                departureCityInput.value = arg[1];
                break;
            case 'destination':
                arrivalCityInput.value = arg[1];
                break;
            case 'startDate':
                startDateInput.value = arg[1];
                break;
            case 'returnDate':
                returnDateInput.value = arg[1];
                break;
        }
    }
}

async function displayFlights(flightData) {
    while (flightListEl.children.length) {
        flightListEl.removeChild(flightListEl.firstChild);
    }
    flightData = await flightData;
    for (var i = 0; i < flightData.length; i++) {
        addFlight(flightData[i]);
    }
}
function addFlight(flight) {
    var flightCard = document.createElement("div");
    var priceInfo = document.createElement("p");
    var providedBy = document.createElement("p");
    var purchaseLink = document.createElement("a");
    flightCard.className = "inline-block ml-20 mb-5 max-w-sm p-6 border border-yellow-500 rounded-lg shadow hover:bg-gray-100 ";
    priceInfo.className = "mb-2 text-2xl font-bold tracking-tight text-gray-900 ";
    providedBy.className = "font-normal text-gray-700 dark:text-gray-400";
    purchaseLink.className = "text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-200 dark:focus:ring-blue-900 font-medium rounded-lg text-sm px-5 py-2.5 inline-flex justify-center w-full text-center";
    if (flight.currency == flight.originalCurrency) {
        priceInfo.textContent = `Price: ${flight.totalPrice}(${flight.currency})`;
    }
    else {
        priceInfo.textContent = `Price: ${flight.totalPrice}(${flight.currency}) (originally in ${flight.originalCurrency})`;
    }
    providedBy.textContent = `Ticket Provided by ${flight.commerceName} on ${flight.providerId}`;
    purchaseLink.textContent = `View ticket (external)`;
    purchaseLink.setAttribute("href", flight.url);
   
    flightCard.appendChild(priceInfo);
    flightCard.appendChild(providedBy);
    flightCard.appendChild(purchaseLink);
}


function tripAdvisorAPI(departPort, arrivePort, date) {
    var urlQuery = `https://tripadvisor16.p.rapidapi.com/api/v1/flights/searchFlights?sourceAirportCode=${departPort}&destinationAirportCode=${arrivePort}&date=${date}&itineraryType=${'ONE_WAY'}&sortOrder=${'PRICE'}&numAdults=${1}&numSeniors=${0}&classOfService=${'ECONOMY'}`;
    console.log(urlQuery);
    var options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '917526c90bmsh476e293f7fe4742p1ddb08jsn2d6d6fbc32a9',
            'X-RapidAPI-Host': 'tripadvisor16.p.rapidapi.com'
        }
    }
    return fetch(urlQuery, options)
        .then(function (response) {
            if (!response.ok) {
                return;
            }
            return response.json();
        })
        .then(function (data) {
            return processFlightData(data.data);
        });
}

function processFlightData(data) {
    var tripArr = [];
    var selectedFlight;
    for (var flight = 0; flight < data.flights.length && flight < 4; flight++) {
        selectedFlight = data.flights[flight];
        for (var ticket = 0; ticket < selectedFlight.purchaseLinks.length && ticket < 5; ticket++) {
            var currentTicket = selectedFlight.purchaseLinks[ticket];
            tripArr.push(
                {
                    providerId: currentTicket.providerId,
                    commerceName: currentTicket.commerceName,
                    currency: currentTicket.currency,
                    originalCurrency: currentTicket.originalCurrency,
                    totalPrice: currentTicket.totalPrice,
                    url: currentTicket.url
                }
            );
        }
    }
    console.log(tripArr);
    return tripArr;
}

var apiKey = '20f4c54928msh25ac80477286671p191e50jsn577f5ce96dea';
var departureCityInput = document.querySelector("#start-city-input");
var arrivalCityInput = document.querySelector("#destination-city-input");
var startDateInput = document.querySelector("#startdate");
var returnDateInput = document.querySelector("#returndate");
var departureAirportArray = [];
var arrivalAirportArray = [];
var fromAPI = [];

function airportSearch(cityName, airportArray) {
    var urlQuery = `https://world-airports-directory.p.rapidapi.com/v1/airports/${cityName}?page=1&limit=20&sortBy=AirportName%3Aasc`;
    return fetch(urlQuery, {
        method: 'GET',
        headers: {
            'x-rapidapi-key': '917526c90bmsh476e293f7fe4742p1ddb08jsn2d6d6fbc32a9',
            'x-rapidapi-host': 'world-airports-directory.p.rapidapi.com'
        }
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            var airports = data.results;
            airports.forEach(results => {
                var airport = {
                    name: results.AirportName,
                    code: results.AirportCode
                }
                airportArray.push(airport);

            });
            return airportArray;
        })
        .catch(error => console.error('Error:', error));
}

function savePorts() {
    localStorage.setItem("fromApi", JSON.stringify(fromAPI));
}

function loadPorts() {
    fromAPI = JSON.parse(localStorage.getItem("fromApi"));
    if (fromAPI == null) {
        fromAPI = [];
    }
}

document.getElementById("search-button").addEventListener("click", async function (event) {
    event.preventDefault();
    var source = departureCityInput.value;
    var dest = arrivalCityInput.value;
    var isFound = false;
    var departure;
    var arrival;
    var i;
    for (i = 0; i < fromAPI.length; i++) {
        if (fromAPI[i].name === source) {
            isFound = true;
            departure = fromAPI[i].codes;
            break;
        }
    }
    if (!isFound) {
        departure = [];
        departure = await airportSearch(source, departure);
        fromAPI.push({ name: source, codes: departure });
        savePorts();
    }
    isFound = false;
    for (i = 0; i < fromAPI.length; i++) {
        if (fromAPI[i].name === dest) {
            isFound = true;
            arrival = fromAPI[i].codes;
            break;
        }
    }
    if (!isFound) {
        arrival = [];
        arrival = await airportSearch(dest, arrival);
        fromAPI.push({ name: dest, codes: arrival });
        savePorts();
    }
    handleModal(departure, arrival);
});

document.getElementById("modal-body").addEventListener("click", handleModalCode);

init();