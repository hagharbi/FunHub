$(document).ready(function () {

    // Pulls info from Ticketmaster API based on keyword search
    function buildQueryURL() {
        var queryURL = "https://app.ticketmaster.com/discovery/v2/events.json?";
        // https://app.ticketmaster.com/discovery/v2/events.json?keyword=football&city=denver&classificationName=sports&size=10&apikey=cOCftMAgGiO3Vo0MIfTweGnJzcyFzoun

        // Stores Query Parameters needed to get from API
        var queryParams = {
            "keyword": " ",
            "city": " ",
            "classificationName": " ",
            "size": 10,
            "apikey": "cOCftMAgGiO3Vo0MIfTweGnJzcyFzoun",

        };

        queryParams.keyword = $("#eventKey").val().trim();
        queryParams.city = $("#eventCity").val().trim();
        queryParams.classificationName = $("#eventCategory").val().trim();

        console.log("Query: " + queryURL + $.param(queryParams));

        var finalURL = queryURL + "keyword=" + queryParams.keyword + "&city" + queryParams.city + "&classificationName" + queryParams.classificationName + "&size=" + queryParams.size + "&apikey=" + queryParams.apikey;
        console.log("final url is ", finalURL);
        return finalURL;
    }


    //CLICK HANDLERS
    //=====================================================

    $("#searchBtn").on("click", function (event) {
        event.preventDefault();

        var queryURL = buildQueryURL();

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            console.log("response is: ", response);

            // for loop goes through each event info
            for (var i = 0; i < response._embedded.events.length; i++) {

                // Create Event Card to hold the results
                var displayEvent = $("<div>");
                displayEvent.addClass("card-body align-items-center");


                var eventName = response._embedded.events[i].name;
                console.log("event name is: ", eventName);
                $(".card-body").append("<p>" + eventName + "</p>")

                var eventVenue = response._embedded.events[i]._embedded.venues[0].name;
                console.log("event venue is: ", eventVenue);
                $(".card-body").append("<p>" + eventVenue + "</p>")

            };


        });
    });
});