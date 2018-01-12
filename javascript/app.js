
$(document).ready(function() {

	let queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=" + apiKey + "&q=" + searchTerms + "&fq=" + numResults + "&begin_date=" + startYear + "&end_date=" + endYear;
	let apiKey =  "b9f91d369ff59547cd47b931d8cbc56b:0:74623931";

	let searchTerms = $("#searchTermInput").val().split(" ").join("+");
	let numResults = $("#numberInputRetrieved").val();
	let startYear = $("#startYearInput").val();
	let endYear = $("#endYearInput").val();

	console.log(searchTerms);
	console.log(numResults);
	console.log(startYear);
	console.log(endYear);

	$.ajax({
		URL: queryURL
		method: "GET"
	}).then(function(response) {

		console.log(response);

		for(i = 0; i < numResults; i++) {
		console.log(response.docs[i].headline.main);
		console.log(response.docs[i].byline.original);
		console.log(response.docs[i].pub_date);
		}

	});
});
