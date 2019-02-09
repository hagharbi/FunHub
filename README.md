# project_one
API project
This Web App helps users to find events based on their selected location. When the results are displayed, the user will have to select the desired event and then the selected event will show detailed info as well as the nearest breweries within the user’s location.

What it does:
- Allows users to search for specific events anywhere
- Shows users a handful of options to choose from
- Links them to a place to buy tickets for their chosen event
If a user so chooses...
- They can view a list of popular breweries nearby their chosen event(s)
- Displays the brewery name, address, and website

Front-End:
Users can enter any sort of event type or search for a specific event.
The search can be done following criterias such as:
- Topics or Keywords
- City
- Event Category

When a user hits ‘search’, events are displayed according to his/her input
Along with the events information there will be a button to get to a third party website to buy ticket 
Or he/she can click on an adjacent button to check for breweries around the event area.

When users click “Fetch for nearby Breweries!”, local breweries nearby the corresponding event location display in a  pop-up modal.
It shows multiple pieces of info about each brewery:
- Name of Brewery
- Address
- Phone #
- Website

APIs Used:
1. Ticketmaster API
    - Name of event
    - Image for event
    - Venue and city name
    - Date and time of event
    - URL to available tickets
2. Open Brewery DB API
    - Name of brewery
    - Location
    - Phone Number
    - URL to brewery’s website
    
Technologies Used:
Bootstrap CSS Framework, jQuery, Javascript, HTML5, Ajax.


