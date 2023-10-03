var searchFormEl = document.querySelector('.search-form');

function handleSearchFormSubmit(event) {
    event.preventDefault();

    var startLocation = document.querySelector('#start-city-input').value;
    var destination = document.querySelector("#destination-city-input").value;
    var startDate = document.querySelector('#start-date').value;
    var returnDate = document.querySelector('#return-date').value;

    if (!startLocation) {
        console.error('You need to enter the city you are departing from!');
        return;
    }

    if (!destination) {
        console.error('You need to enter your destination!');
        return;
    }

    if (!startDate) {
        console.error('You need to enter the start date of your trip!');
        return;
    }

    if (!returnDate) {
        console.error('You need to enter the return date of your trip!');
        return;
    }


    var queryString = './first-page.html?Departure=' + startLocation + '&destination=' + destination + '&startDate=' + startDate + '&returnDate=' + returnDate

    location.assign(queryString);
}

searchFormEl.addEventListener('submit', handleSearchFormSubmit);
