const request = require('request-promise');
const debug = require('debug')('basic-search');


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

function basicSearch(words) {
	// TODO: Check if only one word to search
	// TODO Display all results, not just the firsts
	const searchRequests = words.map((word) => {			
		const apiUrl = `https://api.eniro.com/cs/search/basic?profile=${apiProfile}&key=${apiKey}&country=se&version=1.1.3&search_word=${word}`;

		const options = {
	    uri: apiUrl,
	    headers: {
	        'User-Agent': 'Request-Promise'
	    },
	    json: true // Automatically parses the JSON string in the response
		};
		return request(options);
	});
	return Promise.all(searchRequests);
}

module.exports = basicSearch;