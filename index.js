const express = require('express');
const dotenv = require('dotenv');
const debug = require('debug')('api');
const bodyParser = require('body-parser');
const controllers = require('./controllers');


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

// Our basic route
router.get('/', function(req, res) {
  res.send('You are on the homepage');
});

// This is the basic search. It returns all results with all fields for multiple keywords.
router.post('/basic_search', function(req, res) {
  controllers(req.body.words).then(function(bodyResults) {
  	return res.send(bodyResults);
  }).catch(function(err) {
  	debug(err);
  	return res.status(500).send(err);
  });

  // return res.send(body);
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
