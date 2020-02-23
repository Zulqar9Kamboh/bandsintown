# Bandsintown
This is a test project and this project is about to search the artist and their upcoming events.

## Quick Start
> To run this web app just download from github and open the `index.html` in your browser.

1. Type the **Artis Name** in search box press enter or click on the search icon
2. If query matches you will get an **Artist Info Card**
3. Artist info card will have these information:
   - Artist Full Name
   - Artist Thumb Img *(if any)*
   - Artist Facebook Page *(if any)*
   - and Artist Upcoming Events *(if any)*
4. If the Artist have upcoming events there is a CTA for that by click that CTA you will see the list of events
5. If you are on event list *preview* click on back to search button to search an other artist

## Not Completed/Included
1. Unit Test
2. Documentation


***
## Task Details
Create a single-page web application that takes an artist from the user and returns details
about the artist and their events. The aim of the code challenge is to be able to understand
the decisions made in building a web application. 

## Requirements:
Create a web application using html, css and js along with any framework/libraries of your
choice. The web application being created will be used to take an artist and show details
about the artist and their events.

### The application should contain at least the following UI:

1. A way to input the artist’s name.
2. Show results based on the input of the artist’s name:
   - Artist Name
   - Artist Picture
   - Artist Facebook URL
   - Artist Events
     - Event Venue
     - Event City
     - Event Country
     - Event Date
3. Unit tests of your JS code
4. Styling
   
**Provide any necessary instructions we will need to be able to run and test your project.**

## API:
> Bands in Town has a an API available with documentation at:
> https://app.swaggerhub.com/apis/Bandsintown/PublicAPI/3.0.0

### Note:
- Providing the app_id is required by the api on every request, it can be any string.
- Base URL for the end points can be found at the top of the documentation page.

## Bonus Features
Here are some suggestions to make the app even better.
1. Cache - Persist the last entered artist and events across browser reloads/refreshes
2. Creative? - Think of a cool feature? Add it!
3. Deploy - Include a deploy strategy for your app.