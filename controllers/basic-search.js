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
	
	const searchRequests = words.map((word) => {	
		const apiUrl = `https://api.eniro.com/cs/search/basic?profile=${apiProfile}&key=${apiKey}&country=se&version=1.1.3&search_word=${word}`;
		return request(apiUrl);
	});
	return Promise.all(searchRequests);
}

module.exports = basicSearch;