const request = require('request-promise');
const debug = require('debug')('controllers');


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
	return new Promise(function(fulfill, reject) {
		words.map(function(word) {
			const apiUrl = `https://api.eniro.com/cs/search/basic?profile=${apiProfile}&key=${apiKey}&country=se&version=1.1.3&search_word=${word}`;
			debug(apiUrl);
			request(apiUrl)
				.then(function(json) {
					debug(json);
					fulfill(json);
				})
				.catch(function(err) {
					reject(err);
				});
		});
	}); 
}

module.exports = basicSearch;