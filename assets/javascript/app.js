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
        console.log("final url is ",finalURL);
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

    $("#drink-search-btn").on("click", function (e) {
        e.preventDefault();

        // Brewery API
        var otherQueryUrl = "https://api.openbrewerydb.org/breweries?" + 
                'austin';

        $.ajax({
            url: otherQueryUrl,
            method: 'GET'
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

});