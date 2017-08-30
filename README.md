# eniro-test-backend

This project is an assignment assessing my skills.

## Run it

To run this project, use `npm install` to install dependancies then `npm start`.

## ENV

The project uses ENV vars.

List: 

- APIKEY : The key to the API
- PROFILEKEY : The profile name
- DEBUG : Choose what debug level you want

Example: 

`APIKEY=thekeystring PROFILEKEY=profilename DEBUG=*  npm start`

## Search a keyword

To use the basic search, perform a POST on localhost:5000/basic_search. I tested a x-www-form-urlencoded request.

This project was developed using node v8.4 and npm v5.3.