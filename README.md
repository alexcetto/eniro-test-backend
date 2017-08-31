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

## Single page app

Open a browser and go to http://localhost:5000/enirotest or http://localhost:5000/ the request webapp for the API.

This page was done using ejs. I am used to Angular but it seemed a little overkill for the page goal.

As you will see, the style is pretty basic but functional.