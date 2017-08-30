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
		const parameters = getParameters();
		console.log(parameters);
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
  	
  	return `fields=${checkedFields}&words=${words}`;
  }

  function writeBackResults(results) {
  	const div = document.getElementById('results');
  	div.innerHTML = (JSON.parse(results));
  }
})();