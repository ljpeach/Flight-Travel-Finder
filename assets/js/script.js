let slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
  showSlides(slideIndex += n);
}

function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("dot");
  if (n > slides.length) {slideIndex = 1}    
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";  
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";  
  dots[slideIndex-1].className += " active";
}

searchButton = document.querySelector("#search-button");
var apiKey = 'bfd8b2da59msh538a392bc430a11p19e389jsn9b895227b597';
var cityName = document.querySelector("#city-name");
function airportSearch(cityName) {
    var urlQuery = `https://world-airports-directory.p.rapidapi.com/v1/airports/${cityName}?page=1&limit=20&sortBy=AirportName%3Aasc`;
    return fetch(urlQuery, {
        method:'GET',
        headers: {
            'x-rapidapi-key': 'bfd8b2da59msh538a392bc430a11p19e389jsn9b895227b597',
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
        console.log(data);
    var airports = data.results;
        airports.forEach(results => {
            console.log(`Airport Name: ${results.AirportName}, Code : ${results.AirportCode}`);
        });
    })
    .catch(error => console.error('Error:', error));
}
    airportSearch('Chicago');