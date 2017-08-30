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
		return results.map((res) => {
			return filterResults(res.adverts, fields);
		}); 
	});
}

function filterResults(results, fields) {
	// TODO Check if filter is allowed
	// TODO Check if only one filter
	return results.map((result) => {
		return fields.map((singleField) => {
			return result[singleField];
		});
	});
}

module.exports = searchWithFields;