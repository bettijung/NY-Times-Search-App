//App

$(document).ready(function() {
		$(".searchButton").on("click", function(event) {

			event.preventDefault();
		console.log("hello");
		let queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=" + apiKey + "&q=" + searchTerms + "&fq=" + numResults;
		let apiKey =  "b9f91d369ff59547cd47b931d8cbc56b:0:74623931";

		let searchTerms = $("#searchTermInput").val().split(" ").join("+");
		let numResults = $("#numberInputRetrieved").val();
		let startYear = $("#startYearInput").val();
		let endYear = $("#endYearInput").val();

		console.log(searchTerms);
		console.log(numResults);
		console.log(startYear);
		console.log(endYear);

		if(startYear === null && endYear === null) {

		}
		else if(startYear === null) {
			queryURL = queryURL + "&end_date=" + endYear;
		}
		else if(endYear === null) {
			queryURL = queryURL + "&begin_date=" + startYear; 
		}
		else {
			queryURL = queryURL + "&end_date=" + endYear + "&begin_date=" + startYear;
		}

		$.ajax({
			URL: queryURL,
			method: "GET",
		}).then(function(response) {

			console.log(response);

			for(i = 0; i < numResults; i++) {
			console.log(response.docs[i].headline.main);
			console.log(response.docs[i].byline.original);
			console.log(response.docs[i].pub_date);
			var head = response.docs[i].headline.main
			var byline = response.docs[i].byline.original
			var pub = response.docs[i].pub_date

			$("#article-output").append(head, byline, pub)
			}

		// close then
		});

		//close ajax callback
		});

		$(".clearButton").on("click", function() {
		/*Clears the output*/
	    $(".article-output").text("")
	
	  });

	});



		