$(document).ready(function () {

    // Pulls info from Ticketmaster API based on keyword search
    function buildQueryURL() {
        var queryURL = "https://app.ticketmaster.com/discovery/v2/events.json?";
        // https: //app.ticketmaster.com/discovery/v2/events.json?keyword=superbowl&size=10&apikey=cOCftMAgGiO3Vo0MIfTweGnJzcyFzoun

        var queryParams = {
            "keyword": " ",
            "size": 10,
            "apikey": "cOCftMAgGiO3Vo0MIfTweGnJzcyFzoun",

        };

        queryParams.keyword = $("#searchEvent").val().trim();

        console.log("Query: " + queryURL + $.param(queryParams));

        var finalURL = queryURL + "keyword=" + queryParams.keyword + "&size=" + queryParams.size + "&apikey=" + queryParams.apikey;
        console.log("final url is ", finalURL);
        return finalURL;
    };

    function searchStuffs() {
        
        event.preventDefault();

        var queryURL = buildQueryURL();

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response){
            console.log("response is: ",response);
            
            for (var i = 0; i < response._embedded.events.length; i++) {

            var eventName = response._embedded.events[i].name;
            console.log("event name is: ", eventName);
            $("#EventCards").append("<p>" + eventName + "</p>");

            };


        });
    };

    //CLICK HANDLERS
    //=====================================================
    $("#searchBtn").on("click", function (event) {
        searchStuffs();
    });
    
    $("#searchEvent").keypress(function(f){
        if(f.which === 13) {
            searchStuffs();
        }
    });


    // Click function for not-yet-implentmented UI in html
    $("#drink-search-btn").on("click", function (e) {
        e.preventDefault();

        // Brewery API
        var otherQueryUrl = "https://api.openbrewerydb.org/breweries?by_city=" + 

            // City from other API (not sure if this can dig into other API outside of the other function)
            response._embedded.events[i].venues.city.name;

        $.ajax({
            url: otherQueryUrl,
            method: 'GET'
        })
        .then(
            // Populate the name of the brewery, it's full address, phone number, and a link to it's website
            // Need to either create these fields via JS or have them in the html and hidden
            function (brewery) {
                $("#brewery-name").text(brewery.name);
                $("#brewery-address").text(
                    brewery.street +
                    " " +
                    brewery.city +
                    " " + 
                    brewery.state +
                    " " +
                    brewery.postal_code);
                $("#brewery-phone").text(brewery.phone);
                $("#brewery-website").text(brewery.name);
                $("#brewery-website").attr("href", brewery.website_url);
                console.log('success:', brewery);
            },
            function (error) {
                console.log('error:', error);
            }
        );
    
    });
});