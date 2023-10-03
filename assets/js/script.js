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
    if (n > slides.length) { slideIndex = 1 }
    if (n < 1) { slideIndex = slides.length }
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].className += " active";
}

var flightListEl = document.getElementById("");

function init() {
    tripAdvisorAPI("ORD", "LAX", "2023-10-31");
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
    return processFlightData(fakeResponse);
    return fetch(urlQuery, options)
        .then(function (response) {
            if (!response.ok) {
                console.log(response);
                return;
            }
            console.log(response);
            return response.json();
        })
        .then(function (data) {
            console.log(data.data);
            return processFlightData(data.data);
        });
}

function displayFlights(flightData) {

    for (var i = 0; i < flightData.length; i++) {
        addFlight(flightData[i]);
    }
}

function addFlight(flight) {
    var flightCard = document.createElement("div");
    flightCard.className = "";
    flightListEl.appendChild(flightCard);
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

searchButton = document.querySelector("#search-button");
var apiKey = 'bfd8b2da59msh538a392bc430a11p19e389jsn9b895227b597';
var cityName = document.querySelector("#city-name");
var airportArray = [];
function airportSearch(cityName) {
    var urlQuery = `https://world-airports-directory.p.rapidapi.com/v1/airports/${cityName}?page=1&limit=20&sortBy=AirportName%3Aasc`;
    return fetch(urlQuery, {
        method: 'GET',
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
            var airport = {
                name: results.AirportName,
                code: results.AirportCode
            }
            airportArray.push(airport);

        });
        console.log(airportArray); 
    })
    .catch(error => console.error('Error:', error));
}
airportSearch('Chicago');

