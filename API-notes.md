# API documentation notes

## Trip advisor

- Base URL: https://tripadvisor16.p.rapidapi.com/api/v1/{ENDPOINT}

### Useful Endpoints
- flights/searchFlights
    - Required:
    - sourceAirportCode={3 letter code}
    - destinationAirportCode={3 letter code}
    - date={YYYY-MM-DD}
    - itineraryType={ONE_WAY | ROUND_TRIP}
    - sortOrder={ML_BEST_VALUE | DURATION | PRICE |EARLIEST_OUTBOUND_DEPARTURE | EARLIEST_OUTBOUND_ARRIVAL | LATEST_OUTBOUND_DEPARTURE | LATEST_OUTBOUND_ARRIVAL}
    - numAdults={num}
    - numSeniors={num}
    - classOfService{ECONOMY | PREMIUM_ECONOMY | BUSINESS | FIRST}
    - Optional:
    - returnDate={YYYY-MM-DDYYYY-MM-DD}
    - currencyCode={currency code for search results}

### Output
- status
- message
- timestamp
- data
    - session
    - complete
    - numOfFilters
    - totalNumResults
    - flights[]
        - segments[] : Layovers etc.
        - purchaseLinks [] : listings for given flight
            - purchaseLinkId
            - providerId:                   *
            - partnerSuppliedProvider[]
                - id
                - displayName
                - logoUrl
            - commerceName                  * 
            - currency                      *
            - originalCurrency              *
            - seatAvailable
            - taxesAndFees
            - TaxesAndFeesPerPassenger
            - totalPrice                    *
            - totalPricePerPassenger
            - fareBasisCodes[]
            - containedPurchaseLinks[]
            - partnerData
            - isPaid
            - fareAttributesList[]
            - url                           *


## World Airports Directory

- Base URL: https://world-airports-directory.p.rapidapi.com/v1/airports/{city/airport code}?{options}

### Options
- page={page index}: 
- limit={number of results per page (10 default, 20 max)}:
- sortby={field:order} : field {any of fields from JSON result} order {asc|desc}

### Output:
- results: Array
    - isActive      *
    - AirportName   *
    - city          *
    - country       *
    - AirportCode   *
    - citycode
    - lat
    - long
    - timzone       **
    - cityunicode
    - zone
    - CountryCode
    - id
- page: Num
- limit: Num
- totalPages: Num
- totalResults: Num