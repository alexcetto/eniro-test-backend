const express = require('express');
const dotenv = require('dotenv');
const debug = require('debug')('api');
const bodyParser = require('body-parser');
const basicSearch = require('./controllers/basic-search');
const searchFields = require('./controllers/search-fields');


const apiKey = process.env.APIKEY;
const apiProfile = process.env.APIPROFILE;
// Check if user has his keys set up
if(!apiKey) {
	debug('User must set Eniro API key in the env. APIKEY=bla node index.js');
	process.exit(-1);
} else if(!apiProfile) {
	debug('User must set Eniro API profile in the env. APIPROFILE=bla node index.js');
	process.exit(-1);
}

// Set up express
const app = express();

app.use(bodyParser.json());  
app.use(bodyParser.urlencoded({ extended: false }));

const router = express.Router();

dotenv.load();

app.set('port', (process.env.PORT || 5000));

app.set('view engine', 'ejs');

// Serve static files
app.use(express.static('public'))

// Our basic route
router.get('/', function(req, res) {
  res.redirect('/enirotest');
});

router.get('/enirotest', (req, res) => {
	const allowedFilters = ['eniroId', 'companyInfo', 'address', 
		'location', 'phoneNumbers', 'homepage', 
		'facebook', 'companyReview', 'infoPageLink'];
	res.render('pages/index', {
		allowedFilters: allowedFilters
	});
});

// This is the basic search. It returns all results with all fields for multiple keywords.
router.post('/basic_search', function(req, res) {
  basicSearch(req.body.words).then(function(bodyResults) {
  	return res.send(bodyResults);
  }).catch(function(err) {
  	debug(err);
  	return res.status(500).send(err);
  });
});

router.post('/search_fields', function(req, res) {
  searchFields(req.body.words, req.body.fields).then(function(bodyResults) {
  	return res.send(bodyResults);
  }).catch(function(err) {
  	debug(err);
  	return res.status(500).send(err);
  });
});

router.post('/search_fields_view', function(req, res) {
	const words = req.body.words.split(',');
	const fields = req.body.fields.split(',');

	debug(words, fields);

  searchFields(words, fields).then(function(bodyResults) {
  	return res.send(bodyResults);
  }).catch(function(err) {
  	debug(err);
  	return res.status(500).send(err);
  });

});

app.use('', router);

// Error Handling
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// Error handling
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.send(err);
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
