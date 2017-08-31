# eniro-test-backend

This project is an assignment assessing my skills.

This project was developed using node v8.4 and npm v5.3.

## Install

To run this project, use `npm install` to install dependancies.

## ENV

The project uses ENV vars to configure the project.

List: 

- APIKEY : The key to the API
- PROFILEKEY : The profile name
- DEBUG : Choose what debug level you want

Example: 

`APIKEY=thekeystring PROFILEKEY=profilename DEBUG=*  npm start`

## Search a keyword

Two routes are available to request:

`/basic_search` which get the results for multiple words, **without** filtering.

```bash
curl -X POST \
  http://localhost:5000/basic_search \
  -H 'cache-control: no-cache' \
  -H 'content-type: application/x-www-form-urlencoded' \
  -d 'words=pizza&words=kebab'
  ```


`/search_fields` which get the results for multiple words, **with** filtering.

```bash
curl -X POST \
  http://localhost:5000/search_fields \
  -H 'cache-control: no-cache' \
  -H 'content-type: application/x-www-form-urlencoded' \
  -d 'words=pizza&words=taxi&fields=companyInfo'
  ```

## Single page app

Open a browser and go to http://localhost:5000/enirotest or http://localhost:5000/ to access the webapp for the API.

This page was done using ejs. I am used to Angular but it seemed a little overkill for the page goal so I settled for ejs. I never used it before but it is pretty cool.

As you will see, the style is pretty basic but functional.

## Time spent

- 30/08: 7 hours
- 31/08: 4 hours
