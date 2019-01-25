$(document).ready(function() {

// Build API request url
var corsProxy = "https://cors-anywhere.herokuapp.com/";
var endpointUrl = "https://app.ticketmaster.com/discovery/v2/events.json?";
var fullUrl = corsProxy + endpointUrl;

// API key
var apiKey = 'cOCftMAgGiO3Vo0MIfTweGnJzcyFzoun';

// GET parameters to include
var params = {
    term: "food",
    location: "San Diego"
};

// Make API request
$.ajax({
        url: fullUrl,
        data: params,
        beforeSend: function (xhr) {
            xhr.setRequestHeader(
                'Authorization',
                'Bearer ' + apiKey
            )
        }
    })
    .then(
        function (response) {
            console.log('success:', response);
        },
        function (error) {
            console.log('error:', error);
        }
    );
});