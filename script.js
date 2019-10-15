'use strict';

$(document).ready(function() {
  watchSubmitForm();
});

const apiKey = "axycHWSUOV2i4BMj1vIAdvJD2UkJeQAaqC9lp7dC";
const searchURL = "https://developer.nps.gov/api/v1/parks/";

function formatQueryParams(params) {
    const queryItems = Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`);
    return queryItems.join("&");
}

function displayResults(responseJson) {
    console.log(responseJson);
    $('#results-list').empty();
    for (let i = 0; i < responseJson.items.length; i++){
        $('#results-list').append(
                            `<li><h3>${responseJson.items[i].fullName}</h3>
                        <p>${responseJson.items[i].description}</p>
                <a ref='${responseJson.items[i].url}'> Park's Website</a>
            </li>`
        )}; 
    $('#results-list').removeClass('hidden');
};

function getNationalParks(query, limit = 10) {
    const params = {
        stateCode: query,
        limit,
        api_key: apiKey
    };
  
    const queryString = formatQueryParams(params);
    const url = searchURL + "?" + queryString;
    console.log(url);
  
    fetch(url)
    .then(response => {
        if (response.ok) {
            return response.json();
        }
    })
    .then(responseJson => displayResults(responseJson))
    .catch(err => {
        console.log(err);
        alert("Something went wrong!");
    });
}

function watchForm() {
    $("#search-form").submit(e => {
        event.preventDefault();
    const searchTerm = $("#state-input").val();
    const maxResults = $("#number-input").val();
    getNationalParks(searchTerm, maxResults);
    });
  }
  
