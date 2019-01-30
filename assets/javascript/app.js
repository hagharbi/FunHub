$(document).ready(function () {
    var resultItems = [];

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
        // for loop goes through each event info
        for (var i = 0; i < results.events.length; i++) {
            console.log("Event items is ", results.events[0]);
        
        var resultItem = results.events[i];
        console.log("Result Item is ",resultItem)
        
        var eventItem = {
            name: results.events[i].name,
            imageURL: results.events[i].images[8].url,
            venue: results.events[i]._embedded.venues[0].name + " in " + results.events[i]._embedded.venues[0].city.name,
            date: results.events[i].dates.start.localDate,
            ticket: results.events[i].url
        };
        resultItems.push(eventItem); // push item into a temp array

        var newCard = $("<div>");
        newCard.addClass("card");
        newCard.attr("id", eventItem.id);

        var newRow = $("<div>");
        newRow.addClass("row");

        var containerCarHeader = $("<div>");
        containerCarHeader.addClass("col-lg-4");

        var cardHeader = $("<div>");
        cardHeader.addClass("card-header");
        containerCarHeader.append(cardHeader);

        //Event Date
        var eventDate = $("<div>");
        eventDate.addClass("badge badge-primary col-lg-6");
        // eventDate.id("dateTime");
        eventDate.html("DATE: " + eventItem.date);
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
        ticketButton.attr("href",eventItem.ticket);
        ticketButton.attr("id", eventItem.id)
        ticketButton.text("Get Tickets");
        

        cardBody.append(h3);
        cardBody.append(h4);
        cardBody.append(ticketButton);

        cardDivContainer.append(cardBody);

        newRow.append(containerCarHeader);
        newRow.append(cardDivContainer);

        newCard.append(newRow);

        $("#cardHolder").append(newCard);


        };
        // End for loop

            
    }


    //Event handler on click

    $("#searchBtn").on("click", function (event) {
        event.preventDefault();

        var queryURL = buildQueryURL();

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(displayEvents); 

    });
});