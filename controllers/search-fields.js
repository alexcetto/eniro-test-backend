const request = require('request-promise');
const debug = require('debug')('search-fields');
const basicSearch = require('./basic-search');

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

/**
 * @param words {String[]} The keywords to search on Eniro
 * @param fields {String[]} The fields to keep
 * @return {Promise} with the results filtered
 */
searchWithFields = (words, fields) => {
	// case if we have no word
	if (!words) {
		return Promise.reject('No word');
	}
	return basicSearch(words)
		.then((results) => {
			// If no results
			if (results[0].totalHits == 0) {
		  	return Promise.reject('No results');
		  }
			return results.map((res) => {
				return filterResults(res.adverts, fields);
			}); 
		})
		.catch((err) => {
			debug(err);
			return Promise.reject(err);
		});
}


/**
 * @param results {Object or Array of Objects} The hits from Eniro API
 * @param fields {Array or String} The fields to filter
 * @return {Objects[]} containing the results filtered (only the companies data)
 */
function filterResults(results, fields) {

	const allowedFilters = ['eniroId', 'companyInfo', 'address', 
    'location', 'phoneNumbers', 'homepage', 
    'facebook', 'companyReview', 'infoPageLink'];

  if (!fields) {
  	return results;
  } else if(typeof fields === 'string') {
  	fields = [fields];
  }

	return results.map((result) => {
		return fields.map((singleField) => {
			return result[singleField];
		});
	});
}

module.exports = searchWithFields;
