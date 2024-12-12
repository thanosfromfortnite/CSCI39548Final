# Market Watch for Old School Runescape
*Jesse Han*
Github Repository: https://github.com/thanosfromfortnite/CSCI39548Final

Associated slides: https://docs.google.com/presentation/d/1u7Maj5eQu5nyCRChtr8ED7bEkTxAb9Vlestp4aq9TF8/edit?usp=sharing

This is a tool to view recent price history of Old School Runescape’s (OSRS) Grand Exchange (GE), a feature of the game that allows players to make asynchronous trade offers for each item in the game.

It will allow the user to search through a list of available in-game items sourced from a snapshot of its cache and select any tradeable item to view a recent price history and some tertiary information, such as its trade volume.

The project uses the Express framework to fetch resources and make them readily available to render in a React app.

## APIs used:
**OSRSBOX DB**, to retrieve a list of items in OSRS as well as their properties, such as in-game value (determined by a constant set by the game and independent of its GE price). The full list of items is requested on startup and processed to filter out untradeable items and irrelevant information, as the list includes miscellaneous properties that aren’t necessary for our purposes (such as whether it’s equipable or not, on which equipment slot, stats etc.)
https://www.osrsbox.com/projects/osrsbox-db/

**Weird Gloop API**, run by the hosts of Old School Runescape’s Wiki (and now Minecraft and League of Legends’ wikis), which fetches GE prices and offers endpoints to view a 90 day price history, as well as trade volume. It’s called when the user selects an item to view its exchange prices. When an item is selected, a request is made to the server and the API calls are made there, then the relevant information is returned to the client to be rendered.
https://api.weirdgloop.org/#/exchange

## Libraries used:
**Plotly JS**, to graph the relevant data.
https://plotly.com/javascript/

Currently there is no data persistence. It would have existed in the original plan, and the process would have worked like so:
* Instead of making an API call to Weird Gloop when a user looks up an item, it would have made regular calls every set amount of time and stored price information onto a database.
* Then, when the user looks up an item, it would pull price information directly from the database instead of making a new call to the Weird Gloop API

However, there were some limitations that prevented this from happening.
* Weird Gloop does not have an endpoint to get a price summary of all of its available items. Therefore, in order to get the price of every item in the game (especially continuously), an individual new call must be made for each item, of which there are over 3,000 of.
* The server would have to be continuously running to gather data. Otherwise, the price data would be very spotty and would miss large chunks

To run either the client or server (the client needs the server to function), use npm start run on their respective folders.
