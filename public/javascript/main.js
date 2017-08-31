(function() {
  var httpRequest;
  document.getElementById("accept").addEventListener('click', makeRequest);

  // Start a request to our API
  function makeRequest() {
    httpRequest = new XMLHttpRequest();

    if (!httpRequest) {
      document.getElementById('results').innerHTML = 'Cannot create an XMLHTTP instance';
      return false;
    }
    httpRequest.onreadystatechange = alertContents;
    httpRequest.open('POST', '/search_fields_view');
		httpRequest.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
		let parameters = getParameters();

    if(parameters.words.length == 0 || parameters.fields.length == 0) {
      document.getElementById('results').innerHTML = 'Invalid Request : missing arguments';
      return;
    }
    parameters = writeRequestParameters(parameters.fields, parameters.words);
    httpRequest.send(parameters);
  }

  // Callback when the request has come back from API
  function alertContents() {
    if (httpRequest.readyState === XMLHttpRequest.DONE) {
    	// If all was OK
      if (httpRequest.status === 200) {
        writeBackResults(httpRequest.responseText);
      } else {
        document.getElementById('results').innerHTML = 'There was a problem with the request.';
      }
    }
  }

  // Create the parameters for the request
  // TODO, check if empty
  function getParameters() {
  	const words = document.getElementById('words').value;
  	const fields = document.getElementsByName('fields');

  	let checkedFields = [];
  	for (let i = 0; i < fields.length; i++) {
  		if (fields[i].checked) 
  			checkedFields.push(`${fields[i].value}`);
  	};
  	return {
      fields: checkedFields, 
      words: words
    }
  	
  }

  function writeRequestParameters(fields, words) {
    return `fields=${fields}&words=${words}`;
  }

  function writeBackResults(results) {
  	const div = document.getElementById('results');

    // remove possible old results.
    div.innerHTML = '';

    results = JSON.parse(results);

    let parameters = getParameters();
    parameters.words.split(',').map((word, windex) => {
      // Write title
      div.innerHTML += `<h3>${word}</h3>`;
      results[windex].map((res, rindex) => {
        // write the index of each result
        div.innerHTML += `${rindex+1}<br>`;
        parameters.fields.map((singleField, findex) => {
          // now we display properly the results
          div.innerHTML += singleField + ' : ';
          let details = results[windex][rindex][findex];

          if(details == null) {
            div.innerHTML += 'No info';
          } else if (typeof details === 'object'){
            div.innerHTML += JSON.stringify(details, null, 4);
          } else if ((details.includes('http:') || details.includes('https:'))) {
            // We don't want use url breaking our layout, and a link is friendlier
            div.innerHTML += `<a href=${details}>Link</a>`;
          } else {
            div.innerHTML += JSON.stringify(details, null, 4);
          }
          div.innerHTML += '<br>';
      });
      });
      
    });
  }
})();




