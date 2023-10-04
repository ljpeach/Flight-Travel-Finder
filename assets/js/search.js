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


    var queryString = './index.html?Departure=' + startLocation + '&destination=' + destination + '&startDate=' + startDate + '&returnDate=' + returnDate

    location.assign(queryString);
}

searchFormEl.addEventListener('submit', handleSearchFormSubmit);

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
