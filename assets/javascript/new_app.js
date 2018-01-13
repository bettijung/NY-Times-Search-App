$(document).ready(function() {

	let NYTObj = {
		baseURL: "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=",
		apiKey: "b9f91d369ff59547cd47b931d8cbc56b:0:74623931",

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

		queryBuild: function() {

			console.log(NYTObj.searchTerms);
			console.log(NYTObj.numResults);
			console.log(NYTObj.startYear);
			console.log(NYTObj.endYear);

			let baseQueryURL = NYTObj.baseURL + NYTObj.apiKey + "&q=" + NYTObj.searchTerms;

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

	$(".searchButton").on("click", function(event) {

		event.preventDefault();

		let queryURL = NYTObj.queryBuild();
		console.log(queryURL);

		$.ajax({
			url: queryURL,
			method: "GET"
		}).then(function(result) {

			console.log(result);

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

	});

})