$(document).ready(function () {
    $(".navbar").hide();
    $(".footer").hide();

    var resultItems = [];

    // Pulls info from Ticketmaster API based on keyword search
    function ticketmasterQueryURL() {
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
        console.log("keyword is: ", queryParams.keyword);
        queryParams.city = $("#eventCity").val().trim();
        console.log("city is: ", queryParams.city);
        $("#eventCategory").val().trim() === "Select Category" ? queryParams.classificationName = "" : queryParams.classificationName = $('#eventCategory').val().trim();
        // if( $("#eventCategory").val().trim() !== "Select Category")
        // queryParams.classificationName = $("#eventCategory").val().trim();
        // else
        // queryParams.classificationName = "";
        console.log("category is: ", queryParams.classificationName);

        console.log("Query: " + queryURL + $.param(queryParams));

        var finalURL = queryURL + "keyword=" + queryParams.keyword + "&city=" + queryParams.city + "&classificationName=" + queryParams.classificationName + "&size=" + queryParams.size + "&apikey=" + queryParams.apikey;
        console.log("final url is ", finalURL);
        return finalURL;
    }

    // Pulls info from Open Brewery API based on event location
    function breweryQueryURL() {
        var brewURL = "https://api.openbrewerydb.org/breweries?";

        // Store query parameters needed to get from this API
        var brewParams = {
            "city": " "
        };

        brewParams.city = $("#eventCity").val().trim();
        console.log("brewery location is: ", brewParams.city);

        var finalBrewURL = brewURL + "by_city=" + brewParams.city;
        console.log("Brewery url is ", finalBrewURL);
        return  finalBrewURL;

    }

    // Display breweries from Open Brewery API
    function displayBreweries() {
        var queryURL = breweryQueryURL();
        event.preventDefault();

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response) {

            console.log("This is the response ", response);
            for (var j = 0; j < response.length; j++) {

                var breweries = {
                    name: response[j].name,
                    street: response[j].street,
                    city: response[j].city,
                    state: response[j].state,
                    zipcode: response[j].postal_code,
                    phone: response[j].phone,
                    website: response[j].website_url
                }

                console.log("breweries are ", breweries.name);
                var newRow = $("<tr>");
                
                var brewName = $("<a target='_blank'>");
                brewName.html("<td>" + breweries.name + "</td>");
                brewName.attr("href", breweries.website);
                // brewName.text(breweries.name);
                newRow.append(brewName);

                var brewAddress = $("<td>");
                brewAddress.text("Address: " + breweries.street + ", " + breweries.city + ", " + breweries.state + ", " + breweries.zipcode);
                newRow.append(brewAddress);
                
                var brewPhone = $("<td>");
                brewPhone.text("Phone: " + breweries.phone);
                newRow.append(brewPhone);
                
                $("#breweries-table > tbody").append(newRow);
                // var newRow = $("<tr>").append(
                //     $("<a>", {
                //         text: breweries.name,
                //         title: "Brewery Website",
                //         href: breweries.website,
                //         click: function () { ignoreThisRandomFunction(options.rowId); return false; }
                //     }).appendTo("<tr>"),
                //     $("<td>").text("Address: " + breweries.street + ", " + breweries.city + ", " + breweries.state + ", " + breweries.zipcode),
                //     $("<td>").text("Phone: " + breweries.phone),
                // );
                

            };
        });

    };

    // Display events from the Ticket Master API
    function displayEvents(response) {
        console.log("response is: ", response);
        var results = response._embedded;
        $('#cardHolder').empty();
        // for loop goes through each event info
        for (var i = 0; i < results.events.length; i++) {
            console.log("Event items is ", results.events[0]);

            var resultItem = results.events[i];

            var eventItem = {
                name: results.events[i].name,
                imageURL: results.events[i].images[8].url,
                venue: results.events[i]._embedded.venues[0].name + " in " + results.events[i]._embedded.venues[0].city.name,
                date: results.events[i].dates.start.localDate,
                time: results.events[i].dates.start.localTime,
                ticket: results.events[i].url
            };
            resultItems.push(eventItem); // push item into a temp array

            var newCard = $("<div>");
            newCard.addClass("card col-lg-12");
            newCard.attr("id", eventItem.id);

            var newRow = $("<div>");
            newRow.addClass("row");

            var containerCardHeader = $("<div>");
            containerCardHeader.addClass("col-lg-4");

            var cardHeader = $("<div>");
            cardHeader.addClass("card-header");
            containerCardHeader.append(cardHeader);

            //Event Date
            var eventDate = $("<div>");
            eventDate.addClass("badge badge-primary col-lg-12");
            // eventDate.id("dateTime");
            eventDate.html(eventItem.date + " at " + eventItem.time);
            cardHeader.append(eventDate);

            //Event Image
            var eventImg = $("<img>");
            eventImg.addClass("card-img-top");
            eventImg.attr("src", eventItem.imageURL);
            eventImg.attr("id", eventItem.id);
            cardHeader.append(eventImg);

            var cardDivContainer = $("<div>");
            cardDivContainer.addClass("col-lg-8");

            var cardBody = $("<div>");
            cardBody.addClass("card-body col-lg-12")

            //Event Name
            var h3 = $("<h3>");
            h3.addClass("card-title");
            h3.text(eventItem.name);

            //Event Venue
            var h4 = $("<h4>");
            h4.addClass("card-text");
            h4.text(eventItem.venue)

            //Event Tickets 
            var ticketButton = $("<a target='_blank'>");
            ticketButton.addClass("btn btn-outline-primary");
            ticketButton.attr("href", eventItem.ticket);
            ticketButton.attr("id", eventItem.id)
            ticketButton.html("<i class='fas fa-ticket-alt'>" + "</i>" + " Get Tickets");

            // Brewery Button
            var brewButton = $("<button data-toggle='modal' data-target='.bd-example-modal-lg'>");
            brewButton.addClass("btn btn-outline-danger");
            brewButton.html("<i class='fas fa-beer'>" + "</i>" + " Fetch for nearby Breweries!");

            cardBody.append(h3);
            cardBody.append(h4);
            cardBody.append(ticketButton);
            cardBody.append(brewButton);

            cardDivContainer.append(cardBody);

            newRow.append(containerCardHeader);
            newRow.append(cardDivContainer);

            newCard.append(newRow);

            $("#cardHolder").prepend(newCard);
        };
        // End of loop

        // Brewery button handler
        $(".btn-outline-danger").on("click", function (event) {
            event.preventDefault();
            $("#pop-up").show();
            displayBreweries();


        });

    }

    //Event handler on click

    $("#searchBtn").on("click", function (event) {
        event.preventDefault();
        $(".jumbotron").hide();
        $(".navbar").show();
        $(".footer").show();
        var queryURL = ticketmasterQueryURL();

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(displayEvents);
    
    });

    $("#searchNav").on("click", function () {
        $(".jumbotron").show();
        $(".navbar").hide();
        $('#cardHolder').empty();

    });


});