var fakeResponse = {
    "session": {
        "searchHash": "e7698b48f958e32740578c0fb9df4e5d",
        "pageLoadUid": "2bd8404e-343b-4c39-9cf6-b80f918b6721",
        "searchId": "eccd9328-a959-4563-9592-8edff3358d4a.381"
    },
    "complete": false,
    "numOfFilters": 212,
    "totalNumResults": 503,
    "flights": [
        {
            "segments": [
                {
                    "legs": [
                        {
                            "originStationCode": "ORD",
                            "isDifferentOriginStation": false,
                            "destinationStationCode": "LAX",
                            "isDifferentDestinationStation": false,
                            "departureDateTime": "2023-10-31T17:31:00-05:00",
                            "arrivalDateTime": "2023-10-31T20:06:00-07:00",
                            "classOfService": "ECONOMY",
                            "marketingCarrierCode": "NK",
                            "operatingCarrierCode": "NK",
                            "equipmentId": "Airbus A320neo",
                            "amenities": [],
                            "flightNumber": 1786,
                            "seatGuruEquipmentId": 0,
                            "seatGuruAirlineUrl": "",
                            "numStops": 0,
                            "distanceInKM": 2804.864,
                            "isInternational": false,
                            "selfTransfer": false,
                            "operatingCarrier": {
                                "locationId": 8729157,
                                "code": "NK",
                                "logoUrl": "https://static.tacdn.com/img2/flights/airlines/logos/100x100/Spirit_Logo_Updated_1.jpg",
                                "displayName": "Spirit"
                            },
                            "marketingCarrier": {
                                "locationId": 8729157,
                                "code": "NK",
                                "logoUrl": "https://static.tacdn.com/img2/flights/airlines/logos/100x100/Spirit_Logo_Updated_1.jpg",
                                "displayName": "Spirit"
                            }
                        }
                    ],
                    "layovers": []
                }
            ],
            "purchaseLinks": [
                {
                    "purchaseLinkId": "Kayak|1|338",
                    "providerId": "eDreams",
                    "partnerSuppliedProvider": {
                        "id": "EDREAMSAIR",
                        "displayName": "eDreams",
                        "logoUrl": "https://content.r9cdn.net/rimg/provider-logos/airlines/h/EDREAMSAIR.us.png?crop=false&width=166&height=62&fallback=default2.png&_v=af0479a857c0eb142b1531d305bbf971"
                    },
                    "commerceName": "KayakFlightsMeta",
                    "currency": "USD",
                    "originalCurrency": "USD",
                    "seatAvailability": 0,
                    "taxesAndFees": 0,
                    "taxesAndFeesPerPassenger": 0,
                    "totalPrice": 48.65,
                    "totalPricePerPassenger": 48.65,
                    "fareBasisCodes": [],
                    "containedPurchaseLinks": [],
                    "partnerData": {},
                    "isPaid": false,
                    "fareAttributesList": [],
                    "url": "https://www.tripadvisor.com/CheapFlightsPartnerHandoff?searchHash=e7698b48f958e32740578c0fb9df4e5d&provider=Kayak|1|338&area=FLTCenterColumn|0|1|ItinList|2|Meta_ItineraryPrice&resultsServlet=CheapFlightsSearchResults&handoffPlatform=desktop&impressionId=&totalPricePerPassenger=48.65"
                },
                {
                    "purchaseLinkId": "Kayak|1|339",
                    "providerId": "mytrip.com",
                    "partnerSuppliedProvider": {
                        "id": "AIRTICKETS24DOTCOM",
                        "displayName": "mytrip.com",
                        "logoUrl": "https://content.r9cdn.net/rimg/provider-logos/airlines/h/AIRTICKETS24DOTCOM.png?crop=false&width=166&height=62&fallback=default1.png&_v=1e84439f35e4558f94e874158f6a3eae"
                    },
                    "commerceName": "KayakFlightsMeta",
                    "currency": "USD",
                    "originalCurrency": "USD",
                    "seatAvailability": 0,
                    "taxesAndFees": 0,
                    "taxesAndFeesPerPassenger": 0,
                    "totalPrice": 52.89,
                    "totalPricePerPassenger": 52.89,
                    "fareBasisCodes": [],
                    "containedPurchaseLinks": [],
                    "partnerData": {},
                    "isPaid": false,
                    "fareAttributesList": [],
                    "url": "https://www.tripadvisor.com/CheapFlightsPartnerHandoff?searchHash=e7698b48f958e32740578c0fb9df4e5d&provider=Kayak|1|339&area=FLTCenterColumn|0|1|ItinList|2|Meta_ItineraryPrice&resultsServlet=CheapFlightsSearchResults&handoffPlatform=desktop&impressionId=&totalPricePerPassenger=52.89"
                },
                {
                    "purchaseLinkId": "Kayak|1|340",
                    "providerId": "Gotogate",
                    "partnerSuppliedProvider": {
                        "id": "GOTOGATE",
                        "displayName": "Gotogate",
                        "logoUrl": "https://content.r9cdn.net/rimg/provider-logos/airlines/h/GOTOGATE.png?crop=false&width=166&height=62&fallback=default3.png&_v=a29de71af6666a1a11e42eb0b5f7f84a"
                    },
                    "commerceName": "KayakFlightsMeta",
                    "currency": "USD",
                    "originalCurrency": "USD",
                    "seatAvailability": 0,
                    "taxesAndFees": 0,
                    "taxesAndFeesPerPassenger": 0,
                    "totalPrice": 52.89,
                    "totalPricePerPassenger": 52.89,
                    "fareBasisCodes": [],
                    "containedPurchaseLinks": [],
                    "partnerData": {},
                    "isPaid": false,
                    "fareAttributesList": [],
                    "url": "https://www.tripadvisor.com/CheapFlightsPartnerHandoff?searchHash=e7698b48f958e32740578c0fb9df4e5d&provider=Kayak|1|340&area=FLTCenterColumn|0|1|ItinList|2|Meta_ItineraryPrice&resultsServlet=CheapFlightsSearchResults&handoffPlatform=desktop&impressionId=&totalPricePerPassenger=52.89"
                },
                {
                    "purchaseLinkId": "Kayak|1|342",
                    "providerId": "Booking.com",
                    "partnerSuppliedProvider": {
                        "id": "BOOKINGFLIGHTS",
                        "displayName": "Booking.com",
                        "logoUrl": "https://content.r9cdn.net/rimg/provider-logos/airlines/h/BOOKINGFLIGHTS.png?crop=false&width=166&height=62&fallback=default3.png&_v=1233faf051a0a6b9d9807846b1316f74"
                    },
                    "commerceName": "KayakFlightsMeta",
                    "currency": "USD",
                    "originalCurrency": "USD",
                    "seatAvailability": 0,
                    "taxesAndFees": 0,
                    "taxesAndFeesPerPassenger": 0,
                    "totalPrice": 52.89,
                    "totalPricePerPassenger": 52.89,
                    "fareBasisCodes": [],
                    "containedPurchaseLinks": [],
                    "partnerData": {},
                    "isPaid": false,
                    "fareAttributesList": [],
                    "url": "https://www.tripadvisor.com/CheapFlightsPartnerHandoff?searchHash=e7698b48f958e32740578c0fb9df4e5d&provider=Kayak|1|342&area=FLTCenterColumn|0|1|ItinList|2|Meta_ItineraryPrice&resultsServlet=CheapFlightsSearchResults&handoffPlatform=desktop&impressionId=&totalPricePerPassenger=52.89"
                },
                {
                    "purchaseLinkId": "Kayak|1|341",
                    "providerId": "CheapOair",
                    "partnerSuppliedProvider": {
                        "id": "CHEAPOAIR",
                        "displayName": "CheapOair",
                        "logoUrl": "https://content.r9cdn.net/rimg/provider-logos/airlines/h/CHEAPOAIR.png?crop=false&width=166&height=62&fallback=default2.png&_v=5eb11191c415b271717e37aa9870f06f"
                    },
                    "commerceName": "KayakFlightsMeta",
                    "currency": "USD",
                    "originalCurrency": "USD",
                    "seatAvailability": 0,
                    "taxesAndFees": 0,
                    "taxesAndFeesPerPassenger": 0,
                    "totalPrice": 52.89,
                    "totalPricePerPassenger": 52.89,
                    "fareBasisCodes": [],
                    "containedPurchaseLinks": [],
                    "partnerData": {},
                    "isPaid": false,
                    "fareAttributesList": [],
                    "url": "https://www.tripadvisor.com/CheapFlightsPartnerHandoff?searchHash=e7698b48f958e32740578c0fb9df4e5d&provider=Kayak|1|341&area=FLTCenterColumn|0|1|ItinList|2|Meta_ItineraryPrice&resultsServlet=CheapFlightsSearchResults&handoffPlatform=desktop&impressionId=&totalPricePerPassenger=52.89"
                },
                {
                    "purchaseLinkId": "Kayak|1|343",
                    "providerId": "Priceline",
                    "partnerSuppliedProvider": {
                        "id": "PRICELINEFLIGHTS",
                        "displayName": "Priceline",
                        "logoUrl": "https://content.r9cdn.net/rimg/provider-logos/airlines/h/PRICELINEFLIGHTS.png?crop=false&width=166&height=62&fallback=default3.png&_v=b3e81884c7678f954cce1ed2c441273a"
                    },
                    "commerceName": "KayakFlightsMeta",
                    "currency": "USD",
                    "originalCurrency": "USD",
                    "seatAvailability": 0,
                    "taxesAndFees": 0,
                    "taxesAndFeesPerPassenger": 0,
                    "totalPrice": 53.89,
                    "totalPricePerPassenger": 53.89,
                    "fareBasisCodes": [],
                    "containedPurchaseLinks": [],
                    "partnerData": {},
                    "isPaid": false,
                    "fareAttributesList": [],
                    "url": "https://www.tripadvisor.com/CheapFlightsPartnerHandoff?searchHash=e7698b48f958e32740578c0fb9df4e5d&provider=Kayak|1|343&area=FLTCenterColumn|0|1|ItinList|2|Meta_ItineraryPrice&resultsServlet=CheapFlightsSearchResults&handoffPlatform=desktop&impressionId=&totalPricePerPassenger=53.89"
                },
                {
                    "purchaseLinkId": "Kayak|1|344",
                    "providerId": "Trip.com",
                    "partnerSuppliedProvider": {
                        "id": "CTRIPAIR",
                        "displayName": "Trip.com",
                        "logoUrl": "https://content.r9cdn.net/rimg/provider-logos/airlines/h/CTRIPAIR.png?crop=false&width=166&height=62&fallback=default1.png&_v=6ffbb6778ab7d3ee8da1e965010b225e"
                    },
                    "commerceName": "KayakFlightsMeta",
                    "currency": "USD",
                    "originalCurrency": "USD",
                    "seatAvailability": 0,
                    "taxesAndFees": 0,
                    "taxesAndFeesPerPassenger": 0,
                    "totalPrice": 54,
                    "totalPricePerPassenger": 54,
                    "fareBasisCodes": [],
                    "containedPurchaseLinks": [],
                    "partnerData": {},
                    "isPaid": false,
                    "fareAttributesList": [],
                    "url": "https://www.tripadvisor.com/CheapFlightsPartnerHandoff?searchHash=e7698b48f958e32740578c0fb9df4e5d&provider=Kayak|1|344&area=FLTCenterColumn|0|1|ItinList|2|Meta_ItineraryPrice&resultsServlet=CheapFlightsSearchResults&handoffPlatform=desktop&impressionId=&totalPricePerPassenger=54"
                },
                {
                    "purchaseLinkId": "Kayak|1|345",
                    "providerId": "Spirit Airlines",
                    "partnerSuppliedProvider": {
                        "id": "NK",
                        "displayName": "Spirit Airlines",
                        "logoUrl": "https://content.r9cdn.net/rimg/provider-logos/airlines/h/NK.png?crop=false&width=166&height=62&fallback=default1.png&_v=2ec6f00d181725322e6a0f66550c2c23"
                    },
                    "commerceName": "KayakFlightsMeta",
                    "currency": "USD",
                    "originalCurrency": "USD",
                    "seatAvailability": 0,
                    "taxesAndFees": 0,
                    "taxesAndFeesPerPassenger": 0,
                    "totalPrice": 57.89,
                    "totalPricePerPassenger": 57.89,
                    "fareBasisCodes": [],
                    "containedPurchaseLinks": [],
                    "fareBranding": {
                        "brandId": "Economy",
                        "carrierCode": "NK"
                    },
                    "partnerData": {},
                    "isPaid": false,
                    "fareAttributesList": [
                        {
                            "carryonAllowed": true,
                            "carryonFeeObj": {
                                "feeType": "PRESENT",
                                "feeValue": -1
                            },
                            "freeCheckedBagAllowance": 0,
                            "firstCheckedBagFee": -1,
                            "secondCheckedBagFee": -1,
                            "seatSelectionAllowed": true,
                            "seatSelectionFeeObj": {
                                "feeType": "PRESENT",
                                "feeValue": -1
                            },
                            "ticketChangeAllowed": true,
                            "ticketChangeFeeObj": {
                                "feeType": "PRESENT",
                                "feeValue": -1
                            },
                            "segmentIndices": [
                                0
                            ]
                        }
                    ],
                    "url": "https://www.tripadvisor.com/CheapFlightsPartnerHandoff?searchHash=e7698b48f958e32740578c0fb9df4e5d&provider=Kayak|1|345&area=FLTCenterColumn|0|1|ItinList|2|Meta_ItineraryPrice&resultsServlet=CheapFlightsSearchResults&handoffPlatform=desktop&impressionId=&totalPricePerPassenger=57.89"
                },
                {
                    "purchaseLinkId": "Kayak|1|346",
                    "providerId": "Kiwi.com",
                    "partnerSuppliedProvider": {
                        "id": "SKYPICKER",
                        "displayName": "Kiwi.com",
                        "logoUrl": "https://content.r9cdn.net/rimg/provider-logos/airlines/h/SKYPICKER.png?crop=false&width=166&height=62&fallback=default3.png&_v=0cd3e94b7e8a5f027bff27942a213709"
                    },
                    "commerceName": "KayakFlightsMeta",
                    "currency": "USD",
                    "originalCurrency": "USD",
                    "seatAvailability": 0,
                    "taxesAndFees": 0,
                    "taxesAndFeesPerPassenger": 0,
                    "totalPrice": 58,
                    "totalPricePerPassenger": 58,
                    "fareBasisCodes": [],
                    "containedPurchaseLinks": [],
                    "partnerData": {},
                    "isPaid": false,
                    "fareAttributesList": [],
                    "url": "https://www.tripadvisor.com/CheapFlightsPartnerHandoff?searchHash=e7698b48f958e32740578c0fb9df4e5d&provider=Kayak|1|346&area=FLTCenterColumn|0|1|ItinList|2|Meta_ItineraryPrice&resultsServlet=CheapFlightsSearchResults&handoffPlatform=desktop&impressionId=&totalPricePerPassenger=58"
                },
                {
                    "purchaseLinkId": "Kayak|1|347",
                    "providerId": "BudgetAir",
                    "partnerSuppliedProvider": {
                        "id": "BUDGETAIR",
                        "displayName": "BudgetAir",
                        "logoUrl": "https://content.r9cdn.net/rimg/provider-logos/airlines/h/BUDGETAIR.png?crop=false&width=166&height=62&fallback=default1.png&_v=177104dc3b6ae3c8860d2024a287fa08"
                    },
                    "commerceName": "KayakFlightsMeta",
                    "currency": "USD",
                    "originalCurrency": "USD",
                    "seatAvailability": 0,
                    "taxesAndFees": 0,
                    "taxesAndFeesPerPassenger": 0,
                    "totalPrice": 80,
                    "totalPricePerPassenger": 80,
                    "fareBasisCodes": [],
                    "containedPurchaseLinks": [],
                    "partnerData": {},
                    "isPaid": false,
                    "fareAttributesList": [],
                    "url": "https://www.tripadvisor.com/CheapFlightsPartnerHandoff?searchHash=e7698b48f958e32740578c0fb9df4e5d&provider=Kayak|1|347&area=FLTCenterColumn|0|1|ItinList|2|Meta_ItineraryPrice&resultsServlet=CheapFlightsSearchResults&handoffPlatform=desktop&impressionId=&totalPricePerPassenger=80"
                }
            ]
        },
        {
            "segments": [
                {
                    "legs": [
                        {
                            "originStationCode": "ORD",
                            "isDifferentOriginStation": false,
                            "destinationStationCode": "ATL",
                            "isDifferentDestinationStation": false,
                            "departureDateTime": "2023-10-31T19:58:00-05:00",
                            "arrivalDateTime": "2023-10-31T23:07:00-04:00",
                            "classOfService": "ECONOMY",
                            "marketingCarrierCode": "F9",
                            "operatingCarrierCode": "F9",
                            "equipmentId": "Airbus A321-100/200",
                            "amenities": [],
                            "flightNumber": 1575,
                            "seatGuruEquipmentId": 0,
                            "seatGuruAirlineUrl": "",
                            "numStops": 0,
                            "distanceInKM": 977.5762,
                            "isInternational": false,
                            "selfTransfer": false,
                            "operatingCarrier": {
                                "locationId": 8729213,
                                "code": "F9",
                                "logoUrl": "https://static.tacdn.com/img2/flights/airlines/logos/100x100/FrontierAirlines.png",
                                "displayName": "Frontier"
                            },
                            "marketingCarrier": {
                                "locationId": 8729213,
                                "code": "F9",
                                "logoUrl": "https://static.tacdn.com/img2/flights/airlines/logos/100x100/FrontierAirlines.png",
                                "displayName": "Frontier"
                            }
                        },
                        {
                            "originStationCode": "ATL",
                            "isDifferentOriginStation": false,
                            "destinationStationCode": "LAX",
                            "isDifferentDestinationStation": false,
                            "departureDateTime": "2023-11-01T07:10:00-04:00",
                            "arrivalDateTime": "2023-11-01T09:02:00-07:00",
                            "classOfService": "ECONOMY",
                            "marketingCarrierCode": "NK",
                            "operatingCarrierCode": "NK",
                            "equipmentId": "Airbus A320neo",
                            "amenities": [],
                            "flightNumber": 1829,
                            "seatGuruEquipmentId": 0,
                            "seatGuruAirlineUrl": "",
                            "numStops": 0,
                            "distanceInKM": 3128.887,
                            "isInternational": false,
                            "selfTransfer": true,
                            "operatingCarrier": {
                                "locationId": 8729157,
                                "code": "NK",
                                "logoUrl": "https://static.tacdn.com/img2/flights/airlines/logos/100x100/Spirit_Logo_Updated_1.jpg",
                                "displayName": "Spirit"
                            },
                            "marketingCarrier": {
                                "locationId": 8729157,
                                "code": "NK",
                                "logoUrl": "https://static.tacdn.com/img2/flights/airlines/logos/100x100/Spirit_Logo_Updated_1.jpg",
                                "displayName": "Spirit"
                            }
                        }
                    ],
                    "layovers": [
                        {
                            "durationType": "LONG",
                            "hasStationChange": false,
                            "durationInMinutes": 483
                        }
                    ]
                }
            ],
            "purchaseLinks": [
                {
                    "purchaseLinkId": "Kayak|1|895",
                    "providerId": "Kiwi.com",
                    "partnerSuppliedProvider": {
                        "id": "KIWIVI",
                        "displayName": "Kiwi.com",
                        "logoUrl": "https://content.r9cdn.net/rimg/provider-logos/airlines/h/SKYPICKER.png?crop=false&width=166&height=62&fallback=default3.png&_v=0cd3e94b7e8a5f027bff27942a213709"
                    },
                    "commerceName": "KayakFlightsMeta",
                    "currency": "USD",
                    "originalCurrency": "USD",
                    "seatAvailability": 0,
                    "taxesAndFees": 0,
                    "taxesAndFeesPerPassenger": 0,
                    "totalPrice": 69,
                    "totalPricePerPassenger": 69,
                    "fareBasisCodes": [],
                    "containedPurchaseLinks": [],
                    "partnerData": {},
                    "isPaid": false,
                    "fareAttributesList": [],
                    "url": "https://www.tripadvisor.com/CheapFlightsPartnerHandoff?searchHash=e7698b48f958e32740578c0fb9df4e5d&provider=Kayak|1|895&area=FLTCenterColumn|0|1|ItinList|3|Meta_ItineraryPrice&resultsServlet=CheapFlightsSearchResults&handoffPlatform=desktop&impressionId=&totalPricePerPassenger=69"
                }
            ]
        },
        {
            "segments": [
                {
                    "legs": [
                        {
                            "originStationCode": "ORD",
                            "isDifferentOriginStation": false,
                            "destinationStationCode": "ATL",
                            "isDifferentDestinationStation": false,
                            "departureDateTime": "2023-10-31T20:22:00-05:00",
                            "arrivalDateTime": "2023-10-31T23:29:00-04:00",
                            "classOfService": "ECONOMY",
                            "marketingCarrierCode": "NK",
                            "operatingCarrierCode": "NK",
                            "equipmentId": "Airbus A319",
                            "amenities": [],
                            "flightNumber": 635,
                            "seatGuruEquipmentId": 0,
                            "seatGuruAirlineUrl": "",
                            "numStops": 0,
                            "distanceInKM": 977.5762,
                            "isInternational": false,
                            "selfTransfer": false,
                            "operatingCarrier": {
                                "locationId": 8729157,
                                "code": "NK",
                                "logoUrl": "https://static.tacdn.com/img2/flights/airlines/logos/100x100/Spirit_Logo_Updated_1.jpg",
                                "displayName": "Spirit"
                            },
                            "marketingCarrier": {
                                "locationId": 8729157,
                                "code": "NK",
                                "logoUrl": "https://static.tacdn.com/img2/flights/airlines/logos/100x100/Spirit_Logo_Updated_1.jpg",
                                "displayName": "Spirit"
                            }
                        },
                        {
                            "originStationCode": "ATL",
                            "isDifferentOriginStation": false,
                            "destinationStationCode": "LAX",
                            "isDifferentDestinationStation": false,
                            "departureDateTime": "2023-11-01T07:10:00-04:00",
                            "arrivalDateTime": "2023-11-01T09:02:00-07:00",
                            "classOfService": "ECONOMY",
                            "marketingCarrierCode": "NK",
                            "operatingCarrierCode": "NK",
                            "equipmentId": "Airbus A320neo",
                            "amenities": [],
                            "flightNumber": 1829,
                            "seatGuruEquipmentId": 0,
                            "seatGuruAirlineUrl": "",
                            "numStops": 0,
                            "distanceInKM": 3128.887,
                            "isInternational": false,
                            "selfTransfer": true,
                            "operatingCarrier": {
                                "locationId": 8729157,
                                "code": "NK",
                                "logoUrl": "https://static.tacdn.com/img2/flights/airlines/logos/100x100/Spirit_Logo_Updated_1.jpg",
                                "displayName": "Spirit"
                            },
                            "marketingCarrier": {
                                "locationId": 8729157,
                                "code": "NK",
                                "logoUrl": "https://static.tacdn.com/img2/flights/airlines/logos/100x100/Spirit_Logo_Updated_1.jpg",
                                "displayName": "Spirit"
                            }
                        }
                    ],
                    "layovers": [
                        {
                            "durationType": "LONG",
                            "hasStationChange": false,
                            "durationInMinutes": 461
                        }
                    ]
                }
            ],
            "purchaseLinks": [
                {
                    "purchaseLinkId": "Kayak|1|422",
                    "providerId": "mytrip.com",
                    "partnerSuppliedProvider": {
                        "id": "AIRTICKETS24DOTCOMVI",
                        "displayName": "mytrip.com",
                        "logoUrl": "https://content.r9cdn.net/rimg/provider-logos/airlines/h/AIRTICKETS24DOTCOM.png?crop=false&width=166&height=62&fallback=default1.png&_v=1e84439f35e4558f94e874158f6a3eae"
                    },
                    "commerceName": "KayakFlightsMeta",
                    "currency": "USD",
                    "originalCurrency": "USD",
                    "seatAvailability": 0,
                    "taxesAndFees": 0,
                    "taxesAndFeesPerPassenger": 0,
                    "totalPrice": 71.97,
                    "totalPricePerPassenger": 71.97,
                    "fareBasisCodes": [],
                    "containedPurchaseLinks": [],
                    "partnerData": {},
                    "isPaid": false,
                    "fareAttributesList": [],
                    "url": "https://www.tripadvisor.com/CheapFlightsPartnerHandoff?searchHash=e7698b48f958e32740578c0fb9df4e5d&provider=Kayak|1|422&area=FLTCenterColumn|0|1|ItinList|4|Meta_ItineraryPrice&resultsServlet=CheapFlightsSearchResults&handoffPlatform=desktop&impressionId=&totalPricePerPassenger=71.97"
                },
                {
                    "purchaseLinkId": "Kayak|1|423",
                    "providerId": "Spirit Airlines",
                    "partnerSuppliedProvider": {
                        "id": "NK",
                        "displayName": "Spirit Airlines",
                        "logoUrl": "https://content.r9cdn.net/rimg/provider-logos/airlines/h/NK.png?crop=false&width=166&height=62&fallback=default1.png&_v=2ec6f00d181725322e6a0f66550c2c23"
                    },
                    "commerceName": "KayakFlightsMeta",
                    "currency": "USD",
                    "originalCurrency": "USD",
                    "seatAvailability": 0,
                    "taxesAndFees": 0,
                    "taxesAndFeesPerPassenger": 0,
                    "totalPrice": 81.79,
                    "totalPricePerPassenger": 81.79,
                    "fareBasisCodes": [],
                    "containedPurchaseLinks": [],
                    "fareBranding": {
                        "brandId": "Economy",
                        "carrierCode": "NK"
                    },
                    "partnerData": {},
                    "isPaid": false,
                    "fareAttributesList": [
                        {
                            "carryonAllowed": true,
                            "carryonFeeObj": {
                                "feeType": "PRESENT",
                                "feeValue": -1
                            },
                            "freeCheckedBagAllowance": 0,
                            "firstCheckedBagFee": -1,
                            "secondCheckedBagFee": -1,
                            "seatSelectionAllowed": true,
                            "seatSelectionFeeObj": {
                                "feeType": "PRESENT",
                                "feeValue": -1
                            },
                            "ticketChangeAllowed": true,
                            "ticketChangeFeeObj": {
                                "feeType": "PRESENT",
                                "feeValue": -1
                            },
                            "segmentIndices": [
                                0
                            ]
                        }
                    ],
                    "url": "https://www.tripadvisor.com/CheapFlightsPartnerHandoff?searchHash=e7698b48f958e32740578c0fb9df4e5d&provider=Kayak|1|423&area=FLTCenterColumn|0|1|ItinList|4|Meta_ItineraryPrice&resultsServlet=CheapFlightsSearchResults&handoffPlatform=desktop&impressionId=&totalPricePerPassenger=81.79"
                },
                {
                    "purchaseLinkId": "Kayak|1|424",
                    "providerId": "Kiwi.com",
                    "partnerSuppliedProvider": {
                        "id": "KIWIVI",
                        "displayName": "Kiwi.com",
                        "logoUrl": "https://content.r9cdn.net/rimg/provider-logos/airlines/h/SKYPICKER.png?crop=false&width=166&height=62&fallback=default3.png&_v=0cd3e94b7e8a5f027bff27942a213709"
                    },
                    "commerceName": "KayakFlightsMeta",
                    "currency": "USD",
                    "originalCurrency": "USD",
                    "seatAvailability": 0,
                    "taxesAndFees": 0,
                    "taxesAndFeesPerPassenger": 0,
                    "totalPrice": 83,
                    "totalPricePerPassenger": 83,
                    "fareBasisCodes": [],
                    "containedPurchaseLinks": [],
                    "partnerData": {},
                    "isPaid": false,
                    "fareAttributesList": [],
                    "url": "https://www.tripadvisor.com/CheapFlightsPartnerHandoff?searchHash=e7698b48f958e32740578c0fb9df4e5d&provider=Kayak|1|424&area=FLTCenterColumn|0|1|ItinList|4|Meta_ItineraryPrice&resultsServlet=CheapFlightsSearchResults&handoffPlatform=desktop&impressionId=&totalPricePerPassenger=83"
                },
                {
                    "purchaseLinkId": "Kayak|1|427",
                    "providerId": "CheapOair",
                    "partnerSuppliedProvider": {
                        "id": "CHEAPOAIR",
                        "displayName": "CheapOair",
                        "logoUrl": "https://content.r9cdn.net/rimg/provider-logos/airlines/h/CHEAPOAIR.png?crop=false&width=166&height=62&fallback=default2.png&_v=5eb11191c415b271717e37aa9870f06f"
                    },
                    "commerceName": "KayakFlightsMeta",
                    "currency": "USD",
                    "originalCurrency": "USD",
                    "seatAvailability": 0,
                    "taxesAndFees": 0,
                    "taxesAndFeesPerPassenger": 0,
                    "totalPrice": 85.18,
                    "totalPricePerPassenger": 85.18,
                    "fareBasisCodes": [],
                    "containedPurchaseLinks": [],
                    "partnerData": {},
                    "isPaid": false,
                    "fareAttributesList": [],
                    "url": "https://www.tripadvisor.com/CheapFlightsPartnerHandoff?searchHash=e7698b48f958e32740578c0fb9df4e5d&provider=Kayak|1|427&area=FLTCenterColumn|0|1|ItinList|4|Meta_ItineraryPrice&resultsServlet=CheapFlightsSearchResults&handoffPlatform=desktop&impressionId=&totalPricePerPassenger=85.18"
                },
                {
                    "purchaseLinkId": "Kayak|1|425",
                    "providerId": "Gotogate",
                    "partnerSuppliedProvider": {
                        "id": "GOTOGATE",
                        "displayName": "Gotogate",
                        "logoUrl": "https://content.r9cdn.net/rimg/provider-logos/airlines/h/GOTOGATE.png?crop=false&width=166&height=62&fallback=default3.png&_v=a29de71af6666a1a11e42eb0b5f7f84a"
                    },
                    "commerceName": "KayakFlightsMeta",
                    "currency": "USD",
                    "originalCurrency": "USD",
                    "seatAvailability": 0,
                    "taxesAndFees": 0,
                    "taxesAndFeesPerPassenger": 0,
                    "totalPrice": 85.18,
                    "totalPricePerPassenger": 85.18,
                    "fareBasisCodes": [],
                    "containedPurchaseLinks": [],
                    "partnerData": {},
                    "isPaid": false,
                    "fareAttributesList": [],
                    "url": "https://www.tripadvisor.com/CheapFlightsPartnerHandoff?searchHash=e7698b48f958e32740578c0fb9df4e5d&provider=Kayak|1|425&area=FLTCenterColumn|0|1|ItinList|4|Meta_ItineraryPrice&resultsServlet=CheapFlightsSearchResults&handoffPlatform=desktop&impressionId=&totalPricePerPassenger=85.18"
                },
                {
                    "purchaseLinkId": "Kayak|1|426",
                    "providerId": "Booking.com",
                    "partnerSuppliedProvider": {
                        "id": "BOOKINGFLIGHTS",
                        "displayName": "Booking.com",
                        "logoUrl": "https://content.r9cdn.net/rimg/provider-logos/airlines/h/BOOKINGFLIGHTS.png?crop=false&width=166&height=62&fallback=default3.png&_v=1233faf051a0a6b9d9807846b1316f74"
                    },
                    "commerceName": "KayakFlightsMeta",
                    "currency": "USD",
                    "originalCurrency": "USD",
                    "seatAvailability": 0,
                    "taxesAndFees": 0,
                    "taxesAndFeesPerPassenger": 0,
                    "totalPrice": 85.18,
                    "totalPricePerPassenger": 85.18,
                    "fareBasisCodes": [],
                    "containedPurchaseLinks": [],
                    "partnerData": {},
                    "isPaid": false,
                    "fareAttributesList": [],
                    "url": "https://www.tripadvisor.com/CheapFlightsPartnerHandoff?searchHash=e7698b48f958e32740578c0fb9df4e5d&provider=Kayak|1|426&area=FLTCenterColumn|0|1|ItinList|4|Meta_ItineraryPrice&resultsServlet=CheapFlightsSearchResults&handoffPlatform=desktop&impressionId=&totalPricePerPassenger=85.18"
                },
                {
                    "purchaseLinkId": "Kayak|1|428",
                    "providerId": "Priceline",
                    "partnerSuppliedProvider": {
                        "id": "PRICELINEFLIGHTS",
                        "displayName": "Priceline",
                        "logoUrl": "https://content.r9cdn.net/rimg/provider-logos/airlines/h/PRICELINEFLIGHTS.png?crop=false&width=166&height=62&fallback=default3.png&_v=b3e81884c7678f954cce1ed2c441273a"
                    },
                    "commerceName": "KayakFlightsMeta",
                    "currency": "USD",
                    "originalCurrency": "USD",
                    "seatAvailability": 0,
                    "taxesAndFees": 0,
                    "taxesAndFeesPerPassenger": 0,
                    "totalPrice": 86.18,
                    "totalPricePerPassenger": 86.18,
                    "fareBasisCodes": [],
                    "containedPurchaseLinks": [],
                    "partnerData": {},
                    "isPaid": false,
                    "fareAttributesList": [],
                    "url": "https://www.tripadvisor.com/CheapFlightsPartnerHandoff?searchHash=e7698b48f958e32740578c0fb9df4e5d&provider=Kayak|1|428&area=FLTCenterColumn|0|1|ItinList|4|Meta_ItineraryPrice&resultsServlet=CheapFlightsSearchResults&handoffPlatform=desktop&impressionId=&totalPricePerPassenger=86.18"
                },
                {
                    "purchaseLinkId": "Kayak|1|429",
                    "providerId": "Trip.com",
                    "partnerSuppliedProvider": {
                        "id": "CTRIPAIR",
                        "displayName": "Trip.com",
                        "logoUrl": "https://content.r9cdn.net/rimg/provider-logos/airlines/h/CTRIPAIR.png?crop=false&width=166&height=62&fallback=default1.png&_v=6ffbb6778ab7d3ee8da1e965010b225e"
                    },
                    "commerceName": "KayakFlightsMeta",
                    "currency": "USD",
                    "originalCurrency": "USD",
                    "seatAvailability": 0,
                    "taxesAndFees": 0,
                    "taxesAndFeesPerPassenger": 0,
                    "totalPrice": 87,
                    "totalPricePerPassenger": 87,
                    "fareBasisCodes": [],
                    "containedPurchaseLinks": [],
                    "partnerData": {},
                    "isPaid": false,
                    "fareAttributesList": [],
                    "url": "https://www.tripadvisor.com/CheapFlightsPartnerHandoff?searchHash=e7698b48f958e32740578c0fb9df4e5d&provider=Kayak|1|429&area=FLTCenterColumn|0|1|ItinList|4|Meta_ItineraryPrice&resultsServlet=CheapFlightsSearchResults&handoffPlatform=desktop&impressionId=&totalPricePerPassenger=87"
                }
            ]
        },
        {
            "segments": [
                {
                    "legs": [
                        {
                            "originStationCode": "ORD",
                            "isDifferentOriginStation": false,
                            "destinationStationCode": "LAS",
                            "isDifferentDestinationStation": false,
                            "departureDateTime": "2023-10-31T15:38:00-05:00",
                            "arrivalDateTime": "2023-10-31T17:40:00-07:00",
                            "classOfService": "ECONOMY",
                            "marketingCarrierCode": "NK",
                            "operatingCarrierCode": "NK",
                            "equipmentId": "Airbus A320 (sharklets)",
                            "amenities": [],
                            "flightNumber": 759,
                            "seatGuruEquipmentId": 0,
                            "seatGuruAirlineUrl": "",
                            "numStops": 0,
                            "distanceInKM": 2433.845,
                            "isInternational": false,
                            "selfTransfer": false,
                            "operatingCarrier": {
                                "locationId": 8729157,
                                "code": "NK",
                                "logoUrl": "https://static.tacdn.com/img2/flights/airlines/logos/100x100/Spirit_Logo_Updated_1.jpg",
                                "displayName": "Spirit"
                            },
                            "marketingCarrier": {
                                "locationId": 8729157,
                                "code": "NK",
                                "logoUrl": "https://static.tacdn.com/img2/flights/airlines/logos/100x100/Spirit_Logo_Updated_1.jpg",
                                "displayName": "Spirit"
                            }
                        },
                        {
                            "originStationCode": "LAS",
                            "isDifferentOriginStation": false,
                            "destinationStationCode": "LAX",
                            "isDifferentDestinationStation": false,
                            "departureDateTime": "2023-10-31T21:25:00-07:00",
                            "arrivalDateTime": "2023-10-31T22:47:00-07:00",
                            "classOfService": "ECONOMY",
                            "marketingCarrierCode": "NK",
                            "operatingCarrierCode": "NK",
                            "equipmentId": "Airbus A320neo",
                            "amenities": [],
                            "flightNumber": 194,
                            "seatGuruEquipmentId": 0,
                            "seatGuruAirlineUrl": "",
                            "numStops": 0,
                            "distanceInKM": 380.6632,
                            "isInternational": false,
                            "selfTransfer": true,
                            "operatingCarrier": {
                                "locationId": 8729157,
                                "code": "NK",
                                "logoUrl": "https://static.tacdn.com/img2/flights/airlines/logos/100x100/Spirit_Logo_Updated_1.jpg",
                                "displayName": "Spirit"
                            },
                            "marketingCarrier": {
                                "locationId": 8729157,
                                "code": "NK",
                                "logoUrl": "https://static.tacdn.com/img2/flights/airlines/logos/100x100/Spirit_Logo_Updated_1.jpg",
                                "displayName": "Spirit"
                            }
                        }
                    ],
                    "layovers": [
                        {
                            "durationType": "LONG",
                            "hasStationChange": false,
                            "durationInMinutes": 225
                        }
                    ]
                }
            ],
            "purchaseLinks": [
                {
                    "purchaseLinkId": "Kayak|1|831",
                    "providerId": "mytrip.com",
                    "partnerSuppliedProvider": {
                        "id": "AIRTICKETS24DOTCOMVI",
                        "displayName": "mytrip.com",
                        "logoUrl": "https://content.r9cdn.net/rimg/provider-logos/airlines/h/AIRTICKETS24DOTCOM.png?crop=false&width=166&height=62&fallback=default1.png&_v=1e84439f35e4558f94e874158f6a3eae"
                    },
                    "commerceName": "KayakFlightsMeta",
                    "currency": "USD",
                    "originalCurrency": "USD",
                    "seatAvailability": 0,
                    "taxesAndFees": 0,
                    "taxesAndFeesPerPassenger": 0,
                    "totalPrice": 77.78,
                    "totalPricePerPassenger": 77.78,
                    "fareBasisCodes": [],
                    "containedPurchaseLinks": [],
                    "partnerData": {},
                    "isPaid": false,
                    "fareAttributesList": [],
                    "url": "https://www.tripadvisor.com/CheapFlightsPartnerHandoff?searchHash=e7698b48f958e32740578c0fb9df4e5d&provider=Kayak|1|831&area=FLTCenterColumn|0|1|ItinList|6|Meta_ItineraryPrice&resultsServlet=CheapFlightsSearchResults&handoffPlatform=desktop&impressionId=&totalPricePerPassenger=77.78"
                },
                {
                    "purchaseLinkId": "Kayak|1|832",
                    "providerId": "eDreams",
                    "partnerSuppliedProvider": {
                        "id": "EDREAMSAIR",
                        "displayName": "eDreams",
                        "logoUrl": "https://content.r9cdn.net/rimg/provider-logos/airlines/h/EDREAMSAIR.us.png?crop=false&width=166&height=62&fallback=default2.png&_v=af0479a857c0eb142b1531d305bbf971"
                    },
                    "commerceName": "KayakFlightsMeta",
                    "currency": "USD",
                    "originalCurrency": "USD",
                    "seatAvailability": 0,
                    "taxesAndFees": 0,
                    "taxesAndFeesPerPassenger": 0,
                    "totalPrice": 79.66,
                    "totalPricePerPassenger": 79.66,
                    "fareBasisCodes": [],
                    "containedPurchaseLinks": [],
                    "partnerData": {},
                    "isPaid": false,
                    "fareAttributesList": [],
                    "url": "https://www.tripadvisor.com/CheapFlightsPartnerHandoff?searchHash=e7698b48f958e32740578c0fb9df4e5d&provider=Kayak|1|832&area=FLTCenterColumn|0|1|ItinList|6|Meta_ItineraryPrice&resultsServlet=CheapFlightsSearchResults&handoffPlatform=desktop&impressionId=&totalPricePerPassenger=79.66"
                },
                {
                    "purchaseLinkId": "Kayak|1|833",
                    "providerId": "Spirit Airlines",
                    "partnerSuppliedProvider": {
                        "id": "NK",
                        "displayName": "Spirit Airlines",
                        "logoUrl": "https://content.r9cdn.net/rimg/provider-logos/airlines/h/NK.png?crop=false&width=166&height=62&fallback=default1.png&_v=2ec6f00d181725322e6a0f66550c2c23"
                    },
                    "commerceName": "KayakFlightsMeta",
                    "currency": "USD",
                    "originalCurrency": "USD",
                    "seatAvailability": 0,
                    "taxesAndFees": 0,
                    "taxesAndFeesPerPassenger": 0,
                    "totalPrice": 82.19,
                    "totalPricePerPassenger": 82.19,
                    "fareBasisCodes": [],
                    "containedPurchaseLinks": [],
                    "fareBranding": {
                        "brandId": "Economy",
                        "carrierCode": "NK"
                    },
                    "partnerData": {},
                    "isPaid": false,
                    "fareAttributesList": [
                        {
                            "carryonAllowed": true,
                            "carryonFeeObj": {
                                "feeType": "PRESENT",
                                "feeValue": -1
                            },
                            "freeCheckedBagAllowance": 0,
                            "firstCheckedBagFee": -1,
                            "secondCheckedBagFee": -1,
                            "seatSelectionAllowed": true,
                            "seatSelectionFeeObj": {
                                "feeType": "PRESENT",
                                "feeValue": -1
                            },
                            "ticketChangeAllowed": true,
                            "ticketChangeFeeObj": {
                                "feeType": "PRESENT",
                                "feeValue": -1
                            },
                            "segmentIndices": [
                                0
                            ]
                        }
                    ],
                    "url": "https://www.tripadvisor.com/CheapFlightsPartnerHandoff?searchHash=e7698b48f958e32740578c0fb9df4e5d&provider=Kayak|1|833&area=FLTCenterColumn|0|1|ItinList|6|Meta_ItineraryPrice&resultsServlet=CheapFlightsSearchResults&handoffPlatform=desktop&impressionId=&totalPricePerPassenger=82.19"
                },
                {
                    "purchaseLinkId": "Kayak|1|834",
                    "providerId": "Gotogate",
                    "partnerSuppliedProvider": {
                        "id": "GOTOGATE",
                        "displayName": "Gotogate",
                        "logoUrl": "https://content.r9cdn.net/rimg/provider-logos/airlines/h/GOTOGATE.png?crop=false&width=166&height=62&fallback=default3.png&_v=a29de71af6666a1a11e42eb0b5f7f84a"
                    },
                    "commerceName": "KayakFlightsMeta",
                    "currency": "USD",
                    "originalCurrency": "USD",
                    "seatAvailability": 0,
                    "taxesAndFees": 0,
                    "taxesAndFeesPerPassenger": 0,
                    "totalPrice": 85.18,
                    "totalPricePerPassenger": 85.18,
                    "fareBasisCodes": [],
                    "containedPurchaseLinks": [],
                    "partnerData": {},
                    "isPaid": false,
                    "fareAttributesList": [],
                    "url": "https://www.tripadvisor.com/CheapFlightsPartnerHandoff?searchHash=e7698b48f958e32740578c0fb9df4e5d&provider=Kayak|1|834&area=FLTCenterColumn|0|1|ItinList|6|Meta_ItineraryPrice&resultsServlet=CheapFlightsSearchResults&handoffPlatform=desktop&impressionId=&totalPricePerPassenger=85.18"
                },
                {
                    "purchaseLinkId": "Kayak|1|835",
                    "providerId": "Booking.com",
                    "partnerSuppliedProvider": {
                        "id": "BOOKINGFLIGHTS",
                        "displayName": "Booking.com",
                        "logoUrl": "https://content.r9cdn.net/rimg/provider-logos/airlines/h/BOOKINGFLIGHTS.png?crop=false&width=166&height=62&fallback=default3.png&_v=1233faf051a0a6b9d9807846b1316f74"
                    },
                    "commerceName": "KayakFlightsMeta",
                    "currency": "USD",
                    "originalCurrency": "USD",
                    "seatAvailability": 0,
                    "taxesAndFees": 0,
                    "taxesAndFeesPerPassenger": 0,
                    "totalPrice": 85.18,
                    "totalPricePerPassenger": 85.18,
                    "fareBasisCodes": [],
                    "containedPurchaseLinks": [],
                    "partnerData": {},
                    "isPaid": false,
                    "fareAttributesList": [],
                    "url": "https://www.tripadvisor.com/CheapFlightsPartnerHandoff?searchHash=e7698b48f958e32740578c0fb9df4e5d&provider=Kayak|1|835&area=FLTCenterColumn|0|1|ItinList|6|Meta_ItineraryPrice&resultsServlet=CheapFlightsSearchResults&handoffPlatform=desktop&impressionId=&totalPricePerPassenger=85.18"
                },
                {
                    "purchaseLinkId": "Kayak|1|836",
                    "providerId": "CheapOair",
                    "partnerSuppliedProvider": {
                        "id": "CHEAPOAIR",
                        "displayName": "CheapOair",
                        "logoUrl": "https://content.r9cdn.net/rimg/provider-logos/airlines/h/CHEAPOAIR.png?crop=false&width=166&height=62&fallback=default2.png&_v=5eb11191c415b271717e37aa9870f06f"
                    },
                    "commerceName": "KayakFlightsMeta",
                    "currency": "USD",
                    "originalCurrency": "USD",
                    "seatAvailability": 0,
                    "taxesAndFees": 0,
                    "taxesAndFeesPerPassenger": 0,
                    "totalPrice": 85.18,
                    "totalPricePerPassenger": 85.18,
                    "fareBasisCodes": [],
                    "containedPurchaseLinks": [],
                    "partnerData": {},
                    "isPaid": false,
                    "fareAttributesList": [],
                    "url": "https://www.tripadvisor.com/CheapFlightsPartnerHandoff?searchHash=e7698b48f958e32740578c0fb9df4e5d&provider=Kayak|1|836&area=FLTCenterColumn|0|1|ItinList|6|Meta_ItineraryPrice&resultsServlet=CheapFlightsSearchResults&handoffPlatform=desktop&impressionId=&totalPricePerPassenger=85.18"
                },
                {
                    "purchaseLinkId": "Kayak|1|837",
                    "providerId": "Priceline",
                    "partnerSuppliedProvider": {
                        "id": "PRICELINEFLIGHTS",
                        "displayName": "Priceline",
                        "logoUrl": "https://content.r9cdn.net/rimg/provider-logos/airlines/h/PRICELINEFLIGHTS.png?crop=false&width=166&height=62&fallback=default3.png&_v=b3e81884c7678f954cce1ed2c441273a"
                    },
                    "commerceName": "KayakFlightsMeta",
                    "currency": "USD",
                    "originalCurrency": "USD",
                    "seatAvailability": 0,
                    "taxesAndFees": 0,
                    "taxesAndFeesPerPassenger": 0,
                    "totalPrice": 86.18,
                    "totalPricePerPassenger": 86.18,
                    "fareBasisCodes": [],
                    "containedPurchaseLinks": [],
                    "partnerData": {},
                    "isPaid": false,
                    "fareAttributesList": [],
                    "url": "https://www.tripadvisor.com/CheapFlightsPartnerHandoff?searchHash=e7698b48f958e32740578c0fb9df4e5d&provider=Kayak|1|837&area=FLTCenterColumn|0|1|ItinList|6|Meta_ItineraryPrice&resultsServlet=CheapFlightsSearchResults&handoffPlatform=desktop&impressionId=&totalPricePerPassenger=86.18"
                },
                {
                    "purchaseLinkId": "Kayak|1|838",
                    "providerId": "Trip.com",
                    "partnerSuppliedProvider": {
                        "id": "CTRIPAIR",
                        "displayName": "Trip.com",
                        "logoUrl": "https://content.r9cdn.net/rimg/provider-logos/airlines/h/CTRIPAIR.png?crop=false&width=166&height=62&fallback=default1.png&_v=6ffbb6778ab7d3ee8da1e965010b225e"
                    },
                    "commerceName": "KayakFlightsMeta",
                    "currency": "USD",
                    "originalCurrency": "USD",
                    "seatAvailability": 0,
                    "taxesAndFees": 0,
                    "taxesAndFeesPerPassenger": 0,
                    "totalPrice": 87,
                    "totalPricePerPassenger": 87,
                    "fareBasisCodes": [],
                    "containedPurchaseLinks": [],
                    "partnerData": {},
                    "isPaid": false,
                    "fareAttributesList": [],
                    "url": "https://www.tripadvisor.com/CheapFlightsPartnerHandoff?searchHash=e7698b48f958e32740578c0fb9df4e5d&provider=Kayak|1|838&area=FLTCenterColumn|0|1|ItinList|6|Meta_ItineraryPrice&resultsServlet=CheapFlightsSearchResults&handoffPlatform=desktop&impressionId=&totalPricePerPassenger=87"
                },
                {
                    "purchaseLinkId": "Kayak|1|839",
                    "providerId": "Kiwi.com",
                    "partnerSuppliedProvider": {
                        "id": "KIWIVI",
                        "displayName": "Kiwi.com",
                        "logoUrl": "https://content.r9cdn.net/rimg/provider-logos/airlines/h/SKYPICKER.png?crop=false&width=166&height=62&fallback=default3.png&_v=0cd3e94b7e8a5f027bff27942a213709"
                    },
                    "commerceName": "KayakFlightsMeta",
                    "currency": "USD",
                    "originalCurrency": "USD",
                    "seatAvailability": 0,
                    "taxesAndFees": 0,
                    "taxesAndFeesPerPassenger": 0,
                    "totalPrice": 90,
                    "totalPricePerPassenger": 90,
                    "fareBasisCodes": [],
                    "containedPurchaseLinks": [],
                    "partnerData": {},
                    "isPaid": false,
                    "fareAttributesList": [],
                    "url": "https://www.tripadvisor.com/CheapFlightsPartnerHandoff?searchHash=e7698b48f958e32740578c0fb9df4e5d&provider=Kayak|1|839&area=FLTCenterColumn|0|1|ItinList|6|Meta_ItineraryPrice&resultsServlet=CheapFlightsSearchResults&handoffPlatform=desktop&impressionId=&totalPricePerPassenger=90"
                }
            ]
        },
        {
            "segments": [
                {
                    "legs": [
                        {
                            "originStationCode": "ORD",
                            "isDifferentOriginStation": false,
                            "destinationStationCode": "LAS",
                            "isDifferentDestinationStation": false,
                            "departureDateTime": "2023-10-31T10:19:00-05:00",
                            "arrivalDateTime": "2023-10-31T12:18:00-07:00",
                            "classOfService": "ECONOMY",
                            "marketingCarrierCode": "NK",
                            "operatingCarrierCode": "NK",
                            "equipmentId": "Airbus A320neo",
                            "amenities": [],
                            "flightNumber": 183,
                            "seatGuruEquipmentId": 0,
                            "seatGuruAirlineUrl": "",
                            "numStops": 0,
                            "distanceInKM": 2433.845,
                            "isInternational": false,
                            "selfTransfer": false,
                            "operatingCarrier": {
                                "locationId": 8729157,
                                "code": "NK",
                                "logoUrl": "https://static.tacdn.com/img2/flights/airlines/logos/100x100/Spirit_Logo_Updated_1.jpg",
                                "displayName": "Spirit"
                            },
                            "marketingCarrier": {
                                "locationId": 8729157,
                                "code": "NK",
                                "logoUrl": "https://static.tacdn.com/img2/flights/airlines/logos/100x100/Spirit_Logo_Updated_1.jpg",
                                "displayName": "Spirit"
                            }
                        },
                        {
                            "originStationCode": "LAS",
                            "isDifferentOriginStation": false,
                            "destinationStationCode": "LAX",
                            "isDifferentDestinationStation": false,
                            "departureDateTime": "2023-10-31T17:37:00-07:00",
                            "arrivalDateTime": "2023-10-31T18:57:00-07:00",
                            "classOfService": "ECONOMY",
                            "marketingCarrierCode": "NK",
                            "operatingCarrierCode": "NK",
                            "equipmentId": "Airbus A320 (sharklets)",
                            "amenities": [],
                            "flightNumber": 2698,
                            "seatGuruEquipmentId": 0,
                            "seatGuruAirlineUrl": "",
                            "numStops": 0,
                            "distanceInKM": 380.6632,
                            "isInternational": false,
                            "selfTransfer": true,
                            "operatingCarrier": {
                                "locationId": 8729157,
                                "code": "NK",
                                "logoUrl": "https://static.tacdn.com/img2/flights/airlines/logos/100x100/Spirit_Logo_Updated_1.jpg",
                                "displayName": "Spirit"
                            },
                            "marketingCarrier": {
                                "locationId": 8729157,
                                "code": "NK",
                                "logoUrl": "https://static.tacdn.com/img2/flights/airlines/logos/100x100/Spirit_Logo_Updated_1.jpg",
                                "displayName": "Spirit"
                            }
                        }
                    ],
                    "layovers": [
                        {
                            "durationType": "LONG",
                            "hasStationChange": false,
                            "durationInMinutes": 319
                        }
                    ]
                }
            ],
            "purchaseLinks": [
                {
                    "purchaseLinkId": "Kayak|1|813",
                    "providerId": "mytrip.com",
                    "partnerSuppliedProvider": {
                        "id": "AIRTICKETS24DOTCOMVI",
                        "displayName": "mytrip.com",
                        "logoUrl": "https://content.r9cdn.net/rimg/provider-logos/airlines/h/AIRTICKETS24DOTCOM.png?crop=false&width=166&height=62&fallback=default1.png&_v=1e84439f35e4558f94e874158f6a3eae"
                    },
                    "commerceName": "KayakFlightsMeta",
                    "currency": "USD",
                    "originalCurrency": "USD",
                    "seatAvailability": 0,
                    "taxesAndFees": 0,
                    "taxesAndFeesPerPassenger": 0,
                    "totalPrice": 77.78,
                    "totalPricePerPassenger": 77.78,
                    "fareBasisCodes": [],
                    "containedPurchaseLinks": [],
                    "partnerData": {},
                    "isPaid": false,
                    "fareAttributesList": [],
                    "url": "https://www.tripadvisor.com/CheapFlightsPartnerHandoff?searchHash=e7698b48f958e32740578c0fb9df4e5d&provider=Kayak|1|813&area=FLTCenterColumn|0|1|ItinList|7|Meta_ItineraryPrice&resultsServlet=CheapFlightsSearchResults&handoffPlatform=desktop&impressionId=&totalPricePerPassenger=77.78"
                },
                {
                    "purchaseLinkId": "Kayak|1|814",
                    "providerId": "eDreams",
                    "partnerSuppliedProvider": {
                        "id": "EDREAMSAIR",
                        "displayName": "eDreams",
                        "logoUrl": "https://content.r9cdn.net/rimg/provider-logos/airlines/h/EDREAMSAIR.us.png?crop=false&width=166&height=62&fallback=default2.png&_v=af0479a857c0eb142b1531d305bbf971"
                    },
                    "commerceName": "KayakFlightsMeta",
                    "currency": "USD",
                    "originalCurrency": "USD",
                    "seatAvailability": 0,
                    "taxesAndFees": 0,
                    "taxesAndFeesPerPassenger": 0,
                    "totalPrice": 79.66,
                    "totalPricePerPassenger": 79.66,
                    "fareBasisCodes": [],
                    "containedPurchaseLinks": [],
                    "partnerData": {},
                    "isPaid": false,
                    "fareAttributesList": [],
                    "url": "https://www.tripadvisor.com/CheapFlightsPartnerHandoff?searchHash=e7698b48f958e32740578c0fb9df4e5d&provider=Kayak|1|814&area=FLTCenterColumn|0|1|ItinList|7|Meta_ItineraryPrice&resultsServlet=CheapFlightsSearchResults&handoffPlatform=desktop&impressionId=&totalPricePerPassenger=79.66"
                },
                {
                    "purchaseLinkId": "Kayak|1|817",
                    "providerId": "Booking.com",
                    "partnerSuppliedProvider": {
                        "id": "BOOKINGFLIGHTS",
                        "displayName": "Booking.com",
                        "logoUrl": "https://content.r9cdn.net/rimg/provider-logos/airlines/h/BOOKINGFLIGHTS.png?crop=false&width=166&height=62&fallback=default3.png&_v=1233faf051a0a6b9d9807846b1316f74"
                    },
                    "commerceName": "KayakFlightsMeta",
                    "currency": "USD",
                    "originalCurrency": "USD",
                    "seatAvailability": 0,
                    "taxesAndFees": 0,
                    "taxesAndFeesPerPassenger": 0,
                    "totalPrice": 85.18,
                    "totalPricePerPassenger": 85.18,
                    "fareBasisCodes": [],
                    "containedPurchaseLinks": [],
                    "partnerData": {},
                    "isPaid": false,
                    "fareAttributesList": [],
                    "url": "https://www.tripadvisor.com/CheapFlightsPartnerHandoff?searchHash=e7698b48f958e32740578c0fb9df4e5d&provider=Kayak|1|817&area=FLTCenterColumn|0|1|ItinList|7|Meta_ItineraryPrice&resultsServlet=CheapFlightsSearchResults&handoffPlatform=desktop&impressionId=&totalPricePerPassenger=85.18"
                },
                {
                    "purchaseLinkId": "Kayak|1|816",
                    "providerId": "Gotogate",
                    "partnerSuppliedProvider": {
                        "id": "GOTOGATE",
                        "displayName": "Gotogate",
                        "logoUrl": "https://content.r9cdn.net/rimg/provider-logos/airlines/h/GOTOGATE.png?crop=false&width=166&height=62&fallback=default3.png&_v=a29de71af6666a1a11e42eb0b5f7f84a"
                    },
                    "commerceName": "KayakFlightsMeta",
                    "currency": "USD",
                    "originalCurrency": "USD",
                    "seatAvailability": 0,
                    "taxesAndFees": 0,
                    "taxesAndFeesPerPassenger": 0,
                    "totalPrice": 85.18,
                    "totalPricePerPassenger": 85.18,
                    "fareBasisCodes": [],
                    "containedPurchaseLinks": [],
                    "partnerData": {},
                    "isPaid": false,
                    "fareAttributesList": [],
                    "url": "https://www.tripadvisor.com/CheapFlightsPartnerHandoff?searchHash=e7698b48f958e32740578c0fb9df4e5d&provider=Kayak|1|816&area=FLTCenterColumn|0|1|ItinList|7|Meta_ItineraryPrice&resultsServlet=CheapFlightsSearchResults&handoffPlatform=desktop&impressionId=&totalPricePerPassenger=85.18"
                },
                {
                    "purchaseLinkId": "Kayak|1|815",
                    "providerId": "CheapOair",
                    "partnerSuppliedProvider": {
                        "id": "CHEAPOAIR",
                        "displayName": "CheapOair",
                        "logoUrl": "https://content.r9cdn.net/rimg/provider-logos/airlines/h/CHEAPOAIR.png?crop=false&width=166&height=62&fallback=default2.png&_v=5eb11191c415b271717e37aa9870f06f"
                    },
                    "commerceName": "KayakFlightsMeta",
                    "currency": "USD",
                    "originalCurrency": "USD",
                    "seatAvailability": 0,
                    "taxesAndFees": 0,
                    "taxesAndFeesPerPassenger": 0,
                    "totalPrice": 85.18,
                    "totalPricePerPassenger": 85.18,
                    "fareBasisCodes": [],
                    "containedPurchaseLinks": [],
                    "partnerData": {},
                    "isPaid": false,
                    "fareAttributesList": [],
                    "url": "https://www.tripadvisor.com/CheapFlightsPartnerHandoff?searchHash=e7698b48f958e32740578c0fb9df4e5d&provider=Kayak|1|815&area=FLTCenterColumn|0|1|ItinList|7|Meta_ItineraryPrice&resultsServlet=CheapFlightsSearchResults&handoffPlatform=desktop&impressionId=&totalPricePerPassenger=85.18"
                },
                {
                    "purchaseLinkId": "Kayak|1|818",
                    "providerId": "Priceline",
                    "partnerSuppliedProvider": {
                        "id": "PRICELINEFLIGHTS",
                        "displayName": "Priceline",
                        "logoUrl": "https://content.r9cdn.net/rimg/provider-logos/airlines/h/PRICELINEFLIGHTS.png?crop=false&width=166&height=62&fallback=default3.png&_v=b3e81884c7678f954cce1ed2c441273a"
                    },
                    "commerceName": "KayakFlightsMeta",
                    "currency": "USD",
                    "originalCurrency": "USD",
                    "seatAvailability": 0,
                    "taxesAndFees": 0,
                    "taxesAndFeesPerPassenger": 0,
                    "totalPrice": 86.18,
                    "totalPricePerPassenger": 86.18,
                    "fareBasisCodes": [],
                    "containedPurchaseLinks": [],
                    "partnerData": {},
                    "isPaid": false,
                    "fareAttributesList": [],
                    "url": "https://www.tripadvisor.com/CheapFlightsPartnerHandoff?searchHash=e7698b48f958e32740578c0fb9df4e5d&provider=Kayak|1|818&area=FLTCenterColumn|0|1|ItinList|7|Meta_ItineraryPrice&resultsServlet=CheapFlightsSearchResults&handoffPlatform=desktop&impressionId=&totalPricePerPassenger=86.18"
                },
                {
                    "purchaseLinkId": "Kayak|1|819",
                    "providerId": "Trip.com",
                    "partnerSuppliedProvider": {
                        "id": "CTRIPAIR",
                        "displayName": "Trip.com",
                        "logoUrl": "https://content.r9cdn.net/rimg/provider-logos/airlines/h/CTRIPAIR.png?crop=false&width=166&height=62&fallback=default1.png&_v=6ffbb6778ab7d3ee8da1e965010b225e"
                    },
                    "commerceName": "KayakFlightsMeta",
                    "currency": "USD",
                    "originalCurrency": "USD",
                    "seatAvailability": 0,
                    "taxesAndFees": 0,
                    "taxesAndFeesPerPassenger": 0,
                    "totalPrice": 87,
                    "totalPricePerPassenger": 87,
                    "fareBasisCodes": [],
                    "containedPurchaseLinks": [],
                    "partnerData": {},
                    "isPaid": false,
                    "fareAttributesList": [],
                    "url": "https://www.tripadvisor.com/CheapFlightsPartnerHandoff?searchHash=e7698b48f958e32740578c0fb9df4e5d&provider=Kayak|1|819&area=FLTCenterColumn|0|1|ItinList|7|Meta_ItineraryPrice&resultsServlet=CheapFlightsSearchResults&handoffPlatform=desktop&impressionId=&totalPricePerPassenger=87"
                },
                {
                    "purchaseLinkId": "Kayak|1|820",
                    "providerId": "Spirit Airlines",
                    "partnerSuppliedProvider": {
                        "id": "NK",
                        "displayName": "Spirit Airlines",
                        "logoUrl": "https://content.r9cdn.net/rimg/provider-logos/airlines/h/NK.png?crop=false&width=166&height=62&fallback=default1.png&_v=2ec6f00d181725322e6a0f66550c2c23"
                    },
                    "commerceName": "KayakFlightsMeta",
                    "currency": "USD",
                    "originalCurrency": "USD",
                    "seatAvailability": 0,
                    "taxesAndFees": 0,
                    "taxesAndFeesPerPassenger": 0,
                    "totalPrice": 87.79,
                    "totalPricePerPassenger": 87.79,
                    "fareBasisCodes": [],
                    "containedPurchaseLinks": [],
                    "fareBranding": {
                        "brandId": "Economy",
                        "carrierCode": "NK"
                    },
                    "partnerData": {},
                    "isPaid": false,
                    "fareAttributesList": [
                        {
                            "carryonAllowed": true,
                            "carryonFeeObj": {
                                "feeType": "PRESENT",
                                "feeValue": -1
                            },
                            "freeCheckedBagAllowance": 0,
                            "firstCheckedBagFee": -1,
                            "secondCheckedBagFee": -1,
                            "seatSelectionAllowed": true,
                            "seatSelectionFeeObj": {
                                "feeType": "PRESENT",
                                "feeValue": -1
                            },
                            "ticketChangeAllowed": true,
                            "ticketChangeFeeObj": {
                                "feeType": "PRESENT",
                                "feeValue": -1
                            },
                            "segmentIndices": [
                                0
                            ]
                        }
                    ],
                    "url": "https://www.tripadvisor.com/CheapFlightsPartnerHandoff?searchHash=e7698b48f958e32740578c0fb9df4e5d&provider=Kayak|1|820&area=FLTCenterColumn|0|1|ItinList|7|Meta_ItineraryPrice&resultsServlet=CheapFlightsSearchResults&handoffPlatform=desktop&impressionId=&totalPricePerPassenger=87.79"
                },
                {
                    "purchaseLinkId": "Kayak|1|821",
                    "providerId": "Kiwi.com",
                    "partnerSuppliedProvider": {
                        "id": "KIWIVI",
                        "displayName": "Kiwi.com",
                        "logoUrl": "https://content.r9cdn.net/rimg/provider-logos/airlines/h/SKYPICKER.png?crop=false&width=166&height=62&fallback=default3.png&_v=0cd3e94b7e8a5f027bff27942a213709"
                    },
                    "commerceName": "KayakFlightsMeta",
                    "currency": "USD",
                    "originalCurrency": "USD",
                    "seatAvailability": 0,
                    "taxesAndFees": 0,
                    "taxesAndFeesPerPassenger": 0,
                    "totalPrice": 90,
                    "totalPricePerPassenger": 90,
                    "fareBasisCodes": [],
                    "containedPurchaseLinks": [],
                    "partnerData": {},
                    "isPaid": false,
                    "fareAttributesList": [],
                    "url": "https://www.tripadvisor.com/CheapFlightsPartnerHandoff?searchHash=e7698b48f958e32740578c0fb9df4e5d&provider=Kayak|1|821&area=FLTCenterColumn|0|1|ItinList|7|Meta_ItineraryPrice&resultsServlet=CheapFlightsSearchResults&handoffPlatform=desktop&impressionId=&totalPricePerPassenger=90"
                },
                {
                    "purchaseLinkId": "Kayak|1|822",
                    "providerId": "BudgetAir",
                    "partnerSuppliedProvider": {
                        "id": "BUDGETAIR",
                        "displayName": "BudgetAir",
                        "logoUrl": "https://content.r9cdn.net/rimg/provider-logos/airlines/h/BUDGETAIR.png?crop=false&width=166&height=62&fallback=default1.png&_v=177104dc3b6ae3c8860d2024a287fa08"
                    },
                    "commerceName": "KayakFlightsMeta",
                    "currency": "USD",
                    "originalCurrency": "USD",
                    "seatAvailability": 0,
                    "taxesAndFees": 0,
                    "taxesAndFeesPerPassenger": 0,
                    "totalPrice": 114,
                    "totalPricePerPassenger": 114,
                    "fareBasisCodes": [],
                    "containedPurchaseLinks": [],
                    "partnerData": {},
                    "isPaid": false,
                    "fareAttributesList": [],
                    "url": "https://www.tripadvisor.com/CheapFlightsPartnerHandoff?searchHash=e7698b48f958e32740578c0fb9df4e5d&provider=Kayak|1|822&area=FLTCenterColumn|0|1|ItinList|7|Meta_ItineraryPrice&resultsServlet=CheapFlightsSearchResults&handoffPlatform=desktop&impressionId=&totalPricePerPassenger=114"
                }
            ]
        },
        {
            "segments": [
                {
                    "legs": [
                        {
                            "originStationCode": "ORD",
                            "isDifferentOriginStation": false,
                            "destinationStationCode": "LAS",
                            "isDifferentDestinationStation": false,
                            "departureDateTime": "2023-10-31T15:38:00-05:00",
                            "arrivalDateTime": "2023-10-31T17:40:00-07:00",
                            "classOfService": "ECONOMY",
                            "marketingCarrierCode": "NK",
                            "operatingCarrierCode": "NK",
                            "equipmentId": "Airbus A320 (sharklets)",
                            "amenities": [],
                            "flightNumber": 759,
                            "seatGuruEquipmentId": 0,
                            "seatGuruAirlineUrl": "",
                            "numStops": 0,
                            "distanceInKM": 2433.845,
                            "isInternational": false,
                            "selfTransfer": false,
                            "operatingCarrier": {
                                "locationId": 8729157,
                                "code": "NK",
                                "logoUrl": "https://static.tacdn.com/img2/flights/airlines/logos/100x100/Spirit_Logo_Updated_1.jpg",
                                "displayName": "Spirit"
                            },
                            "marketingCarrier": {
                                "locationId": 8729157,
                                "code": "NK",
                                "logoUrl": "https://static.tacdn.com/img2/flights/airlines/logos/100x100/Spirit_Logo_Updated_1.jpg",
                                "displayName": "Spirit"
                            }
                        },
                        {
                            "originStationCode": "LAS",
                            "isDifferentOriginStation": false,
                            "destinationStationCode": "LAX",
                            "isDifferentDestinationStation": false,
                            "departureDateTime": "2023-10-31T23:32:00-07:00",
                            "arrivalDateTime": "2023-11-01T00:55:00-07:00",
                            "classOfService": "ECONOMY",
                            "marketingCarrierCode": "NK",
                            "operatingCarrierCode": "NK",
                            "equipmentId": "Airbus A320neo",
                            "amenities": [],
                            "flightNumber": 2048,
                            "seatGuruEquipmentId": 0,
                            "seatGuruAirlineUrl": "",
                            "numStops": 0,
                            "distanceInKM": 380.6632,
                            "isInternational": false,
                            "selfTransfer": true,
                            "operatingCarrier": {
                                "locationId": 8729157,
                                "code": "NK",
                                "logoUrl": "https://static.tacdn.com/img2/flights/airlines/logos/100x100/Spirit_Logo_Updated_1.jpg",
                                "displayName": "Spirit"
                            },
                            "marketingCarrier": {
                                "locationId": 8729157,
                                "code": "NK",
                                "logoUrl": "https://static.tacdn.com/img2/flights/airlines/logos/100x100/Spirit_Logo_Updated_1.jpg",
                                "displayName": "Spirit"
                            }
                        }
                    ],
                    "layovers": [
                        {
                            "durationType": "LONG",
                            "hasStationChange": false,
                            "durationInMinutes": 352
                        }
                    ]
                }
            ],
            "purchaseLinks": [
                {
                    "purchaseLinkId": "Kayak|1|29",
                    "providerId": "mytrip.com",
                    "partnerSuppliedProvider": {
                        "id": "AIRTICKETS24DOTCOMVI",
                        "displayName": "mytrip.com",
                        "logoUrl": "https://content.r9cdn.net/rimg/provider-logos/airlines/h/AIRTICKETS24DOTCOM.png?crop=false&width=166&height=62&fallback=default1.png&_v=1e84439f35e4558f94e874158f6a3eae"
                    },
                    "commerceName": "KayakFlightsMeta",
                    "currency": "USD",
                    "originalCurrency": "USD",
                    "seatAvailability": 0,
                    "taxesAndFees": 0,
                    "taxesAndFeesPerPassenger": 0,
                    "totalPrice": 77.78,
                    "totalPricePerPassenger": 77.78,
                    "fareBasisCodes": [],
                    "containedPurchaseLinks": [],
                    "partnerData": {},
                    "isPaid": false,
                    "fareAttributesList": [],
                    "url": "https://www.tripadvisor.com/CheapFlightsPartnerHandoff?searchHash=e7698b48f958e32740578c0fb9df4e5d&provider=Kayak|1|29&area=FLTCenterColumn|0|1|ItinList|8|Meta_ItineraryPrice&resultsServlet=CheapFlightsSearchResults&handoffPlatform=desktop&impressionId=&totalPricePerPassenger=77.78"
                },
                {
                    "purchaseLinkId": "Kayak|1|30",
                    "providerId": "eDreams",
                    "partnerSuppliedProvider": {
                        "id": "EDREAMSAIR",
                        "displayName": "eDreams",
                        "logoUrl": "https://content.r9cdn.net/rimg/provider-logos/airlines/h/EDREAMSAIR.us.png?crop=false&width=166&height=62&fallback=default2.png&_v=af0479a857c0eb142b1531d305bbf971"
                    },
                    "commerceName": "KayakFlightsMeta",
                    "currency": "USD",
                    "originalCurrency": "USD",
                    "seatAvailability": 0,
                    "taxesAndFees": 0,
                    "taxesAndFeesPerPassenger": 0,
                    "totalPrice": 79.66,
                    "totalPricePerPassenger": 79.66,
                    "fareBasisCodes": [],
                    "containedPurchaseLinks": [],
                    "partnerData": {},
                    "isPaid": false,
                    "fareAttributesList": [],
                    "url": "https://www.tripadvisor.com/CheapFlightsPartnerHandoff?searchHash=e7698b48f958e32740578c0fb9df4e5d&provider=Kayak|1|30&area=FLTCenterColumn|0|1|ItinList|8|Meta_ItineraryPrice&resultsServlet=CheapFlightsSearchResults&handoffPlatform=desktop&impressionId=&totalPricePerPassenger=79.66"
                },
                {
                    "purchaseLinkId": "Kayak|1|31",
                    "providerId": "Booking.com",
                    "partnerSuppliedProvider": {
                        "id": "BOOKINGFLIGHTS",
                        "displayName": "Booking.com",
                        "logoUrl": "https://content.r9cdn.net/rimg/provider-logos/airlines/h/BOOKINGFLIGHTS.png?crop=false&width=166&height=62&fallback=default3.png&_v=1233faf051a0a6b9d9807846b1316f74"
                    },
                    "commerceName": "KayakFlightsMeta",
                    "currency": "USD",
                    "originalCurrency": "USD",
                    "seatAvailability": 0,
                    "taxesAndFees": 0,
                    "taxesAndFeesPerPassenger": 0,
                    "totalPrice": 85.18,
                    "totalPricePerPassenger": 85.18,
                    "fareBasisCodes": [],
                    "containedPurchaseLinks": [],
                    "partnerData": {},
                    "isPaid": false,
                    "fareAttributesList": [],
                    "url": "https://www.tripadvisor.com/CheapFlightsPartnerHandoff?searchHash=e7698b48f958e32740578c0fb9df4e5d&provider=Kayak|1|31&area=FLTCenterColumn|0|1|ItinList|8|Meta_ItineraryPrice&resultsServlet=CheapFlightsSearchResults&handoffPlatform=desktop&impressionId=&totalPricePerPassenger=85.18"
                },
                {
                    "purchaseLinkId": "Kayak|1|32",
                    "providerId": "Gotogate",
                    "partnerSuppliedProvider": {
                        "id": "GOTOGATE",
                        "displayName": "Gotogate",
                        "logoUrl": "https://content.r9cdn.net/rimg/provider-logos/airlines/h/GOTOGATE.png?crop=false&width=166&height=62&fallback=default3.png&_v=a29de71af6666a1a11e42eb0b5f7f84a"
                    },
                    "commerceName": "KayakFlightsMeta",
                    "currency": "USD",
                    "originalCurrency": "USD",
                    "seatAvailability": 0,
                    "taxesAndFees": 0,
                    "taxesAndFeesPerPassenger": 0,
                    "totalPrice": 85.18,
                    "totalPricePerPassenger": 85.18,
                    "fareBasisCodes": [],
                    "containedPurchaseLinks": [],
                    "partnerData": {},
                    "isPaid": false,
                    "fareAttributesList": [],
                    "url": "https://www.tripadvisor.com/CheapFlightsPartnerHandoff?searchHash=e7698b48f958e32740578c0fb9df4e5d&provider=Kayak|1|32&area=FLTCenterColumn|0|1|ItinList|8|Meta_ItineraryPrice&resultsServlet=CheapFlightsSearchResults&handoffPlatform=desktop&impressionId=&totalPricePerPassenger=85.18"
                },
                {
                    "purchaseLinkId": "Kayak|1|33",
                    "providerId": "CheapOair",
                    "partnerSuppliedProvider": {
                        "id": "CHEAPOAIR",
                        "displayName": "CheapOair",
                        "logoUrl": "https://content.r9cdn.net/rimg/provider-logos/airlines/h/CHEAPOAIR.png?crop=false&width=166&height=62&fallback=default2.png&_v=5eb11191c415b271717e37aa9870f06f"
                    },
                    "commerceName": "KayakFlightsMeta",
                    "currency": "USD",
                    "originalCurrency": "USD",
                    "seatAvailability": 0,
                    "taxesAndFees": 0,
                    "taxesAndFeesPerPassenger": 0,
                    "totalPrice": 85.18,
                    "totalPricePerPassenger": 85.18,
                    "fareBasisCodes": [],
                    "containedPurchaseLinks": [],
                    "partnerData": {},
                    "isPaid": false,
                    "fareAttributesList": [],
                    "url": "https://www.tripadvisor.com/CheapFlightsPartnerHandoff?searchHash=e7698b48f958e32740578c0fb9df4e5d&provider=Kayak|1|33&area=FLTCenterColumn|0|1|ItinList|8|Meta_ItineraryPrice&resultsServlet=CheapFlightsSearchResults&handoffPlatform=desktop&impressionId=&totalPricePerPassenger=85.18"
                },
                {
                    "purchaseLinkId": "Kayak|1|34",
                    "providerId": "Priceline",
                    "partnerSuppliedProvider": {
                        "id": "PRICELINEFLIGHTS",
                        "displayName": "Priceline",
                        "logoUrl": "https://content.r9cdn.net/rimg/provider-logos/airlines/h/PRICELINEFLIGHTS.png?crop=false&width=166&height=62&fallback=default3.png&_v=b3e81884c7678f954cce1ed2c441273a"
                    },
                    "commerceName": "KayakFlightsMeta",
                    "currency": "USD",
                    "originalCurrency": "USD",
                    "seatAvailability": 0,
                    "taxesAndFees": 0,
                    "taxesAndFeesPerPassenger": 0,
                    "totalPrice": 86.18,
                    "totalPricePerPassenger": 86.18,
                    "fareBasisCodes": [],
                    "containedPurchaseLinks": [],
                    "partnerData": {},
                    "isPaid": false,
                    "fareAttributesList": [],
                    "url": "https://www.tripadvisor.com/CheapFlightsPartnerHandoff?searchHash=e7698b48f958e32740578c0fb9df4e5d&provider=Kayak|1|34&area=FLTCenterColumn|0|1|ItinList|8|Meta_ItineraryPrice&resultsServlet=CheapFlightsSearchResults&handoffPlatform=desktop&impressionId=&totalPricePerPassenger=86.18"
                },
                {
                    "purchaseLinkId": "Kayak|1|35",
                    "providerId": "Trip.com",
                    "partnerSuppliedProvider": {
                        "id": "CTRIPAIR",
                        "displayName": "Trip.com",
                        "logoUrl": "https://content.r9cdn.net/rimg/provider-logos/airlines/h/CTRIPAIR.png?crop=false&width=166&height=62&fallback=default1.png&_v=6ffbb6778ab7d3ee8da1e965010b225e"
                    },
                    "commerceName": "KayakFlightsMeta",
                    "currency": "USD",
                    "originalCurrency": "USD",
                    "seatAvailability": 0,
                    "taxesAndFees": 0,
                    "taxesAndFeesPerPassenger": 0,
                    "totalPrice": 87,
                    "totalPricePerPassenger": 87,
                    "fareBasisCodes": [],
                    "containedPurchaseLinks": [],
                    "partnerData": {},
                    "isPaid": false,
                    "fareAttributesList": [],
                    "url": "https://www.tripadvisor.com/CheapFlightsPartnerHandoff?searchHash=e7698b48f958e32740578c0fb9df4e5d&provider=Kayak|1|35&area=FLTCenterColumn|0|1|ItinList|8|Meta_ItineraryPrice&resultsServlet=CheapFlightsSearchResults&handoffPlatform=desktop&impressionId=&totalPricePerPassenger=87"
                },
                {
                    "purchaseLinkId": "Kayak|1|36",
                    "providerId": "Spirit Airlines",
                    "partnerSuppliedProvider": {
                        "id": "NK",
                        "displayName": "Spirit Airlines",
                        "logoUrl": "https://content.r9cdn.net/rimg/provider-logos/airlines/h/NK.png?crop=false&width=166&height=62&fallback=default1.png&_v=2ec6f00d181725322e6a0f66550c2c23"
                    },
                    "commerceName": "KayakFlightsMeta",
                    "currency": "USD",
                    "originalCurrency": "USD",
                    "seatAvailability": 0,
                    "taxesAndFees": 0,
                    "taxesAndFeesPerPassenger": 0,
                    "totalPrice": 87.79,
                    "totalPricePerPassenger": 87.79,
                    "fareBasisCodes": [],
                    "containedPurchaseLinks": [],
                    "fareBranding": {
                        "brandId": "Economy",
                        "carrierCode": "NK"
                    },
                    "partnerData": {},
                    "isPaid": false,
                    "fareAttributesList": [
                        {
                            "carryonAllowed": true,
                            "carryonFeeObj": {
                                "feeType": "PRESENT",
                                "feeValue": -1
                            },
                            "freeCheckedBagAllowance": 0,
                            "firstCheckedBagFee": -1,
                            "secondCheckedBagFee": -1,
                            "seatSelectionAllowed": true,
                            "seatSelectionFeeObj": {
                                "feeType": "PRESENT",
                                "feeValue": -1
                            },
                            "ticketChangeAllowed": true,
                            "ticketChangeFeeObj": {
                                "feeType": "PRESENT",
                                "feeValue": -1
                            },
                            "segmentIndices": [
                                0
                            ]
                        }
                    ],
                    "url": "https://www.tripadvisor.com/CheapFlightsPartnerHandoff?searchHash=e7698b48f958e32740578c0fb9df4e5d&provider=Kayak|1|36&area=FLTCenterColumn|0|1|ItinList|8|Meta_ItineraryPrice&resultsServlet=CheapFlightsSearchResults&handoffPlatform=desktop&impressionId=&totalPricePerPassenger=87.79"
                },
                {
                    "purchaseLinkId": "Kayak|1|37",
                    "providerId": "Kiwi.com",
                    "partnerSuppliedProvider": {
                        "id": "SKYPICKER",
                        "displayName": "Kiwi.com",
                        "logoUrl": "https://content.r9cdn.net/rimg/provider-logos/airlines/h/SKYPICKER.png?crop=false&width=166&height=62&fallback=default3.png&_v=0cd3e94b7e8a5f027bff27942a213709"
                    },
                    "commerceName": "KayakFlightsMeta",
                    "currency": "USD",
                    "originalCurrency": "USD",
                    "seatAvailability": 0,
                    "taxesAndFees": 0,
                    "taxesAndFeesPerPassenger": 0,
                    "totalPrice": 91,
                    "totalPricePerPassenger": 91,
                    "fareBasisCodes": [],
                    "containedPurchaseLinks": [],
                    "partnerData": {},
                    "isPaid": false,
                    "fareAttributesList": [],
                    "url": "https://www.tripadvisor.com/CheapFlightsPartnerHandoff?searchHash=e7698b48f958e32740578c0fb9df4e5d&provider=Kayak|1|37&area=FLTCenterColumn|0|1|ItinList|8|Meta_ItineraryPrice&resultsServlet=CheapFlightsSearchResults&handoffPlatform=desktop&impressionId=&totalPricePerPassenger=91"
                }
            ]
        },
        {
            "segments": [
                {
                    "legs": [
                        {
                            "originStationCode": "ORD",
                            "isDifferentOriginStation": false,
                            "destinationStationCode": "LAS",
                            "isDifferentDestinationStation": false,
                            "departureDateTime": "2023-10-31T10:19:00-05:00",
                            "arrivalDateTime": "2023-10-31T12:18:00-07:00",
                            "classOfService": "ECONOMY",
                            "marketingCarrierCode": "NK",
                            "operatingCarrierCode": "NK",
                            "equipmentId": "Airbus A320neo",
                            "amenities": [],
                            "flightNumber": 183,
                            "seatGuruEquipmentId": 0,
                            "seatGuruAirlineUrl": "",
                            "numStops": 0,
                            "distanceInKM": 2433.845,
                            "isInternational": false,
                            "selfTransfer": false,
                            "operatingCarrier": {
                                "locationId": 8729157,
                                "code": "NK",
                                "logoUrl": "https://static.tacdn.com/img2/flights/airlines/logos/100x100/Spirit_Logo_Updated_1.jpg",
                                "displayName": "Spirit"
                            },
                            "marketingCarrier": {
                                "locationId": 8729157,
                                "code": "NK",
                                "logoUrl": "https://static.tacdn.com/img2/flights/airlines/logos/100x100/Spirit_Logo_Updated_1.jpg",
                                "displayName": "Spirit"
                            }
                        },
                        {
                            "originStationCode": "LAS",
                            "isDifferentOriginStation": false,
                            "destinationStationCode": "LAX",
                            "isDifferentDestinationStation": false,
                            "departureDateTime": "2023-10-31T21:25:00-07:00",
                            "arrivalDateTime": "2023-10-31T22:47:00-07:00",
                            "classOfService": "ECONOMY",
                            "marketingCarrierCode": "NK",
                            "operatingCarrierCode": "NK",
                            "equipmentId": "Airbus A320neo",
                            "amenities": [],
                            "flightNumber": 194,
                            "seatGuruEquipmentId": 0,
                            "seatGuruAirlineUrl": "",
                            "numStops": 0,
                            "distanceInKM": 380.6632,
                            "isInternational": false,
                            "selfTransfer": true,
                            "operatingCarrier": {
                                "locationId": 8729157,
                                "code": "NK",
                                "logoUrl": "https://static.tacdn.com/img2/flights/airlines/logos/100x100/Spirit_Logo_Updated_1.jpg",
                                "displayName": "Spirit"
                            },
                            "marketingCarrier": {
                                "locationId": 8729157,
                                "code": "NK",
                                "logoUrl": "https://static.tacdn.com/img2/flights/airlines/logos/100x100/Spirit_Logo_Updated_1.jpg",
                                "displayName": "Spirit"
                            }
                        }
                    ],
                    "layovers": [
                        {
                            "durationType": "LONG",
                            "hasStationChange": false,
                            "durationInMinutes": 547
                        }
                    ]
                }
            ],
            "purchaseLinks": [
                {
                    "purchaseLinkId": "Kayak|1|304",
                    "providerId": "mytrip.com",
                    "partnerSuppliedProvider": {
                        "id": "AIRTICKETS24DOTCOMVI",
                        "displayName": "mytrip.com",
                        "logoUrl": "https://content.r9cdn.net/rimg/provider-logos/airlines/h/AIRTICKETS24DOTCOM.png?crop=false&width=166&height=62&fallback=default1.png&_v=1e84439f35e4558f94e874158f6a3eae"
                    },
                    "commerceName": "KayakFlightsMeta",
                    "currency": "USD",
                    "originalCurrency": "USD",
                    "seatAvailability": 0,
                    "taxesAndFees": 0,
                    "taxesAndFeesPerPassenger": 0,
                    "totalPrice": 77.78,
                    "totalPricePerPassenger": 77.78,
                    "fareBasisCodes": [],
                    "containedPurchaseLinks": [],
                    "partnerData": {},
                    "isPaid": false,
                    "fareAttributesList": [],
                    "url": "https://www.tripadvisor.com/CheapFlightsPartnerHandoff?searchHash=e7698b48f958e32740578c0fb9df4e5d&provider=Kayak|1|304&area=FLTCenterColumn|0|1|ItinList|9|Meta_ItineraryPrice&resultsServlet=CheapFlightsSearchResults&handoffPlatform=desktop&impressionId=&totalPricePerPassenger=77.78"
                },
                {
                    "purchaseLinkId": "Kayak|1|307",
                    "providerId": "Booking.com",
                    "partnerSuppliedProvider": {
                        "id": "BOOKINGFLIGHTS",
                        "displayName": "Booking.com",
                        "logoUrl": "https://content.r9cdn.net/rimg/provider-logos/airlines/h/BOOKINGFLIGHTS.png?crop=false&width=166&height=62&fallback=default3.png&_v=1233faf051a0a6b9d9807846b1316f74"
                    },
                    "commerceName": "KayakFlightsMeta",
                    "currency": "USD",
                    "originalCurrency": "USD",
                    "seatAvailability": 0,
                    "taxesAndFees": 0,
                    "taxesAndFeesPerPassenger": 0,
                    "totalPrice": 85.18,
                    "totalPricePerPassenger": 85.18,
                    "fareBasisCodes": [],
                    "containedPurchaseLinks": [],
                    "partnerData": {},
                    "isPaid": false,
                    "fareAttributesList": [],
                    "url": "https://www.tripadvisor.com/CheapFlightsPartnerHandoff?searchHash=e7698b48f958e32740578c0fb9df4e5d&provider=Kayak|1|307&area=FLTCenterColumn|0|1|ItinList|9|Meta_ItineraryPrice&resultsServlet=CheapFlightsSearchResults&handoffPlatform=desktop&impressionId=&totalPricePerPassenger=85.18"
                },
                {
                    "purchaseLinkId": "Kayak|1|306",
                    "providerId": "CheapOair",
                    "partnerSuppliedProvider": {
                        "id": "CHEAPOAIR",
                        "displayName": "CheapOair",
                        "logoUrl": "https://content.r9cdn.net/rimg/provider-logos/airlines/h/CHEAPOAIR.png?crop=false&width=166&height=62&fallback=default2.png&_v=5eb11191c415b271717e37aa9870f06f"
                    },
                    "commerceName": "KayakFlightsMeta",
                    "currency": "USD",
                    "originalCurrency": "USD",
                    "seatAvailability": 0,
                    "taxesAndFees": 0,
                    "taxesAndFeesPerPassenger": 0,
                    "totalPrice": 85.18,
                    "totalPricePerPassenger": 85.18,
                    "fareBasisCodes": [],
                    "containedPurchaseLinks": [],
                    "partnerData": {},
                    "isPaid": false,
                    "fareAttributesList": [],
                    "url": "https://www.tripadvisor.com/CheapFlightsPartnerHandoff?searchHash=e7698b48f958e32740578c0fb9df4e5d&provider=Kayak|1|306&area=FLTCenterColumn|0|1|ItinList|9|Meta_ItineraryPrice&resultsServlet=CheapFlightsSearchResults&handoffPlatform=desktop&impressionId=&totalPricePerPassenger=85.18"
                },
                {
                    "purchaseLinkId": "Kayak|1|305",
                    "providerId": "Gotogate",
                    "partnerSuppliedProvider": {
                        "id": "GOTOGATE",
                        "displayName": "Gotogate",
                        "logoUrl": "https://content.r9cdn.net/rimg/provider-logos/airlines/h/GOTOGATE.png?crop=false&width=166&height=62&fallback=default3.png&_v=a29de71af6666a1a11e42eb0b5f7f84a"
                    },
                    "commerceName": "KayakFlightsMeta",
                    "currency": "USD",
                    "originalCurrency": "USD",
                    "seatAvailability": 0,
                    "taxesAndFees": 0,
                    "taxesAndFeesPerPassenger": 0,
                    "totalPrice": 85.18,
                    "totalPricePerPassenger": 85.18,
                    "fareBasisCodes": [],
                    "containedPurchaseLinks": [],
                    "partnerData": {},
                    "isPaid": false,
                    "fareAttributesList": [],
                    "url": "https://www.tripadvisor.com/CheapFlightsPartnerHandoff?searchHash=e7698b48f958e32740578c0fb9df4e5d&provider=Kayak|1|305&area=FLTCenterColumn|0|1|ItinList|9|Meta_ItineraryPrice&resultsServlet=CheapFlightsSearchResults&handoffPlatform=desktop&impressionId=&totalPricePerPassenger=85.18"
                },
                {
                    "purchaseLinkId": "Kayak|1|308",
                    "providerId": "Priceline",
                    "partnerSuppliedProvider": {
                        "id": "PRICELINEFLIGHTS",
                        "displayName": "Priceline",
                        "logoUrl": "https://content.r9cdn.net/rimg/provider-logos/airlines/h/PRICELINEFLIGHTS.png?crop=false&width=166&height=62&fallback=default3.png&_v=b3e81884c7678f954cce1ed2c441273a"
                    },
                    "commerceName": "KayakFlightsMeta",
                    "currency": "USD",
                    "originalCurrency": "USD",
                    "seatAvailability": 0,
                    "taxesAndFees": 0,
                    "taxesAndFeesPerPassenger": 0,
                    "totalPrice": 86.18,
                    "totalPricePerPassenger": 86.18,
                    "fareBasisCodes": [],
                    "containedPurchaseLinks": [],
                    "partnerData": {},
                    "isPaid": false,
                    "fareAttributesList": [],
                    "url": "https://www.tripadvisor.com/CheapFlightsPartnerHandoff?searchHash=e7698b48f958e32740578c0fb9df4e5d&provider=Kayak|1|308&area=FLTCenterColumn|0|1|ItinList|9|Meta_ItineraryPrice&resultsServlet=CheapFlightsSearchResults&handoffPlatform=desktop&impressionId=&totalPricePerPassenger=86.18"
                },
                {
                    "purchaseLinkId": "Kayak|1|309",
                    "providerId": "Trip.com",
                    "partnerSuppliedProvider": {
                        "id": "CTRIPAIR",
                        "displayName": "Trip.com",
                        "logoUrl": "https://content.r9cdn.net/rimg/provider-logos/airlines/h/CTRIPAIR.png?crop=false&width=166&height=62&fallback=default1.png&_v=6ffbb6778ab7d3ee8da1e965010b225e"
                    },
                    "commerceName": "KayakFlightsMeta",
                    "currency": "USD",
                    "originalCurrency": "USD",
                    "seatAvailability": 0,
                    "taxesAndFees": 0,
                    "taxesAndFeesPerPassenger": 0,
                    "totalPrice": 87,
                    "totalPricePerPassenger": 87,
                    "fareBasisCodes": [],
                    "containedPurchaseLinks": [],
                    "partnerData": {},
                    "isPaid": false,
                    "fareAttributesList": [],
                    "url": "https://www.tripadvisor.com/CheapFlightsPartnerHandoff?searchHash=e7698b48f958e32740578c0fb9df4e5d&provider=Kayak|1|309&area=FLTCenterColumn|0|1|ItinList|9|Meta_ItineraryPrice&resultsServlet=CheapFlightsSearchResults&handoffPlatform=desktop&impressionId=&totalPricePerPassenger=87"
                },
                {
                    "purchaseLinkId": "Kayak|1|310",
                    "providerId": "Spirit Airlines",
                    "partnerSuppliedProvider": {
                        "id": "NK",
                        "displayName": "Spirit Airlines",
                        "logoUrl": "https://content.r9cdn.net/rimg/provider-logos/airlines/h/NK.png?crop=false&width=166&height=62&fallback=default1.png&_v=2ec6f00d181725322e6a0f66550c2c23"
                    },
                    "commerceName": "KayakFlightsMeta",
                    "currency": "USD",
                    "originalCurrency": "USD",
                    "seatAvailability": 0,
                    "taxesAndFees": 0,
                    "taxesAndFeesPerPassenger": 0,
                    "totalPrice": 87.79,
                    "totalPricePerPassenger": 87.79,
                    "fareBasisCodes": [],
                    "containedPurchaseLinks": [],
                    "fareBranding": {
                        "brandId": "Economy",
                        "carrierCode": "NK"
                    },
                    "partnerData": {},
                    "isPaid": false,
                    "fareAttributesList": [
                        {
                            "carryonAllowed": true,
                            "carryonFeeObj": {
                                "feeType": "PRESENT",
                                "feeValue": -1
                            },
                            "freeCheckedBagAllowance": 0,
                            "firstCheckedBagFee": -1,
                            "secondCheckedBagFee": -1,
                            "seatSelectionAllowed": true,
                            "seatSelectionFeeObj": {
                                "feeType": "PRESENT",
                                "feeValue": -1
                            },
                            "ticketChangeAllowed": true,
                            "ticketChangeFeeObj": {
                                "feeType": "PRESENT",
                                "feeValue": -1
                            },
                            "segmentIndices": [
                                0
                            ]
                        }
                    ],
                    "url": "https://www.tripadvisor.com/CheapFlightsPartnerHandoff?searchHash=e7698b48f958e32740578c0fb9df4e5d&provider=Kayak|1|310&area=FLTCenterColumn|0|1|ItinList|9|Meta_ItineraryPrice&resultsServlet=CheapFlightsSearchResults&handoffPlatform=desktop&impressionId=&totalPricePerPassenger=87.79"
                },
                {
                    "purchaseLinkId": "Kayak|1|311",
                    "providerId": "Kiwi.com",
                    "partnerSuppliedProvider": {
                        "id": "SKYPICKER",
                        "displayName": "Kiwi.com",
                        "logoUrl": "https://content.r9cdn.net/rimg/provider-logos/airlines/h/SKYPICKER.png?crop=false&width=166&height=62&fallback=default3.png&_v=0cd3e94b7e8a5f027bff27942a213709"
                    },
                    "commerceName": "KayakFlightsMeta",
                    "currency": "USD",
                    "originalCurrency": "USD",
                    "seatAvailability": 0,
                    "taxesAndFees": 0,
                    "taxesAndFeesPerPassenger": 0,
                    "totalPrice": 91,
                    "totalPricePerPassenger": 91,
                    "fareBasisCodes": [],
                    "containedPurchaseLinks": [],
                    "partnerData": {},
                    "isPaid": false,
                    "fareAttributesList": [],
                    "url": "https://www.tripadvisor.com/CheapFlightsPartnerHandoff?searchHash=e7698b48f958e32740578c0fb9df4e5d&provider=Kayak|1|311&area=FLTCenterColumn|0|1|ItinList|9|Meta_ItineraryPrice&resultsServlet=CheapFlightsSearchResults&handoffPlatform=desktop&impressionId=&totalPricePerPassenger=91"
                }
            ]
        },
        {
            "segments": [
                {
                    "legs": [
                        {
                            "originStationCode": "ORD",
                            "isDifferentOriginStation": false,
                            "destinationStationCode": "LAS",
                            "isDifferentDestinationStation": false,
                            "departureDateTime": "2023-10-31T10:19:00-05:00",
                            "arrivalDateTime": "2023-10-31T12:18:00-07:00",
                            "classOfService": "ECONOMY",
                            "marketingCarrierCode": "NK",
                            "operatingCarrierCode": "NK",
                            "equipmentId": "Airbus A320neo",
                            "amenities": [],
                            "flightNumber": 183,
                            "seatGuruEquipmentId": 0,
                            "seatGuruAirlineUrl": "",
                            "numStops": 0,
                            "distanceInKM": 2433.845,
                            "isInternational": false,
                            "selfTransfer": false,
                            "operatingCarrier": {
                                "locationId": 8729157,
                                "code": "NK",
                                "logoUrl": "https://static.tacdn.com/img2/flights/airlines/logos/100x100/Spirit_Logo_Updated_1.jpg",
                                "displayName": "Spirit"
                            },
                            "marketingCarrier": {
                                "locationId": 8729157,
                                "code": "NK",
                                "logoUrl": "https://static.tacdn.com/img2/flights/airlines/logos/100x100/Spirit_Logo_Updated_1.jpg",
                                "displayName": "Spirit"
                            }
                        },
                        {
                            "originStationCode": "LAS",
                            "isDifferentOriginStation": false,
                            "destinationStationCode": "LAX",
                            "isDifferentDestinationStation": false,
                            "departureDateTime": "2023-10-31T23:32:00-07:00",
                            "arrivalDateTime": "2023-11-01T00:55:00-07:00",
                            "classOfService": "ECONOMY",
                            "marketingCarrierCode": "NK",
                            "operatingCarrierCode": "NK",
                            "equipmentId": "Airbus A320neo",
                            "amenities": [],
                            "flightNumber": 2048,
                            "seatGuruEquipmentId": 0,
                            "seatGuruAirlineUrl": "",
                            "numStops": 0,
                            "distanceInKM": 380.6632,
                            "isInternational": false,
                            "selfTransfer": true,
                            "operatingCarrier": {
                                "locationId": 8729157,
                                "code": "NK",
                                "logoUrl": "https://static.tacdn.com/img2/flights/airlines/logos/100x100/Spirit_Logo_Updated_1.jpg",
                                "displayName": "Spirit"
                            },
                            "marketingCarrier": {
                                "locationId": 8729157,
                                "code": "NK",
                                "logoUrl": "https://static.tacdn.com/img2/flights/airlines/logos/100x100/Spirit_Logo_Updated_1.jpg",
                                "displayName": "Spirit"
                            }
                        }
                    ],
                    "layovers": [
                        {
                            "durationType": "LONG",
                            "hasStationChange": false,
                            "durationInMinutes": 674
                        }
                    ]
                }
            ],
            "purchaseLinks": [
                {
                    "purchaseLinkId": "Kayak|1|192",
                    "providerId": "mytrip.com",
                    "partnerSuppliedProvider": {
                        "id": "AIRTICKETS24DOTCOMVI",
                        "displayName": "mytrip.com",
                        "logoUrl": "https://content.r9cdn.net/rimg/provider-logos/airlines/h/AIRTICKETS24DOTCOM.png?crop=false&width=166&height=62&fallback=default1.png&_v=1e84439f35e4558f94e874158f6a3eae"
                    },
                    "commerceName": "KayakFlightsMeta",
                    "currency": "USD",
                    "originalCurrency": "USD",
                    "seatAvailability": 0,
                    "taxesAndFees": 0,
                    "taxesAndFeesPerPassenger": 0,
                    "totalPrice": 77.78,
                    "totalPricePerPassenger": 77.78,
                    "fareBasisCodes": [],
                    "containedPurchaseLinks": [],
                    "partnerData": {},
                    "isPaid": false,
                    "fareAttributesList": [],
                    "url": "https://www.tripadvisor.com/CheapFlightsPartnerHandoff?searchHash=e7698b48f958e32740578c0fb9df4e5d&provider=Kayak|1|192&area=FLTCenterColumn|0|1|ItinList|10|Meta_ItineraryPrice&resultsServlet=CheapFlightsSearchResults&handoffPlatform=desktop&impressionId=&totalPricePerPassenger=77.78"
                },
                {
                    "purchaseLinkId": "Kayak|1|193",
                    "providerId": "Spirit Airlines",
                    "partnerSuppliedProvider": {
                        "id": "NK",
                        "displayName": "Spirit Airlines",
                        "logoUrl": "https://content.r9cdn.net/rimg/provider-logos/airlines/h/NK.png?crop=false&width=166&height=62&fallback=default1.png&_v=2ec6f00d181725322e6a0f66550c2c23"
                    },
                    "commerceName": "KayakFlightsMeta",
                    "currency": "USD",
                    "originalCurrency": "USD",
                    "seatAvailability": 0,
                    "taxesAndFees": 0,
                    "taxesAndFeesPerPassenger": 0,
                    "totalPrice": 87.79,
                    "totalPricePerPassenger": 87.79,
                    "fareBasisCodes": [],
                    "containedPurchaseLinks": [],
                    "fareBranding": {
                        "brandId": "Economy",
                        "carrierCode": "NK"
                    },
                    "partnerData": {},
                    "isPaid": false,
                    "fareAttributesList": [
                        {
                            "carryonAllowed": true,
                            "carryonFeeObj": {
                                "feeType": "PRESENT",
                                "feeValue": -1
                            },
                            "freeCheckedBagAllowance": 0,
                            "firstCheckedBagFee": -1,
                            "secondCheckedBagFee": -1,
                            "seatSelectionAllowed": true,
                            "seatSelectionFeeObj": {
                                "feeType": "PRESENT",
                                "feeValue": -1
                            },
                            "ticketChangeAllowed": true,
                            "ticketChangeFeeObj": {
                                "feeType": "PRESENT",
                                "feeValue": -1
                            },
                            "segmentIndices": [
                                0
                            ]
                        }
                    ],
                    "url": "https://www.tripadvisor.com/CheapFlightsPartnerHandoff?searchHash=e7698b48f958e32740578c0fb9df4e5d&provider=Kayak|1|193&area=FLTCenterColumn|0|1|ItinList|10|Meta_ItineraryPrice&resultsServlet=CheapFlightsSearchResults&handoffPlatform=desktop&impressionId=&totalPricePerPassenger=87.79"
                }
            ]
        },
        {
            "segments": [
                {
                    "legs": [
                        {
                            "originStationCode": "ORD",
                            "isDifferentOriginStation": false,
                            "destinationStationCode": "LAS",
                            "isDifferentDestinationStation": false,
                            "departureDateTime": "2023-10-31T15:38:00-05:00",
                            "arrivalDateTime": "2023-10-31T17:40:00-07:00",
                            "classOfService": "ECONOMY",
                            "marketingCarrierCode": "NK",
                            "operatingCarrierCode": "NK",
                            "equipmentId": "Airbus A320 (sharklets)",
                            "amenities": [],
                            "flightNumber": 759,
                            "seatGuruEquipmentId": 0,
                            "seatGuruAirlineUrl": "",
                            "numStops": 0,
                            "distanceInKM": 2433.845,
                            "isInternational": false,
                            "selfTransfer": false,
                            "operatingCarrier": {
                                "locationId": 8729157,
                                "code": "NK",
                                "logoUrl": "https://static.tacdn.com/img2/flights/airlines/logos/100x100/Spirit_Logo_Updated_1.jpg",
                                "displayName": "Spirit"
                            },
                            "marketingCarrier": {
                                "locationId": 8729157,
                                "code": "NK",
                                "logoUrl": "https://static.tacdn.com/img2/flights/airlines/logos/100x100/Spirit_Logo_Updated_1.jpg",
                                "displayName": "Spirit"
                            }
                        },
                        {
                            "originStationCode": "LAS",
                            "isDifferentOriginStation": false,
                            "destinationStationCode": "LAX",
                            "isDifferentDestinationStation": false,
                            "departureDateTime": "2023-11-01T05:00:00-07:00",
                            "arrivalDateTime": "2023-11-01T06:18:00-07:00",
                            "classOfService": "ECONOMY",
                            "marketingCarrierCode": "NK",
                            "operatingCarrierCode": "NK",
                            "equipmentId": "Airbus A320neo",
                            "amenities": [],
                            "flightNumber": 649,
                            "seatGuruEquipmentId": 0,
                            "seatGuruAirlineUrl": "",
                            "numStops": 0,
                            "distanceInKM": 380.6632,
                            "isInternational": false,
                            "selfTransfer": true,
                            "operatingCarrier": {
                                "locationId": 8729157,
                                "code": "NK",
                                "logoUrl": "https://static.tacdn.com/img2/flights/airlines/logos/100x100/Spirit_Logo_Updated_1.jpg",
                                "displayName": "Spirit"
                            },
                            "marketingCarrier": {
                                "locationId": 8729157,
                                "code": "NK",
                                "logoUrl": "https://static.tacdn.com/img2/flights/airlines/logos/100x100/Spirit_Logo_Updated_1.jpg",
                                "displayName": "Spirit"
                            }
                        }
                    ],
                    "layovers": [
                        {
                            "durationType": "LONG",
                            "hasStationChange": false,
                            "durationInMinutes": 680
                        }
                    ]
                }
            ],
            "purchaseLinks": [
                {
                    "purchaseLinkId": "Kayak|1|371",
                    "providerId": "mytrip.com",
                    "partnerSuppliedProvider": {
                        "id": "AIRTICKETS24DOTCOMVI",
                        "displayName": "mytrip.com",
                        "logoUrl": "https://content.r9cdn.net/rimg/provider-logos/airlines/h/AIRTICKETS24DOTCOM.png?crop=false&width=166&height=62&fallback=default1.png&_v=1e84439f35e4558f94e874158f6a3eae"
                    },
                    "commerceName": "KayakFlightsMeta",
                    "currency": "USD",
                    "originalCurrency": "USD",
                    "seatAvailability": 0,
                    "taxesAndFees": 0,
                    "taxesAndFeesPerPassenger": 0,
                    "totalPrice": 77.78,
                    "totalPricePerPassenger": 77.78,
                    "fareBasisCodes": [],
                    "containedPurchaseLinks": [],
                    "partnerData": {},
                    "isPaid": false,
                    "fareAttributesList": [],
                    "url": "https://www.tripadvisor.com/CheapFlightsPartnerHandoff?searchHash=e7698b48f958e32740578c0fb9df4e5d&provider=Kayak|1|371&area=FLTCenterColumn|0|1|ItinList|12|Meta_ItineraryPrice&resultsServlet=CheapFlightsSearchResults&handoffPlatform=desktop&impressionId=&totalPricePerPassenger=77.78"
                },
                {
                    "purchaseLinkId": "Kayak|1|372",
                    "providerId": "Spirit Airlines",
                    "partnerSuppliedProvider": {
                        "id": "NK",
                        "displayName": "Spirit Airlines",
                        "logoUrl": "https://content.r9cdn.net/rimg/provider-logos/airlines/h/NK.png?crop=false&width=166&height=62&fallback=default1.png&_v=2ec6f00d181725322e6a0f66550c2c23"
                    },
                    "commerceName": "KayakFlightsMeta",
                    "currency": "USD",
                    "originalCurrency": "USD",
                    "seatAvailability": 0,
                    "taxesAndFees": 0,
                    "taxesAndFeesPerPassenger": 0,
                    "totalPrice": 87.79,
                    "totalPricePerPassenger": 87.79,
                    "fareBasisCodes": [],
                    "containedPurchaseLinks": [],
                    "fareBranding": {
                        "brandId": "Economy",
                        "carrierCode": "NK"
                    },
                    "partnerData": {},
                    "isPaid": false,
                    "fareAttributesList": [
                        {
                            "carryonAllowed": true,
                            "carryonFeeObj": {
                                "feeType": "PRESENT",
                                "feeValue": -1
                            },
                            "freeCheckedBagAllowance": 0,
                            "firstCheckedBagFee": -1,
                            "secondCheckedBagFee": -1,
                            "seatSelectionAllowed": true,
                            "seatSelectionFeeObj": {
                                "feeType": "PRESENT",
                                "feeValue": -1
                            },
                            "ticketChangeAllowed": true,
                            "ticketChangeFeeObj": {
                                "feeType": "PRESENT",
                                "feeValue": -1
                            },
                            "segmentIndices": [
                                0
                            ]
                        }
                    ],
                    "url": "https://www.tripadvisor.com/CheapFlightsPartnerHandoff?searchHash=e7698b48f958e32740578c0fb9df4e5d&provider=Kayak|1|372&area=FLTCenterColumn|0|1|ItinList|12|Meta_ItineraryPrice&resultsServlet=CheapFlightsSearchResults&handoffPlatform=desktop&impressionId=&totalPricePerPassenger=87.79"
                }
            ]
        },
        {
            "segments": [
                {
                    "legs": [
                        {
                            "originStationCode": "ORD",
                            "isDifferentOriginStation": false,
                            "destinationStationCode": "DFW",
                            "isDifferentDestinationStation": false,
                            "departureDateTime": "2023-10-31T07:00:00-05:00",
                            "arrivalDateTime": "2023-10-31T09:35:00-05:00",
                            "classOfService": "ECONOMY",
                            "marketingCarrierCode": "NK",
                            "operatingCarrierCode": "NK",
                            "equipmentId": "Airbus A320neo",
                            "amenities": [],
                            "flightNumber": 2918,
                            "seatGuruEquipmentId": 0,
                            "seatGuruAirlineUrl": "",
                            "numStops": 0,
                            "distanceInKM": 1292.1888,
                            "isInternational": false,
                            "selfTransfer": false,
                            "operatingCarrier": {
                                "locationId": 8729157,
                                "code": "NK",
                                "logoUrl": "https://static.tacdn.com/img2/flights/airlines/logos/100x100/Spirit_Logo_Updated_1.jpg",
                                "displayName": "Spirit"
                            },
                            "marketingCarrier": {
                                "locationId": 8729157,
                                "code": "NK",
                                "logoUrl": "https://static.tacdn.com/img2/flights/airlines/logos/100x100/Spirit_Logo_Updated_1.jpg",
                                "displayName": "Spirit"
                            }
                        },
                        {
                            "originStationCode": "DFW",
                            "isDifferentOriginStation": false,
                            "destinationStationCode": "LAX",
                            "isDifferentDestinationStation": false,
                            "departureDateTime": "2023-10-31T15:16:00-05:00",
                            "arrivalDateTime": "2023-10-31T16:35:00-07:00",
                            "classOfService": "ECONOMY",
                            "marketingCarrierCode": "NK",
                            "operatingCarrierCode": "NK",
                            "equipmentId": "Airbus A321 (sharklets)",
                            "amenities": [],
                            "flightNumber": 628,
                            "seatGuruEquipmentId": 0,
                            "seatGuruAirlineUrl": "",
                            "numStops": 0,
                            "distanceInKM": 1985.2616,
                            "isInternational": false,
                            "selfTransfer": false,
                            "operatingCarrier": {
                                "locationId": 8729157,
                                "code": "NK",
                                "logoUrl": "https://static.tacdn.com/img2/flights/airlines/logos/100x100/Spirit_Logo_Updated_1.jpg",
                                "displayName": "Spirit"
                            },
                            "marketingCarrier": {
                                "locationId": 8729157,
                                "code": "NK",
                                "logoUrl": "https://static.tacdn.com/img2/flights/airlines/logos/100x100/Spirit_Logo_Updated_1.jpg",
                                "displayName": "Spirit"
                            }
                        }
                    ],
                    "layovers": [
                        {
                            "durationType": "LONG",
                            "hasStationChange": false,
                            "durationInMinutes": 341
                        }
                    ]
                }
            ],
            "purchaseLinks": [
                {
                    "purchaseLinkId": "Kayak|1|646",
                    "providerId": "eDreams",
                    "partnerSuppliedProvider": {
                        "id": "EDREAMSAIR",
                        "displayName": "eDreams",
                        "logoUrl": "https://content.r9cdn.net/rimg/provider-logos/airlines/h/EDREAMSAIR.us.png?crop=false&width=166&height=62&fallback=default2.png&_v=af0479a857c0eb142b1531d305bbf971"
                    },
                    "commerceName": "KayakFlightsMeta",
                    "currency": "USD",
                    "originalCurrency": "USD",
                    "seatAvailability": 0,
                    "taxesAndFees": 0,
                    "taxesAndFeesPerPassenger": 0,
                    "totalPrice": 79.66,
                    "totalPricePerPassenger": 79.66,
                    "fareBasisCodes": [],
                    "containedPurchaseLinks": [],
                    "partnerData": {},
                    "isPaid": false,
                    "fareAttributesList": [],
                    "url": "https://www.tripadvisor.com/CheapFlightsPartnerHandoff?searchHash=e7698b48f958e32740578c0fb9df4e5d&provider=Kayak|1|646&area=FLTCenterColumn|0|1|ItinList|13|Meta_ItineraryPrice&resultsServlet=CheapFlightsSearchResults&handoffPlatform=desktop&impressionId=&totalPricePerPassenger=79.66"
                },
                {
                    "purchaseLinkId": "Kayak|1|647",
                    "providerId": "mytrip.com",
                    "partnerSuppliedProvider": {
                        "id": "AIRTICKETS24DOTCOMVI",
                        "displayName": "mytrip.com",
                        "logoUrl": "https://content.r9cdn.net/rimg/provider-logos/airlines/h/AIRTICKETS24DOTCOM.png?crop=false&width=166&height=62&fallback=default1.png&_v=1e84439f35e4558f94e874158f6a3eae"
                    },
                    "commerceName": "KayakFlightsMeta",
                    "currency": "USD",
                    "originalCurrency": "USD",
                    "seatAvailability": 0,
                    "taxesAndFees": 0,
                    "taxesAndFeesPerPassenger": 0,
                    "totalPrice": 81.89,
                    "totalPricePerPassenger": 81.89,
                    "fareBasisCodes": [],
                    "containedPurchaseLinks": [],
                    "partnerData": {},
                    "isPaid": false,
                    "fareAttributesList": [],
                    "url": "https://www.tripadvisor.com/CheapFlightsPartnerHandoff?searchHash=e7698b48f958e32740578c0fb9df4e5d&provider=Kayak|1|647&area=FLTCenterColumn|0|1|ItinList|13|Meta_ItineraryPrice&resultsServlet=CheapFlightsSearchResults&handoffPlatform=desktop&impressionId=&totalPricePerPassenger=81.89"
                },
                {
                    "purchaseLinkId": "Kayak|1|649",
                    "providerId": "CheapOair",
                    "partnerSuppliedProvider": {
                        "id": "CHEAPOAIR",
                        "displayName": "CheapOair",
                        "logoUrl": "https://content.r9cdn.net/rimg/provider-logos/airlines/h/CHEAPOAIR.png?crop=false&width=166&height=62&fallback=default2.png&_v=5eb11191c415b271717e37aa9870f06f"
                    },
                    "commerceName": "KayakFlightsMeta",
                    "currency": "USD",
                    "originalCurrency": "USD",
                    "seatAvailability": 0,
                    "taxesAndFees": 0,
                    "taxesAndFeesPerPassenger": 0,
                    "totalPrice": 85.18,
                    "totalPricePerPassenger": 85.18,
                    "fareBasisCodes": [],
                    "containedPurchaseLinks": [],
                    "partnerData": {},
                    "isPaid": false,
                    "fareAttributesList": [],
                    "url": "https://www.tripadvisor.com/CheapFlightsPartnerHandoff?searchHash=e7698b48f958e32740578c0fb9df4e5d&provider=Kayak|1|649&area=FLTCenterColumn|0|1|ItinList|13|Meta_ItineraryPrice&resultsServlet=CheapFlightsSearchResults&handoffPlatform=desktop&impressionId=&totalPricePerPassenger=85.18"
                },
                {
                    "purchaseLinkId": "Kayak|1|648",
                    "providerId": "Booking.com",
                    "partnerSuppliedProvider": {
                        "id": "BOOKINGFLIGHTS",
                        "displayName": "Booking.com",
                        "logoUrl": "https://content.r9cdn.net/rimg/provider-logos/airlines/h/BOOKINGFLIGHTS.png?crop=false&width=166&height=62&fallback=default3.png&_v=1233faf051a0a6b9d9807846b1316f74"
                    },
                    "commerceName": "KayakFlightsMeta",
                    "currency": "USD",
                    "originalCurrency": "USD",
                    "seatAvailability": 0,
                    "taxesAndFees": 0,
                    "taxesAndFeesPerPassenger": 0,
                    "totalPrice": 85.18,
                    "totalPricePerPassenger": 85.18,
                    "fareBasisCodes": [],
                    "containedPurchaseLinks": [],
                    "partnerData": {},
                    "isPaid": false,
                    "fareAttributesList": [],
                    "url": "https://www.tripadvisor.com/CheapFlightsPartnerHandoff?searchHash=e7698b48f958e32740578c0fb9df4e5d&provider=Kayak|1|648&area=FLTCenterColumn|0|1|ItinList|13|Meta_ItineraryPrice&resultsServlet=CheapFlightsSearchResults&handoffPlatform=desktop&impressionId=&totalPricePerPassenger=85.18"
                },
                {
                    "purchaseLinkId": "Kayak|1|650",
                    "providerId": "Gotogate",
                    "partnerSuppliedProvider": {
                        "id": "GOTOGATE",
                        "displayName": "Gotogate",
                        "logoUrl": "https://content.r9cdn.net/rimg/provider-logos/airlines/h/GOTOGATE.png?crop=false&width=166&height=62&fallback=default3.png&_v=a29de71af6666a1a11e42eb0b5f7f84a"
                    },
                    "commerceName": "KayakFlightsMeta",
                    "currency": "USD",
                    "originalCurrency": "USD",
                    "seatAvailability": 0,
                    "taxesAndFees": 0,
                    "taxesAndFeesPerPassenger": 0,
                    "totalPrice": 85.18,
                    "totalPricePerPassenger": 85.18,
                    "fareBasisCodes": [],
                    "containedPurchaseLinks": [],
                    "partnerData": {},
                    "isPaid": false,
                    "fareAttributesList": [],
                    "url": "https://www.tripadvisor.com/CheapFlightsPartnerHandoff?searchHash=e7698b48f958e32740578c0fb9df4e5d&provider=Kayak|1|650&area=FLTCenterColumn|0|1|ItinList|13|Meta_ItineraryPrice&resultsServlet=CheapFlightsSearchResults&handoffPlatform=desktop&impressionId=&totalPricePerPassenger=85.18"
                },
                {
                    "purchaseLinkId": "Kayak|1|651",
                    "providerId": "Priceline",
                    "partnerSuppliedProvider": {
                        "id": "PRICELINEFLIGHTS",
                        "displayName": "Priceline",
                        "logoUrl": "https://content.r9cdn.net/rimg/provider-logos/airlines/h/PRICELINEFLIGHTS.png?crop=false&width=166&height=62&fallback=default3.png&_v=b3e81884c7678f954cce1ed2c441273a"
                    },
                    "commerceName": "KayakFlightsMeta",
                    "currency": "USD",
                    "originalCurrency": "USD",
                    "seatAvailability": 0,
                    "taxesAndFees": 0,
                    "taxesAndFeesPerPassenger": 0,
                    "totalPrice": 86.18,
                    "totalPricePerPassenger": 86.18,
                    "fareBasisCodes": [],
                    "containedPurchaseLinks": [],
                    "partnerData": {},
                    "isPaid": false,
                    "fareAttributesList": [],
                    "url": "https://www.tripadvisor.com/CheapFlightsPartnerHandoff?searchHash=e7698b48f958e32740578c0fb9df4e5d&provider=Kayak|1|651&area=FLTCenterColumn|0|1|ItinList|13|Meta_ItineraryPrice&resultsServlet=CheapFlightsSearchResults&handoffPlatform=desktop&impressionId=&totalPricePerPassenger=86.18"
                },
                {
                    "purchaseLinkId": "Kayak|1|652",
                    "providerId": "Trip.com",
                    "partnerSuppliedProvider": {
                        "id": "CTRIPAIR",
                        "displayName": "Trip.com",
                        "logoUrl": "https://content.r9cdn.net/rimg/provider-logos/airlines/h/CTRIPAIR.png?crop=false&width=166&height=62&fallback=default1.png&_v=6ffbb6778ab7d3ee8da1e965010b225e"
                    },
                    "commerceName": "KayakFlightsMeta",
                    "currency": "USD",
                    "originalCurrency": "USD",
                    "seatAvailability": 0,
                    "taxesAndFees": 0,
                    "taxesAndFeesPerPassenger": 0,
                    "totalPrice": 87,
                    "totalPricePerPassenger": 87,
                    "fareBasisCodes": [],
                    "containedPurchaseLinks": [],
                    "partnerData": {},
                    "isPaid": false,
                    "fareAttributesList": [],
                    "url": "https://www.tripadvisor.com/CheapFlightsPartnerHandoff?searchHash=e7698b48f958e32740578c0fb9df4e5d&provider=Kayak|1|652&area=FLTCenterColumn|0|1|ItinList|13|Meta_ItineraryPrice&resultsServlet=CheapFlightsSearchResults&handoffPlatform=desktop&impressionId=&totalPricePerPassenger=87"
                },
                {
                    "purchaseLinkId": "Kayak|1|653",
                    "providerId": "Kiwi.com",
                    "partnerSuppliedProvider": {
                        "id": "SKYPICKER",
                        "displayName": "Kiwi.com",
                        "logoUrl": "https://content.r9cdn.net/rimg/provider-logos/airlines/h/SKYPICKER.png?crop=false&width=166&height=62&fallback=default3.png&_v=0cd3e94b7e8a5f027bff27942a213709"
                    },
                    "commerceName": "KayakFlightsMeta",
                    "currency": "USD",
                    "originalCurrency": "USD",
                    "seatAvailability": 0,
                    "taxesAndFees": 0,
                    "taxesAndFeesPerPassenger": 0,
                    "totalPrice": 93,
                    "totalPricePerPassenger": 93,
                    "fareBasisCodes": [],
                    "containedPurchaseLinks": [],
                    "partnerData": {},
                    "isPaid": false,
                    "fareAttributesList": [],
                    "url": "https://www.tripadvisor.com/CheapFlightsPartnerHandoff?searchHash=e7698b48f958e32740578c0fb9df4e5d&provider=Kayak|1|653&area=FLTCenterColumn|0|1|ItinList|13|Meta_ItineraryPrice&resultsServlet=CheapFlightsSearchResults&handoffPlatform=desktop&impressionId=&totalPricePerPassenger=93"
                },
                {
                    "purchaseLinkId": "Kayak|1|654",
                    "providerId": "Spirit Airlines",
                    "partnerSuppliedProvider": {
                        "id": "NK",
                        "displayName": "Spirit Airlines",
                        "logoUrl": "https://content.r9cdn.net/rimg/provider-logos/airlines/h/NK.png?crop=false&width=166&height=62&fallback=default1.png&_v=2ec6f00d181725322e6a0f66550c2c23"
                    },
                    "commerceName": "KayakFlightsMeta",
                    "currency": "USD",
                    "originalCurrency": "USD",
                    "seatAvailability": 0,
                    "taxesAndFees": 0,
                    "taxesAndFeesPerPassenger": 0,
                    "totalPrice": 100.78,
                    "totalPricePerPassenger": 100.78,
                    "fareBasisCodes": [],
                    "containedPurchaseLinks": [],
                    "fareBranding": {
                        "brandId": "Economy",
                        "carrierCode": "NK"
                    },
                    "partnerData": {},
                    "isPaid": false,
                    "fareAttributesList": [
                        {
                            "carryonAllowed": true,
                            "carryonFeeObj": {
                                "feeType": "PRESENT",
                                "feeValue": -1
                            },
                            "freeCheckedBagAllowance": 0,
                            "firstCheckedBagFee": -1,
                            "secondCheckedBagFee": -1,
                            "seatSelectionAllowed": true,
                            "seatSelectionFeeObj": {
                                "feeType": "PRESENT",
                                "feeValue": -1
                            },
                            "ticketChangeAllowed": true,
                            "ticketChangeFeeObj": {
                                "feeType": "PRESENT",
                                "feeValue": -1
                            },
                            "segmentIndices": [
                                0
                            ]
                        }
                    ],
                    "url": "https://www.tripadvisor.com/CheapFlightsPartnerHandoff?searchHash=e7698b48f958e32740578c0fb9df4e5d&provider=Kayak|1|654&area=FLTCenterColumn|0|1|ItinList|13|Meta_ItineraryPrice&resultsServlet=CheapFlightsSearchResults&handoffPlatform=desktop&impressionId=&totalPricePerPassenger=100.78"
                },
                {
                    "purchaseLinkId": "Kayak|1|655",
                    "providerId": "BudgetAir",
                    "partnerSuppliedProvider": {
                        "id": "BUDGETAIR",
                        "displayName": "BudgetAir",
                        "logoUrl": "https://content.r9cdn.net/rimg/provider-logos/airlines/h/BUDGETAIR.png?crop=false&width=166&height=62&fallback=default1.png&_v=177104dc3b6ae3c8860d2024a287fa08"
                    },
                    "commerceName": "KayakFlightsMeta",
                    "currency": "USD",
                    "originalCurrency": "USD",
                    "seatAvailability": 0,
                    "taxesAndFees": 0,
                    "taxesAndFeesPerPassenger": 0,
                    "totalPrice": 114,
                    "totalPricePerPassenger": 114,
                    "fareBasisCodes": [],
                    "containedPurchaseLinks": [],
                    "partnerData": {},
                    "isPaid": false,
                    "fareAttributesList": [],
                    "url": "https://www.tripadvisor.com/CheapFlightsPartnerHandoff?searchHash=e7698b48f958e32740578c0fb9df4e5d&provider=Kayak|1|655&area=FLTCenterColumn|0|1|ItinList|13|Meta_ItineraryPrice&resultsServlet=CheapFlightsSearchResults&handoffPlatform=desktop&impressionId=&totalPricePerPassenger=114"
                }
            ]
        },
        {
            "segments": [
                {
                    "legs": [
                        {
                            "originStationCode": "ORD",
                            "isDifferentOriginStation": false,
                            "destinationStationCode": "FLL",
                            "isDifferentDestinationStation": false,
                            "departureDateTime": "2023-10-31T16:30:00-05:00",
                            "arrivalDateTime": "2023-10-31T20:38:00-04:00",
                            "classOfService": "ECONOMY",
                            "marketingCarrierCode": "NK",
                            "operatingCarrierCode": "NK",
                            "equipmentId": "Airbus A321 (sharklets)",
                            "amenities": [],
                            "flightNumber": 1986,
                            "seatGuruEquipmentId": 0,
                            "seatGuruAirlineUrl": "",
                            "numStops": 0,
                            "distanceInKM": 1907.8438,
                            "isInternational": false,
                            "selfTransfer": false,
                            "operatingCarrier": {
                                "locationId": 8729157,
                                "code": "NK",
                                "logoUrl": "https://static.tacdn.com/img2/flights/airlines/logos/100x100/Spirit_Logo_Updated_1.jpg",
                                "displayName": "Spirit"
                            },
                            "marketingCarrier": {
                                "locationId": 8729157,
                                "code": "NK",
                                "logoUrl": "https://static.tacdn.com/img2/flights/airlines/logos/100x100/Spirit_Logo_Updated_1.jpg",
                                "displayName": "Spirit"
                            }
                        },
                        {
                            "originStationCode": "FLL",
                            "isDifferentOriginStation": false,
                            "destinationStationCode": "ATL",
                            "isDifferentDestinationStation": false,
                            "departureDateTime": "2023-10-31T21:10:00-04:00",
                            "arrivalDateTime": "2023-10-31T23:11:00-04:00",
                            "classOfService": "ECONOMY",
                            "marketingCarrierCode": "NK",
                            "operatingCarrierCode": "NK",
                            "equipmentId": "Airbus A320 (sharklets)",
                            "amenities": [],
                            "flightNumber": 1232,
                            "seatGuruEquipmentId": 0,
                            "seatGuruAirlineUrl": "",
                            "numStops": 0,
                            "distanceInKM": 937.67816,
                            "isInternational": false,
                            "selfTransfer": false,
                            "operatingCarrier": {
                                "locationId": 8729157,
                                "code": "NK",
                                "logoUrl": "https://static.tacdn.com/img2/flights/airlines/logos/100x100/Spirit_Logo_Updated_1.jpg",
                                "displayName": "Spirit"
                            },
                            "marketingCarrier": {
                                "locationId": 8729157,
                                "code": "NK",
                                "logoUrl": "https://static.tacdn.com/img2/flights/airlines/logos/100x100/Spirit_Logo_Updated_1.jpg",
                                "displayName": "Spirit"
                            }
                        },
                        {
                            "originStationCode": "ATL",
                            "isDifferentOriginStation": false,
                            "destinationStationCode": "LAX",
                            "isDifferentDestinationStation": false,
                            "departureDateTime": "2023-11-01T07:10:00-04:00",
                            "arrivalDateTime": "2023-11-01T09:02:00-07:00",
                            "classOfService": "ECONOMY",
                            "marketingCarrierCode": "NK",
                            "operatingCarrierCode": "NK",
                            "equipmentId": "Airbus A320neo",
                            "amenities": [],
                            "flightNumber": 1829,
                            "seatGuruEquipmentId": 0,
                            "seatGuruAirlineUrl": "",
                            "numStops": 0,
                            "distanceInKM": 3128.887,
                            "isInternational": false,
                            "selfTransfer": true,
                            "operatingCarrier": {
                                "locationId": 8729157,
                                "code": "NK",
                                "logoUrl": "https://static.tacdn.com/img2/flights/airlines/logos/100x100/Spirit_Logo_Updated_1.jpg",
                                "displayName": "Spirit"
                            },
                            "marketingCarrier": {
                                "locationId": 8729157,
                                "code": "NK",
                                "logoUrl": "https://static.tacdn.com/img2/flights/airlines/logos/100x100/Spirit_Logo_Updated_1.jpg",
                                "displayName": "Spirit"
                            }
                        }
                    ],
                    "layovers": [
                        {
                            "durationType": "SHORT",
                            "hasStationChange": false,
                            "durationInMinutes": 32
                        },
                        {
                            "durationType": "LONG",
                            "hasStationChange": false,
                            "durationInMinutes": 479
                        }
                    ]
                }
            ],
            "purchaseLinks": [
                {
                    "purchaseLinkId": "Kayak|1|250",
                    "providerId": "mytrip.com",
                    "partnerSuppliedProvider": {
                        "id": "AIRTICKETS24DOTCOMVI",
                        "displayName": "mytrip.com",
                        "logoUrl": "https://content.r9cdn.net/rimg/provider-logos/airlines/h/AIRTICKETS24DOTCOM.png?crop=false&width=166&height=62&fallback=default1.png&_v=1e84439f35e4558f94e874158f6a3eae"
                    },
                    "commerceName": "KayakFlightsMeta",
                    "currency": "USD",
                    "originalCurrency": "USD",
                    "seatAvailability": 0,
                    "taxesAndFees": 0,
                    "taxesAndFeesPerPassenger": 0,
                    "totalPrice": 85.26,
                    "totalPricePerPassenger": 85.26,
                    "fareBasisCodes": [],
                    "containedPurchaseLinks": [],
                    "partnerData": {},
                    "isPaid": false,
                    "fareAttributesList": [],
                    "url": "https://www.tripadvisor.com/CheapFlightsPartnerHandoff?searchHash=e7698b48f958e32740578c0fb9df4e5d&provider=Kayak|1|250&area=FLTCenterColumn|0|1|ItinList|14|Meta_ItineraryPrice&resultsServlet=CheapFlightsSearchResults&handoffPlatform=desktop&impressionId=&totalPricePerPassenger=85.26"
                }
            ]
        }
    ]
}

init();