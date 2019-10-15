'use strict';

const apiKey = "axycHWSUOV2i4BMj1vIAdvJD2UkJeQAaqC9lp7dC";
const searchURL = "https://developer.nps.gov/api/v1/parks";

$(document).ready(function() {
    watchForm();
});

function watchForm() {
    $("#search-form").submit(e => {
        event.preventDefault();
    let searchTerm = $("#state-input").val();
    let maxResults = $("#number-input").val();
    getNationalParks(searchTerm, maxResults);
    });
}

function formatQueryParams(params) {
    const queryItems = Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`);
    return queryItems.join('&');
}

function displayResults(responseJson) {
    console.log(responseJson);
    $('#results-list').empty();
    for (let i = 0; i < responseJson.data.length; i++){
        $('#results-list').append(
                            `<li><h3>${responseJson.data[i].fullName}</h3>
                        <p>${responseJson.data[i].description}</p>
                <a href=" ${responseJson.data[i].url}">Visit Website</a>
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
        throw new Error(response.statusText);
    })
    .then(responseJson => displayResults(responseJson))
    .catch(err => {
        console.log(err);
        alert("Something went wrong!");
    });
}
  