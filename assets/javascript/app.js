$(document).ready(function () {
    $(".navbar").hide();
    $(".footer").hide();

    var resultItems = [];
    // var page = 0

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



    // Display events from the API
    function displayEvents(response) {
        console.log("response is: ", response);
        var results = response._embedded;
        $('#cardHolder').empty();
        // for loop goes through each event info
        for (var i = 0; i < results.events.length; i++) {
            console.log("Event items is ", results.events[0]);

            var resultItem = results.events[i];
            console.log("Result Item is ", resultItem)

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
            brewButton.html("<i class='fas fa-beer'>" + "</i>" + " Fetch for nearby Breweries!")

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

        $("btn-outline-danger").on("click ", function () {
            $("#pop-up").show();

        });
    }

    //Event handler on click

    $("#searchBtn").on("click", function (event) {
        event.preventDefault();
        $(".jumbotron").hide();
        $(".navbar").show();
        $(".footer").show();
        var queryURL = buildQueryURL();

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(displayEvents);

    });

    $("#searchNav").on("click", function () {
        $(".jumbotron").show();
        $(".navbar").hide();
    });


});