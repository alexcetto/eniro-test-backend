const request = require('request-promise');
const debug = require('debug')('search-fields');
const basicSearch = require('./basic-search')

const apiKey = process.env.APIKEY;
const apiProfile = process.env.APIPROFILE;
// Check if user has his keys set up
if(!apiKey) {
	debug('User must set Eniro API key in the env. APIKEY=thekeystring node index.js');
	process.exit(-1);
} else if(!apiProfile) {
	debug('User must set Eniro API profile in the env. APIPROFILE=theprofilename node index.js');
	process.exit(-1);
}

searchWithFields = function(words, fields) {
	return basicSearch(words).then((results) => {
		debug(results);
		filterResults(results.adverts, fields);
	});
}

function filterResults(results, fields) {
	return results.map((result) => {
		const filtered = Object.keys(result)
			.filter(key => fields.includes(key))
			.reduce((obj, key) => {
			obj[key] = results[key];
			return obj;
		}, {});
		debug(filtered);
	});
}

module.exports = searchWithFields;