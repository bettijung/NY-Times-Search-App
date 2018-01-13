$(document).ready(function() {

	// universal object
	let NYTObj = {
		baseURL: "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=",
		apiKey: "b9f91d369ff59547cd47b931d8cbc56b:0:74623931",

		// supplies values for field inputs when called for
		get searchTerms() {
			return $("#searchTermInput").val().split(" ").join("+");
		},
		get numResults() { 
			return $("#numberInputRetrieved").val();
		},
		get startYear() {
			return $("#startYearInput").val();
		},
		get endYear() {
			return $("#endYearInput").val();
		},

		// creates the URL to be used based on field inputs
		queryBuild: function() {

			console.log(NYTObj.searchTerms);
			console.log(NYTObj.numResults);
			console.log(NYTObj.startYear);
			console.log(NYTObj.endYear);

			let baseQueryURL = NYTObj.baseURL + NYTObj.apiKey + "&q=" + NYTObj.searchTerms;

			// checks if date fields have been used and acts accordingly
			// NOTE: must use "YYYYMMDD" format, code should be added later to make this easier
			if(NYTObj.startYear === "" && NYTObj.endYear === "") {
				return(baseQueryURL);
			}
			else if(NYTObj.startYear === "") {
				return(baseQueryURL + "&end_date=" + NYTObj.endYear);
			}
			else if(NYTObj.endYear === "") {
				return(baseQueryURL + "&begin_date=" + NYTObj.startYear); 
			}
			else {
				return(baseQueryURL + "&end_date=" + NYTObj.endYear + "&begin_date=" + NYTObj.startYear);
			}

		},
	}

	// initializes call and response once the search button is clicked
	$(".searchButton").on("click", function(event) {

		event.preventDefault();

		let queryURL = NYTObj.queryBuild();
		console.log(queryURL);

		$.ajax({
			url: queryURL,
			method: "GET"
		}).then(function(result) {

			console.log(result);

			// prints relevamt info to screen for as many articles as the user wishes (up to 10, mulitple pages will have to be called to increase results)
			for(i = 0; i < parseInt(NYTObj.numResults); i++) {

				let head = result.response.docs[i].headline.main,
						byline = result.response.docs[i].byline.original,
						pub = result.response.docs[i].pub_date,
						web = result.response.docs[i].web_url;

				console.log(head);
				console.log(byline);
				console.log(pub);
				console.log(web);

				$(".article-output").append("ARTICLE " + (i + 1) + '<br>' + head + '<br>' + byline + '<br>' + pub + '<br>' + '<a href="' + web + '">Link</a>' + '<br><br>');
			}

		}).fail(function(err) {
			throw err;
		});
		// end of ajax call

	});

})